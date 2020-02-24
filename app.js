const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dataRoutes = require("./api/routes/data");
const userRoutes = require('./api/routes/user');
const logRoutes = require('./api/routes/log');
const qrcodeRoutes = require('./api/routes/qrcode');

mongoose.connect(
    "mongodb+srv://" +
    process.env.MONGO_ATLAS_ID + ":" + process.env.MONGO_ATLAS_PW +
    "@cluster0-86rki.mongodb.net/test?retryWrites=true&w=majority",

    {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
);

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/data", dataRoutes);
app.use("/user", userRoutes);
app.use("/log", logRoutes);
app.use("/qrcode", qrcodeRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found, from: app");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      from: "app"
    }
  });
});

module.exports = app;
