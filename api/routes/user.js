const express = require("express");
const router = express.Router();
const multer = require('multer');
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post("/signup", upload.single('faceImg'), UserController.user_signup);

router.post("/login", UserController.user_login);

router.patch("/update/:userId", checkAuth, UserController.user_update);

router.patch("/role/:userId", checkAuth, UserController.user_role);

router.get("/qrcode/:userId", checkAuth, UserController.user_qrcode);

router.get("/all", checkAuth, UserController.user_get_all);

router.get("/one/:userId", checkAuth, UserController.user_get_one);

router.delete("/:userId", checkAuth, UserController.user_delete);


module.exports = router;
