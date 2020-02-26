const express = require("express");
const router = express.Router();

const LogController = require('../controllers/log');

const checkAuth = require('../middleware/check-auth');
const role_admin = require('../middleware/role_admin');

router.post("/:userId", role_admin, checkAuth, LogController.log_add);

router.get("/:userId", role_admin, checkAuth, LogController.log_entry);


module.exports = router;