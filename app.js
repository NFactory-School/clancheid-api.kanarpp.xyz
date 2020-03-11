const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require('./api/routes/user');
const logRoutes = require('./api/routes/log');
const qrcodeRoutes = require('./api/routes/qrcode');
const fileRoutes = require('./api/routes/file');
const adminRoutes = require('./api/routes/admin');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version : "1.0.0",
            title : "Swagger ClencheID",
            description : "ClencheID documentation",
            contact : {
                name : "Dedeve"
            },
            servers : ["http://localhost:3000"]
        }
    },
    authAction : {
        JWT : {
            name : "JWT",
            schema: {
                type: "apiKey",
                in: "header",
                name: "Authorization",
                description: ""
            },
            value: "Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvbkBqb24uZnIiLCJ1c2VySWQiOiI1ZTVjY2IxZTk4ODRiYTE4OGNiNzMyZjciLCJpYXQiOjE1ODM0MTUyNTEsImV4cCI6MTU4MzQ1MTI1MX0.9mT0vdTPf9rWgmwJIoEBHk5ydKj0HrDLD_OrhaRLdSo>"
        }
    },
    apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


mongoose.connect(
    "mongodb+srv://" +
    process.env.MONGO_ATLAS_ID + ":" + process.env.MONGO_ATLAS_PW +
    "@cluster0-86rki.mongodb.net/test?retryWrites=true&w=majority",

    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
);

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
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
/**
 * @swagger
 * /user/signup:
 *  post:
 *      description: Sign-up to the application
 *      tags: ['user']
 *      responses:
 *          '200':
 *              description: A successful response
 * /user/login:
 *  post:
 *      description: Connection to the application
 *      tags: ['user']
 *      responses:
 *          '200':
 *              description: A successful response
 * /user/update/:userId:
 *  patch:
 *      description: Modificate the user on the application
 *      tags: ['user']
 *      responses:
 *          '200':
 *              description: A successful response
 * /user/role/:userId:
 *  patch:
 *      description: Modificate the role of userId
 *      tags: ['user']
 *      responses:
 *          '200':
 *              description: A successful response
 * /user/qrcode/:userId:
 *  get:
 *      description: Generate the QR code of userId
 *      tags: ['user']
 *      responses:
 *          '200':
 *              description: A successful response
 * /user/all/:
 *  get:
 *      description: Show all users
 *      tags: ['user']
 *      responses:
 *          '200':
 *              description: A successful response
 * /user/one/:userId/:
 *  get:
 *      description: Show the userId
 *      tags: ['user']
 *      responses:
 *          '200':
 *              description: A successful response
 *  /user/:userId:
 *  delete:
 *      description: Delete the userId
 *      tags: ['user']
 *      responses:
 *          '200':
 *              description: A successful response
 */
app.use("/user", userRoutes);

/**
 * @swagger
 * /log:
 *  get:
 *      description: The request of the log
 *      tags: ['log']
 *      responses:
 *          '200':
 *              description: A successful response
 * /log/:
 *  post:
 *      description: Entry by a log
 *      tags: ['log']
 *      responses:
 *          '200':
 *              description: A successful response
 */
app.use("/log", logRoutes);

/**
 * @swagger
 * /qrcode:
 *  get:
 *      description: Show all the QR code
 *      tags: ['qrcode']
 *      responses:
 *          '200':
 *              description: A successful response
 * /qrcode/:
 *  post:
 *      description: Create a QR code
 *      tags: ['qrcode']
 *      responses:
 *          '200':
 *              description: A successful response
 * /qrcode/delete:
 *  delete:
 *      description: Delete all QR code
 *      tags: ['qrcode']
 *      responses:
 *          '200':
 *              description: A successful response
 * /qrcode/delete/:qrcodeId:
 *  delete:
 *      description: Delete the QR codeId
 *      tags: ['qrcode']
 *      responses:
 *          '200':
 *              description: A successful response
 * /qrcode/compare/:qrcode:
 *  get:
 *      description: Compare the QR code with bdd
 *      tags: ['qrcode']
 *      responses:
 *          '200':
 *              description: A successful response
 */
app.use("/qrcode", qrcodeRoutes);

/**
 * @swagger
 *  /file/vector/:userId:
 *  patch:
 *      description: Show all the QR code
 *      tags: ['file']
 *      responses:
 *          '200':
 *              description: A successful response
 * /file/images/:
 *  get:
 *      description: Create a QR code
 *      tags: ['file']
 *      responses:
 *          '200':
 *              description: A successful response
 * /file/delete_image/:userId:
 *  delete:
 *      description: Delete all QR code
 *      tags: ['file']
 *      responses:
 *          '200':
 *              description: A successful response
 * /file/image/:userId:
 *  get:
 *      description: Delete the QR codeId
 *      tags: ['file']
 *      responses:
 *          '200':
 *              description: A successful response
 * /file/sound/:userId:
 *  get:
 *      description: Compare the QR code with bdd
 *      tags: ['file']
 *      responses:
 *          '200':
 *              description: A successful response
 */
app.use("/file", fileRoutes);

/**
 * @swagger
 * /admin:
 *  get:
 *      description: The request of the admin
 *      tags: ['admin']
 *      responses:
 *          '200':
 *              description: A successful response
 */
app.use("/admin", adminRoutes);


/**
 * @swagger
 * get:
 *      description: 404
 *      responses:
 *          '404':
 *              description: Not found
 */
app.use((req, res, next) => {
    const error = new Error("Not found, from: app");
    error.status = 404;
    next(error);
});

/**
 * @swagger
 * get:
 *      description: 500
 *      responses:
 *          '500':
 *              description: No JSON
 */
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
