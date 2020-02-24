const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const DataController = require('../controllers/data');

router.get("/", DataController.data_get_all);

router.post("/", checkAuth, DataController.data_create_data);

router.get("/:dataId", DataController.data_get_data);

router.patch("/:dataId", checkAuth, DataController.data_update_data);

router.delete("/:dataId", checkAuth, DataController.data_delete);

module.exports = router;
