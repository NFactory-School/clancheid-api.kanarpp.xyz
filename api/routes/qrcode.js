const express = require("express");
const router = express.Router();

const QrcodeController = require('../controllers/qrcode');

const checkAuth = require('../middleware/check-auth');
const role_admin = require('../middleware/role_admin');

router.post("/", checkAuth, role_admin, QrcodeController.qrct_create);

router.get("/", checkAuth, role_admin, QrcodeController.qrct_get_all);

router.delete("/delete", checkAuth, role_admin, QrcodeController.qrct_delete_all);

router.delete("/delete/:qrcodeId", checkAuth, role_admin, QrcodeController.qrct_delete_one);


module.exports = router;