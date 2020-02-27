const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');

const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/uploads');
const role_user = require('../middleware/role_user');
const role_admin = require('../middleware/role_admin');

router.post("/signup", upload.single('face'), UserController.user_signup);

router.post("/login", UserController.user_login);

router.patch("/update/:userId", checkAuth, UserController.user_update);

router.patch("/role/:userId", checkAuth, UserController.user_role);

router.get("/qrcode/:userId", checkAuth, UserController.user_qrcode);

router.get("/all/", checkAuth, role_admin, UserController.user_get_all);

router.get("/one/:userId/", checkAuth, role_admin, UserController.user_get_one);

router.delete("/:userId", checkAuth, role_admin, UserController.user_delete);


module.exports = router;