const User = require("../models/user");
const fs = require('fs');
const path = require('path');

exports.get_img_all = (req, res, next) => {

    //joining path of directory
    const directoryPath = path.join(process.cwd(), 'uploads', 'img');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        const links = [];
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            links.push(path.join(process.cwd(), 'uploads', 'img', file));

        });

        res.status(200).json({
            message: links
        });

    });
};

exports.delete_img_all = (req, res, next) => {

    //joining path of directory
    const directoryPath = path.join(process.cwd(), 'uploads', 'img');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        const links = [];
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            fs.unlinkSync(path.join(process.cwd(), 'uploads', 'img', file));

        });

        res.status(200).json({
            message: 'All images have been deleted'
        });

    });
};

exports.sound_post = (req, res, next) => {
    try {
        // find each person with this email
        const query = User.findOne({'_id': req.params.userId});

        // selecting the fields
        query.select('_id file');

        // execute the query at a later time
        query.exec(function (err, user) {
                if (err) return handleError(err);

                fs.rename(path.join(process.cwd(), 'uploads', 'sound', user._id.toString()), path.join(process.cwd(), 'uploads', 'sound', user.file.toString() + '.mp3'),
                    function (err) {
                        if (err) console.log('ERROR: ' + err);
                    });

                res.status(201).json({
                    message: 'sound updated'
                });
            }
        );

    } catch (error) {
        return res.status(500).json({
            message: 'sound pb - ' + error,
        });
    }
};

exports.get_sound_byid = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select("file")
        .exec()
        .then(doc => {
            if (doc) {

                // find each person with this email
                const query = User.findOne({'_id': req.params.userId});

                // selecting the fields
                query.select('_id file');

                // execute the query at a later time
                query.exec(function (err, user) {
                        if (err) return handleError(err);

                        res.status(200).json({
                            link: path.join(process.cwd(), 'uploads', 'sound', user.file + '.mp3')
                        });
                    }
                );

            } else {
                res
                    .status(404)
                    .json({message: "No sound to this ID"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.get_img_byid = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select("file")
        .exec()
        .then(doc => {
            if (doc) {

                // find each person with this email
                const query = User.findOne({'_id': req.params.userId});

                // selecting the fields
                query.select('_id file');

                // execute the query at a later time
                query.exec(function (err, user) {
                        if (err) return handleError(err);

                        res.status(200).json({
                            link: path.join(process.cwd(), 'uploads', 'img', user.file + '.jpg')
                        });
                    }
                );

            } else {
                res
                    .status(404)
                    .json({message: "No image to this ID"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.create_vector = (req, res, next) => {
    const filter = req.params.userId;
    const update = req.body;
    User.findOneAndUpdate(filter, update, {useFindAndModify: false})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Vector updated",
                update: update
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


