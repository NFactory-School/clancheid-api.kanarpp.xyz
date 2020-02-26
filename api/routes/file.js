const express = require("express");
const router = express.Router();

const FileController = require('../controllers/file');
const checkAuth = require('../middleware/check-auth');
const upload_sound = require('../middleware/uploads_sound');


router.patch("/vector/:userId", checkAuth, FileController.create_vector);

router.get("/images", checkAuth, FileController.get_img_all);

router.get("/delete_image", checkAuth, FileController.delete_img_all);

//router.get("/sound/:userId", checkAuth, FileController.sound_get_byid);

router.get("/image/:userId", checkAuth, FileController.get_img_byid);

router.get("/sound/:userId", checkAuth, FileController.get_sound_byid);

router.post("/sound/:userId", checkAuth, upload_sound.single('sound'), FileController.sound_post);


module.exports = router;
