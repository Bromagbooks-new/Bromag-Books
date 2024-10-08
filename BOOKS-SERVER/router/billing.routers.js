
const express = require("express");
const router = express.Router();
const interceptor = require("../middleware/interceptor");
const billingController = require("../controller/billing_controller");

router.put("/update-bill-with-complete-status", interceptor.adminAuth, billingController.updateBillWithCompleteStatusController);
router.put("/update-bill-with-hold-status", interceptor.adminAuth, billingController.updateBillWithHoldStatusController);
router.delete("/delete-order-bill/:billId", interceptor.adminAuth, billingController.deleteOrderBill);
router.get("/cancel-order-bill/:billId", interceptor.adminAuth, billingController.cancelOrderBill);

module.exports = router;