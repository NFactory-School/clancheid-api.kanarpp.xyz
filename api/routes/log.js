const express = require("express");
const router = express.Router();

const LogController = require('../controllers/log');

const checkAuth = require('../middleware/check-auth');
const role_admin = require('../middleware/role_admin');

router.post("/", checkAuth, role_admin, LogController.log_add);

router.get("/", checkAuth, role_admin, LogController.log_entry);

module.exports = router;