const mongoose = require("mongoose");
const Log = require("../models/log");

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
