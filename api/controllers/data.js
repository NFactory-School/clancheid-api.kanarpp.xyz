const mongoose = require("mongoose");
const Data = require("../models/data");

exports.data_get_all = (req, res, next) => {
  Data.find()
    .select("positionX positionY positionZ alpha beta gamma _id created_at")
    .exec()
    .then(result => {
      const response = {
        count: result.length,
        data: result.map(result => {
          return {
            positionX: result.positionX,
            positionY: result.positionY,
            positionZ: result.positionZ,
            alpha: result.alpha,
            beta: result.beta,
            gamma: result.gamma,
            _id: result._id,
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

exports.data_create_data = (req, res, next) => {
  const data = new Data({
    _id: new mongoose.Types.ObjectId(),
    positionX: req.body.positionX,
    positionY: req.body.positionY,
    positionZ: req.body.positionZ,
    alpha: req.body.alpha,
    beta: req.body.beta,
    gamma: req.body.gamma,
    created_at: new Date
  });
  data
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created data successfully",
        createdData: {
          _id: result._id,
          positionX: result.positionX,
          positionY: result.positionY,
          positionZ: result.positionZ,
          alpha: result.alpha,
          beta: result.beta,
          gamma: result.gamma,
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

exports.data_get_data = (req, res, next) => {
  const id = req.params.dataId;
  Data.findById(id)
    .select("positionX positionY positionZ alpha beta gamma _id created_at")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          data: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.data_update_data = (req, res, next) => {
    const id = req.params.dataId;
    // const updateOps = {};
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    const updateOps = req.body;
    Data.findOneAndUpdate( id , updateOps, {useFindAndModify: false})
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

exports.data_delete = (req, res, next) => {
  const id = req.params.dataId;
  Data.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Data deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
