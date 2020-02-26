const express = require("express");
const router = express.Router();

const QrcodeController = require('../controllers/qrcode');

const checkAuth = require('../middleware/check-auth');
const role_admin = require('../middleware/role_admin');

router.post("/:userId", role_admin, checkAuth, QrcodeController.qrct_create);

router.get("/:userId", role_admin, checkAuth, QrcodeController.qrct_get_all);

router.delete("/delete", role_admin, checkAuth, QrcodeController.qrct_delete_all);

router.delete("/delete/:qrcodeId", role_admin, checkAuth, QrcodeController.qrct_delete_one);


module.exports = router;