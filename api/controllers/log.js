const mongoose = require("mongoose");
const Log = require("../models/log");
const nodemailer = require('nodemailer');

exports.log_entry = (req, res, next) => {
  Log.find()
    .select("pseudo method _id created_at")
    .exec()
    .then(result => {
      const response = {
        count: result.length,
        data: result.map(result => {
          return {
              _id: result._id,
              pseudo: result.pseudo,
              method: result.method,
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

exports.log_add = (req, res, next) => {
  const log = new Log({
    _id: new mongoose.Types.ObjectId(),
    pseudo: req.body.pseudo,
    method: req.body.method,
    created_at: new Date
  });
    log
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Added log successfully",
        createdData: {
            _id: result._id,
            pseudo: result.pseudo,
            method: result.method,
            created_at: result.created_at
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.mail = (req, res, next) => {

    try {
        "use strict";
        const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // Generate test SMTP service account from ethereal.email

            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "f8cb602fd11f35",
                    pass: "c999176537c9d7"
                }
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>" // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);

    } catch (error) {
        return res.status(500).json({
            message: 'pb mail - ' + error,
        });
    }
};