
const express = require("express");
const router = express.Router();
const interceptor = require("../middleware/interceptor");
const kotController = require("../controller/kot_controller");

router.post("/get-kot-unique-id", interceptor.adminAuth, kotController.getKotUniqueIdController);
router.post("/create-new-kot", interceptor.adminAuth, kotController.createNewKotController);

module.exports = router;