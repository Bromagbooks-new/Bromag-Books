
const express = require("express");
const router = express.Router();
const interceptor = require("../middleware/interceptor");
const orderController = require("../controller/order.management.controller.js");

router.post("/get-card-analytics-value", interceptor.adminAuth, orderController.getCardAnalyticsController);

router.get("/getOrderManagementDashboard", interceptor.adminAuth, orderController.orderManagementDashboard)
module.exports = router;