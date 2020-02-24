const express = require("express");
const router = express.Router();

const LogController = require('../controllers/log');
const checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, LogController.log_add);

router.get("/", checkAuth, LogController.log_entry);

module.exports = router;
