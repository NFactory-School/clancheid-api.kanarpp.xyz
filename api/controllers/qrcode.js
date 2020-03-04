const mongoose = require("mongoose");
const Qrcode = require("../models/qrcode");
const User = require("../models/user");
const path = require("path");

exports.qrct_get_all = (req, res, next) => {
    Qrcode.find()
        .select("mail qrcode _id created_at")
        .exec()
        .then(result => {
            const response = {
                count: result.length,
                data: result.map(result => {
                    return {
                        _id: result._id,
                        email: result.email,
                        qrcode: result.qrcode,
                        begin: result.begin,
                        end: result.end,
                        created_at: result.created_at

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

exports.qrct_create = (req, res, next) => {
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const randomstring = makeid(10);

    const qrcode = new Qrcode({
        email: req.body.email,
        qrcode: req.body.email + randomstring,
        begin: req.begin,
        end: req.end,
        created_at: new Date
    });
    qrcode
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                    message: "Created qrcode successfully",
                    createdData: {
                        _id: result._id,
                        email: result.email,
                        qrcode: result.qrcode,
                        begin: result.begin,
                        end: result.end,
                        created_at: result.created_at

                    }
                }
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.qrct_delete_one = (req, res, next) => {
    const id = req.params.qrcodeId;
    Qrcode.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Qrcode deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.qrct_delete_all = (req, res, next) => {
    Qrcode.remove({})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "All temporary Qrcode are deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.qrct_compare = (req, res, next) => {
    try {
        // find each person with this email
        const query = User.findOne({'qrcode': req.params.qrcode});

        // selecting the fields
        query.select('qrcode');

        // execute the query at a later time
        query.exec(function (err, user) {
            if (err) return handleError(err);
            if (user != null) {
                return res.status(200).json({
                    qrcode: user.qrcode,
                })
            }else {
                // find each person with this email
                const query2 = Qrcode.findOne({'qrcode': req.params.qrcode});

                // selecting the fields
                query2.select('qrcode');

                // execute the query at a later time
                query2.exec(function (err, user) {
                    if (err) return handleError(err);
                    if (user != null) {
                        return res.status(200).json({
                            qrcode: user.qrcode,
                        })
                    } else {
                        res.status(400).json({
                            message: 'This QRCode is not recognized',
                        })
                    }
                });
            }
        });


    } catch (error) {
        return res.status(500).json({
            message: 'not allowed middleware - ' + error,
        });
    }
};
