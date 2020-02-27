const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const path = require('path');

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        //console.log(req.file.path);
                        const name_img = path.parse(req.file.path);

                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            pseudo: req.body.pseudo,
                            name: req.body.name,
                            firstname: req.body.firstname,
                            phone: req.body.phone,
                            qrcode: req.body.pseudo + "CanDoTwoPushups",
                            role: 0,
                            file: name_img.name,
                            created_at: new Date,
                        });
                        user
                            .save()
                            .then(result => {
                                //console.log(result);
                                res.status(201).json({
                                    message: "Register in Progress"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed, user doesn't exist"
                });
            }
            const role = user[0].role;
            console.log(role);

            switch (role) {
                case 0:
                    return res.status(401).json({
                        message: 'Your registering is not complete',
                    });
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    return res.status(401).json({
                        message: 'You are banned',
                    });
                default:
                    res.status(500).json({
                        message: 'not allowed login - ',
                    });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed wrong password"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "10h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed 401"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_update = (req, res, next) => {
    const filter = req.params.userId;
    const update = req.body;
    User.findOneAndUpdate(filter, update, {useFindAndModify: false})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Data updated",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_role = (req, res, next) => {
    const filter = req.params.userId;
    const update = req.body;
    User.findOneAndUpdate(filter, update, {useFindAndModify: false})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "You can now use ClancheID",
            });
            //ENVOYER UN MAIL AU USER ICI
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_qrcode = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select("qrcode")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    data: doc,
                });
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.user_get_all = (req, res, next) => {
    User.find()
        .select("pseudo name firstname email phone qrcode role vector _id created_at updated_at")
        .exec()
        .then(result => {
            const response = {
                count: result.length,
                data: result.map(result => {
                    return {
                        pseudo: result.pseudo,
                        name: result.name,
                        firstname: result.firstname,
                        email: result.email,
                        phone: result.phone,
                        qrcode: result.qrcode,
                        vector: result.vector,
                        _id: result._id,
                        created_at: result.created_at,
                        updated_at: result.updated_at,
                    };
                })
            };
            if (result.length >= 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_get_one = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select("pseudo name firstname email phone qrcode role vector _id created_at updated_at")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    //data: doc,
                    bla: "+1"
                });
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.user_delete = (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

