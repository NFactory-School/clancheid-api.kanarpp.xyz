const express = require("express");
const router = express.Router();

const QrcodeController = require('../controllers/qrcode');
const checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, QrcodeController.qrct_create);

router.get("/", checkAuth, QrcodeController.qrct_get_all);

router.delete("/delete", checkAuth, QrcodeController.qrct_delete_all);

router.delete("/delete/:qrcodeId", checkAuth, QrcodeController.qrct_delete_one);

module.exports = router;
