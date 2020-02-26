const express = require("express");
const router = express.Router();

const FileController = require('../controllers/file');

const checkAuth = require('../middleware/check-auth');
const upload_sound = require('../middleware/uploads_sound');
const role_user = require('../middleware/role_user');
const role_admin = require('../middleware/role_admin');


router.patch("/vector/:userId", role_admin, checkAuth, FileController.create_vector);

router.get("/images/:userId", role_admin, checkAuth, FileController.get_img_all);

router.get("/delete_image/:userId", role_admin, checkAuth, FileController.delete_img_all);

router.get("/image/:userId", role_admin, checkAuth, FileController.get_img_byid);

router.get("/sound/:userId", role_admin, checkAuth, FileController.get_sound_byid);

router.post("/sound/:userId", role_user, checkAuth, upload_sound.single('sound'), FileController.sound_post);


module.exports = router;