const express = require("express");
const userRouter = express.Router();
const rateLimit = require("express-rate-limit");
//controllers
const controller = require("../controller/access_controller");
const billingController = require("../controller/billing_controller");
const kotController = require("../controller/kot_controller");
const menuController = require("../controller/menu_controller");
const posController = require("../controller/pos_controller");
const capController = require("../controller/cap_controller");
const salesController = require("../controller/sales_controller");
const tableController = require("../controller/table_controller");
const orderController = require("../controller/order.management.controller")
const dominantController = require("../controller/dominant_controller")
const dashboard = require("../controller/dashboard_controller")
const inventory = require("../controller/inventory_controller")
//middleware
const interceptor = require("../middleware/interceptor");

const upload = require("../utils/uploaders");
const bill_model = require("../model/bill_model");
const paginationMiddleware = require("../middleware/pagination");

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
})

/* restaurant */
userRouter.get("/accessRestaurantHome", controller.accessRestaurantHome);
userRouter.post("/login", limiter, controller.verifyLogin);
userRouter.post("/verifyToken", controller.verifyToken);
userRouter.post("/demo-request", controller.storeDemoRequest);
userRouter.post("/user-query", controller.storeUserRequest);

//router for apk login
userRouter.post("/send-otp", limiter, controller.loginForMobileUsingOtp);
userRouter.post("/verify-otp", controller.verifyOtpForMobile);

/* restaurant owner */
userRouter.post("/adminLoginVerification", controller.adminLoginVerification);

userRouter.patch(
  "/updateProfileImage",
  upload.ImageUploader.array("profileImage", 1),
  interceptor.posAuth,
  posController.updateProfileImagePos
);
userRouter.post(
  "/addAccess",
  upload.ImageUploader.array("image", 1),
  interceptor.adminAuth,
  controller.addAccess
);

userRouter.patch(
  "/updatEmployeAccess",
  upload.ImageUploader.array("image", 1),
  interceptor.adminAuth,
  controller.updatAccess
);
userRouter.get(
  "/accessedEmployees",
  interceptor.adminAuth,
  controller.accessedEmployees
);
userRouter.delete(
  "/deleteEmployeeAccess",
  interceptor.adminAuth,
  controller.deleteEmployeeAccess
);

userRouter.post(
  "/addEmploymentDetails",
  interceptor.adminAuth,
  controller.addEmploymentDetails
); //Employee management
userRouter.post(
  "/deleteEmploymentData",
  interceptor.adminAuth,
  controller.deleteEmploymentData
);
userRouter.get(
  "/employDetails",
  interceptor.adminAuth,
  controller.employDetails
);
userRouter.get(
  "/getToEditEmploymentDetails/:employId",
  interceptor.adminAuth,
  controller.getToEditEmploymentDetails
);
userRouter.post(
  "/updateEmploymentDetails/:employId",
  upload.ImageUploader.fields([
    { name: "aadharImage", maxCount: 2 },
    { name: "pancardImage", maxCount: 1 },
  ]),
  interceptor.adminAuth,
  controller.updateEmploymentDetails
);

userRouter.post(
  "/updateEmploymentData/:employId",
  interceptor.adminAuth,
  controller.updateEmploymentData
);

// userRouter.post("/addEmployDetails", upload.ImageUploader.fields([{ name: "aadharImage", maxCount: 1 },
// { name: "pancardImage", maxCount: 1 },]),interceptor.adminAuth,controller.addEmployDetails);


userRouter.post(
  "/generateBill",
  limiter,
  interceptor.adminAuth,
  billingController.generateBill
);
userRouter.post(
  "/fetchBill",
  interceptor.adminAuth,
  billingController.fetchBill
);
userRouter.get(
  "/fetchHoldBills",
  interceptor.adminAuth,
  billingController.fetchHoldBills
);
userRouter.get(
  "/fetchCompletedBills",
  interceptor.adminAuth,
  billingController.fetchCompletedBills
);
userRouter.patch(
  "/updateBill",
  interceptor.adminAuth,
  billingController.updateBill
);
userRouter.post(
  "/deleteBill",
  interceptor.adminAuth,
  billingController.deleteBill
);
userRouter.get(
  "/getTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline",
  interceptor.adminAuth,
  billingController.getTotalAndHoldOrdersCountEitherForTakeAwayOrForOnlineController
)
userRouter.get(
  "/getTotalBillsEitherForTakeAwayOrOnlineOrders",
  interceptor.adminAuth,
  billingController.getTotalBillsEitherForTakeAwayOrOnlineOrdersController
)

// Get Tables Hold And Available Count
userRouter.get(
  "/getTablesHoldAndAvailableCount",
  interceptor.adminAuth,
  billingController.getTablesHoldAndAvailableCount
)

// Get Hold Table Data
userRouter.get(
  "/getTablesOnHoldData",
  interceptor.adminAuth,
  billingController.getTablesOnHoldDataController
)

// Get Hold And Available Table Data
userRouter.get(
  "/getHoldAndAvailableTableData",
  interceptor.adminAuth,
  billingController.getHoldAndAvailableTableDataController
)

userRouter.post(
  "/addOpeningReport",
  interceptor.adminAuth,
  billingController.addOpeningReport
);
userRouter.get(
  "/getOpeningReports",
  interceptor.adminAuth,
  billingController.getOpeningReports
);
userRouter.get(
  "/isOpeningReportCreatedToday",
  interceptor.adminAuth,
  billingController.isOpeningReportCreatedToday
);

userRouter.post(
  "/addExpense",
  upload.ImageUploader.array("image", 1),
  interceptor.adminAuth,
  billingController.addExpense
);
userRouter.get(
  "/getExpenses",
  interceptor.adminAuth,
  billingController.getExpenses
);

userRouter.post(
  "/addClosingReport",
  interceptor.adminAuth,
  billingController.addClosingReport
);
userRouter.get(
  "/getClosingReports",
  interceptor.adminAuth,
  billingController.getClosingReports
);
userRouter.get(
  "/isClosingReportCreatedToday",
  interceptor.adminAuth,
  billingController.isClosingReportCreatedToday
);
userRouter.post(
  "/getPassbookData",
  interceptor.adminAuth,
  billingController.getPassbookData
);

//order management router start
userRouter.post(
  "/getCardAnalytics",
  interceptor.adminAuth,
  billingController.getCardAnalytics
);
userRouter.post(
  "/getDashboardAnalytics",
  interceptor.adminAuth,
  billingController.getDashboardAnalytics
);

userRouter.get(
  "/getOrderManagementDashboard",
  interceptor.adminAuth,
  orderController.orderManagementDashboard
);
userRouter.get(
  "/getOnlineOrderData",
  interceptor.adminAuth,
  orderController.getTotalOnlineOrderData
);

userRouter.get(
  "/TotalDineInOrderData",
  interceptor.adminAuth,
  orderController.getTotalDineInOrderData
);

userRouter.get(
  "/TotalTakeAwayOrderData",
  interceptor.adminAuth,
  orderController.getTotalTakeawayOrderData
);

// dominant management router start
userRouter.get(
  "/dominantManagementHomePage",
  interceptor.adminAuth,
  dominantController.dominantManagementHomePage
);

userRouter.get(
  "/getTotalVegOrderData",
  interceptor.adminAuth,
  dominantController.getTotalVegOrderData
);
userRouter.get(
  "/getTotalNonVegOrderData",
  interceptor.adminAuth,
  dominantController.getTotalNonVegOrderData
);

userRouter.get(
  "/getRepeatOrderData",
  interceptor.adminAuth,
  dominantController.getRepeatOrderData
);

//Dashboard routes
userRouter.get(
  "/getSalesSummary",
  interceptor.adminAuth,
  dashboard.getSalesSummary
);

userRouter.get(
  "/getVegNonVegSummary",
  interceptor.adminAuth,
  dashboard.getVegNonVegSummary
);

userRouter.post(
  "/getDashboardCard",
  interceptor.adminAuth,
  dashboard.getDashboardCard
);

userRouter.post(
  "/getOrderSummary",
  interceptor.adminAuth,
  dashboard.getOrderSummary
);
userRouter.get(
  "/getInventorySummary",
  interceptor.adminAuth,
  dashboard.getInventorySummary
);

//inventory management routes

userRouter.get(
  "/getTotalInventory",
  interceptor.adminAuth,
  paginationMiddleware(),
  inventory.getTotalInventory
);

userRouter.get(
  "/getAvailaibleInventory",
  interceptor.adminAuth,
  paginationMiddleware(),
  inventory.getAvailaibleInventory
);

userRouter.get(
  "/getPieChartDataInventory",
  interceptor.adminAuth,
  inventory.getPieChartDataInventory
);

userRouter.get(
  "/getCardInventoryHomePage",
  interceptor.adminAuth,
  inventory.getCardInventoryHomePage
);


//bill
userRouter.post(
  "/generateKOT",
  interceptor.adminAuth,
  kotController.generateKOT
);


userRouter.post(
  "/addAggregator",
  interceptor.adminAuth,
  menuController.addAggregator
);


userRouter.get(
  "/getAllAggregators",
  interceptor.adminAuth,
  menuController.getAllAggregators
);


userRouter.post(
  "/addCuisine",
  interceptor.adminAuth,
  menuController.addCuisine
);


userRouter.get(
  "/getAllCuisines",
  interceptor.adminAuth,
  menuController.getAllCuisines
);


userRouter.post(
  "/addMenuItem",
  upload.ImageUploader.single("ItemImage"),
  interceptor.adminAuth,
  menuController.addMenuItem
);

userRouter.put(
  "/editMenuItem/:menuItemId",
  upload.ImageUploader.single("ItemImage"),
  interceptor.adminAuth,
  menuController.editMenuItem
);


userRouter.delete(
  "/deleteMenuItem/:menuItemId",
  interceptor.adminAuth,
  menuController.deleteMenuItem
);


userRouter.get(
  "/getAllMenuItems",
  interceptor.adminAuth,
  menuController.getAllMenuItems
);

userRouter.put(
  "/updateMenuItemAvailableStatus",
  interceptor.adminAuth,
  menuController.updateMenuItemAvailableStatus
)

userRouter.post(
  "/addMenuCategory",
  interceptor.adminAuth,
  menuController.addMenuCategory
); // menu's category related
userRouter.get(
  "/getMenuCategory",
  interceptor.adminAuth,
  menuController.getMenuCategory
);
userRouter.post(
  "/deleteMenuCategory",
  interceptor.adminAuth,
  menuController.deleteMenuCategory
);
userRouter.get(
  "/getToEditMenuCategory/:categoryId",
  interceptor.adminAuth,
  menuController.getToEditMenuCategory
);
userRouter.post(
  "/updateMenuCategory/:categoryId",
  interceptor.adminAuth,
  menuController.updateMenuCategory
);

userRouter.get(
  "/getStockInDetails",
  interceptor.adminAuth,
  controller.getStockInDetails
);
userRouter.get(
  "/getStockOutDetails",
  interceptor.adminAuth,
  controller.getStockOutDetails
);
userRouter.post(
  "/commodityStockOut",
  interceptor.adminAuth,
  controller.commodityStockOut
);

userRouter.post(
  "/addMenuData",
  upload.ImageUploader.single("ItemImage"),
  interceptor.adminAuth,
  menuController.addMenuData
); // menu management

userRouter.patch(
  "/updateMenuData",
  upload.ImageUploader.single("ItemImage"),
  interceptor.adminAuth,
  menuController.updateMenuData
); // menu management
userRouter.patch(
  "/updateOnlineAggregatorPrices",
  interceptor.adminAuth,
  menuController.updateOnlineAggregatorPrices
); // menu management

userRouter.get(
  "/getMenuData",
  interceptor.adminAuth,
  menuController.getMenuData
);
userRouter.put(
  "/updateMenuActive/:itemId",
  interceptor.adminAuth,
  menuController.updateMenuActive
);
userRouter.post(
  "/menuSharingUpdates",
  interceptor.adminAuth,
  menuController.menuSharingUpdates
);
userRouter.post(
  "/publishMenu",
  interceptor.adminAuth,
  menuController.publishMenu
);
userRouter.post(
  "/quantityIncrementAtMenu",
  interceptor.adminAuth,
  menuController.quantityIncrementAtMenu
);
userRouter.post(
  "/deleteMenu",
  interceptor.adminAuth,
  menuController.deleteMenu
);
userRouter.get(
  "/menu-management",
  interceptor.adminAuth,
  menuController.menuManagement
);
userRouter.post(
  "/menuDateFilter",
  interceptor.adminAuth,
  menuController.menuDateFilter
);
userRouter.get(
  "/getToEditMenu/:Id",
  interceptor.adminAuth,
  menuController.getToEditMenu
);
userRouter.post(
  "/updateMenu/:Id",
  upload.ImageUploader.array("itemImage", 1),
  interceptor.adminAuth,
  menuController.updateMenu
);

userRouter.get(
  "/getTakeAwayForAdmin",
  interceptor.adminAuth,
  paginationMiddleware(),
  salesController.getTakeAwayForAdmin
); //sales management
userRouter.get(
  "/getDineInForAdmin",
  interceptor.adminAuth,
  paginationMiddleware(),
  salesController.getDineInForAdmin
);
userRouter.get(
  "/getOnlineData",
  interceptor.adminAuth,
  paginationMiddleware(),
  salesController.getOnlineData
);
userRouter.get(
  "/getHighestBillingAmountPerHour",
  interceptor.adminAuth,
  paginationMiddleware(),
  salesController.getHighestBillingAmountPerHour
);
userRouter.get(
  "/getHourlySalesData",
  interceptor.adminAuth,
  paginationMiddleware(),
  salesController.getHourlySalesData
);
userRouter.get(
  "/getTotalSalesData",
  interceptor.adminAuth,
  paginationMiddleware(),
  salesController.getTotalSalesData
);
userRouter.get(
  "/getSalesDashboardData",
  interceptor.adminAuth,
  salesController.getSalesDashboardData
);

userRouter.get(
  "/getOrderData",
  interceptor.adminAuth,
  salesController.getOrderData
); // order related
userRouter.get(
  "/getOrderDataOfCap/:captainId",
  interceptor.adminAuth,
  salesController.getOrderDataOfCap
);
userRouter.get(
  "/TodaysOrderDataOfCap",
  interceptor.adminAuth,
  salesController.TodaysOrderDataOfCap
);
userRouter.get(
  "/getSalesDataOfCap",
  interceptor.adminAuth,
  salesController.getSalesDataOfCap
);

userRouter.post(
  "/addTableData",
  upload.ImageUploader.array("image", 1),
  interceptor.adminAuth,
  tableController.addTableData
); //table management

// New router addNewTableData() for table management without captain
userRouter.post(
  "/addNewTableData/",
  interceptor.adminAuth,
  tableController.addNewTableData
)

// Fetch all table data
userRouter.get(
  "/getNewTableData",
  interceptor.adminAuth,
  tableController.getNewTableData
)

// Fetch all table count
userRouter.get(
  "/getNewTableDatCount/",
  interceptor.adminAuth,
  tableController.getNewTableDatCount
)

// Fetch single table data
userRouter.get(
  "/getSingleTableInfo/:tableId",
  interceptor.adminAuth,
  tableController.getSingleTableInfo
)

// Update sngle table data
userRouter.put(
  "/updateTableForTableManagement/:tableId",
  interceptor.adminAuth,
  tableController.updateTableForTableManagement
)

userRouter.get(
  "/getTableDataAtAdmin",
  interceptor.adminAuth,
  tableController.getTableDataAtAdmin
);
userRouter.put(
  "/updateTableActive/:tableId",
  interceptor.adminAuth,
  tableController.updateTableActive
);
userRouter.get(
  "/getToEditTableData/:tableId",
  interceptor.adminAuth,
  tableController.getToEditTableData
);
userRouter.post(
  "/updateTableData/:tableId",
  upload.ImageUploader.array("image", 1),
  interceptor.adminAuth,
  tableController.updateTableData
);
userRouter.post(
  "/deleteTable",
  interceptor.adminAuth,
  tableController.deleteTable
);
userRouter.get(
  "/captainList",
  interceptor.adminAuth,
  tableController.captainList
);
userRouter.post(
  "/captainPassFilter",
  interceptor.adminAuth,
  tableController.captainPassFilter
);

userRouter.post(
  "/addCustomer",
  upload.ImageUploader.array("aadharImage"),
  controller.addCustomer
); // customer management
userRouter.get(
  "/customerDetails",
  interceptor.adminAuth,
  controller.customerDetails
);
userRouter.get(
  "/getCustomerDetail/:id",
  interceptor.adminAuth,
  controller.getcustomerDetail
);

userRouter.patch(
  "/updateCustomer",
  upload.ImageUploader.array("aadharImage"),
  controller.updateCustomerDetail
);
// userRouter.patch('/updateCustomer', () => {
//   console.log("updateddddd trauilssss");
// })

userRouter.delete("/deleteCustomer/:Id", controller.deleteCustomerDetail);
userRouter.delete(
  "/deleteVendor",
  interceptor.adminAuth,
  controller.deleteVendor
);
userRouter.get(
  "/customerDetail/:query",
  interceptor.adminAuth,
  controller.searchCustomerDetail
);
userRouter.get(
  "/getAllvendors",
  interceptor.adminAuth,
  controller.getAllvendors
);
userRouter.get(
  "/getCommidities",
  interceptor.adminAuth,
  controller.getCommidities
);

userRouter.get(
  "/TodaysAdminPassbookData",
  interceptor.adminAuth,
  posController.TodaysAdminPassbookData
);
userRouter.get(
  "/getPassBookData",
  interceptor.adminAuth,
  posController.getPassBookData
); // pos related
userRouter.post(
  "/adminPassbookDateFilter",
  interceptor.adminAuth,
  posController.adminPassbookDateFilter
);

userRouter.get(
  "/getAllVendorCategories",
  interceptor.adminAuth,
  controller.getAllVendorCategories
);

userRouter.post(
  "/addVenderDetails",
  interceptor.adminAuth,
  upload.ImageUploader.single("image"),
  controller.addVenderDetails
); // vendor related
userRouter.post(
  "/updateVenderDetails",
  interceptor.adminAuth,
  upload.ImageUploader.single("image"),
  controller.updateVenderDetails
); // vendor related

userRouter.post(
  "/addIngredientsDetails",
  upload.ImageUploader.single("image"),
  interceptor.adminAuth,
  controller.addIngredientsDetails
);
userRouter.get(
  "/getVenderDetails",
  interceptor.adminAuth,
  controller.getVenderDetails
);
userRouter.get(
  "/getIngredientsData",
  interceptor.adminAuth,
  controller.getIngredientsData
);
userRouter.get(
  "/vendor-management",
  interceptor.adminAuth,
  controller.vendorDashboard
);
userRouter.get(
  "/StockDashboard",
  interceptor.adminAuth,
  controller.StockDashboard
);
userRouter.get(
  "/fetchAcessDetail/:ID",
  interceptor.adminAuth,
  controller.fetchAcessDetail
);
userRouter.post(
  "/vendorDateFilter",
  interceptor.adminAuth,
  controller.vendorDateFilter
);
userRouter.get(
  "/getAllSalesReport",
  interceptor.adminAuth,
  controller.getAllSalesReport
);
userRouter.get(
  "/GetRestaurantDetail",
  interceptor.adminAuth,
  controller.GetRestaurantDetail
);
userRouter.get(
  "/getAllOpeningDateFilter",
  interceptor.posAuth,
  posController.getAllOpeningDateFilter
);

/* Accessed employees side */
userRouter.post(
  "/employeeSignInVerification",
  controller.employeeSignInVerification
);
userRouter.post("/sendFeedback", controller.sendFeedback);

userRouter.get(
  "/capDashboard",
  interceptor.capAuth,
  capController.capDashboard
); // Pos dashboard
userRouter.get(
  "/isPassBookReportsAdded",
  interceptor.posAuth,
  posController.isPassBookReportsAdded
);
userRouter.get(
  "/getUniqueBromagId",
  interceptor.posAuth,
  posController.getUniqueBromagId
); // Pos dashboard
userRouter.get(
  "/posDashboard",
  interceptor.posAuth,
  posController.posDashboard
); // Pos dashboard
userRouter.post("/KotOrders", interceptor.posAuth, posController.KotOrders);
userRouter.post("/printBill", interceptor.posAuth, posController.printBill);
userRouter.get(
  "/getMenuDataAtPos",
  interceptor.posAuth,
  posController.getMenuDataAtPos
);
userRouter.post(
  "/holdItemsAtPos",
  interceptor.posAuth,
  posController.holdItemsAtPos
);

userRouter.get(
  "/takeAwayData",
  interceptor.posAuth,
  posController.takeAwayData
); //order records
userRouter.get("/onlineData", interceptor.posAuth, posController.onlineData);
userRouter.get("/getDineIn", interceptor.posAuth, posController.getDineIn);
userRouter.get("/GetDineInSuccesData", interceptor.posAuth, posController.GetDineInSuccesData);

userRouter.post(
  "/todayExpense",
  interceptor.posAuth,
  posController.todayExpense
); // passbook
userRouter.post(
  "/addTodaysExpense",
  upload.ImageUploader.single("image"),
  interceptor.posAuth,
  posController.addTodaysExpense
);
userRouter.post(
  "/addTodaysClosing",
  upload.ImageUploader.array("image", 5),
  interceptor.posAuth,
  posController.addTodayClosing
);
userRouter.get(
  "/posExpenseData",
  interceptor.posAuth,
  posController.posExpenseData
);
userRouter.get(
  "/fetchTodaysfloatingCash",
  interceptor.posAuth,
  posController.fetchTodaysfloatingCash
);
userRouter.get(
  "/getExpenseData",
  interceptor.posAuth,
  posController.getexpenseData
);
userRouter.get(
  "/getOpeningData",
  interceptor.posAuth,
  posController.getOpeningData
);
userRouter.get(
  "/getTodayOpeningData",
  interceptor.posAuth,
  posController.getTodaysOpeningData
);
userRouter.get(
  "/getTodayClosingData",
  interceptor.posAuth,
  posController.getTodayClosingData
);
userRouter.get(
  "/getClosingData",
  interceptor.posAuth,
  posController.getClosingData
);
userRouter.get(
  "/pos/fetchPassbookData",
  interceptor.posAuth,
  posController.fetchPassbookData
);
userRouter.post(
  "/passbookDateFilter",
  interceptor.posAuth,
  posController.passbookDateFilter
);
userRouter.post(
  "/TodaysClosingDateFilter",
  interceptor.posAuth,
  posController.TodaysClosingDateFilter
);
userRouter.post(
  "/expenseDateFilter",
  interceptor.posAuth,
  posController.expenseDateFilter
);
userRouter.get(
  "/GetClosingFieldData",
  interceptor.posAuth,
  posController.GetClosingFieldData
);

userRouter.get(
  "/getAllRegisteredPos",
  interceptor.adminAuth,
  controller.getAllRegisteredPos
);

userRouter.post(
  "/addCustomerBillCap",
  upload.ImageUploader.single("image"),
  interceptor.capAuth,
  capController.addCustomerBill
);

userRouter.post(
  "/addTodaysOpeningBalance",
  interceptor.posAuth,
  posController.addOpeningbalance
);

userRouter.get(
  "/getAllcustomerDetails",
  interceptor.posAuth,
  controller.customerDetails
); //customer related
userRouter.get(
  "/getAllcustomerBill",
  interceptor.posAuth,
  posController.getAllcustomerBill
);
userRouter.get(
  "/searchTodaysExpense/:query",
  interceptor.posAuth,
  posController.searchTodaysExpense
);
userRouter.get(
  "/searchTodayClosing/:query",
  interceptor.posAuth,
  posController.searchTodayClosing
);
userRouter.get(
  "/searchTodayOpening/:query",
  interceptor.posAuth,
  posController.searchTodayOpening
);
userRouter.post(
  "/addCustomerBill",
  upload.ImageUploader.single("image"),
  interceptor.posAuth,
  posController.addCustomerBill
);

userRouter.post("/addLeads", interceptor.posAuth, posController.addLeads); // leads related at pos
userRouter.get(
  "/getLeadsData",
  interceptor.posAuth,
  posController.getLeadsData
);
userRouter.post(
  "/deleteLeadData",
  interceptor.posAuth,
  posController.deleteLeadData
);
userRouter.get(
  "/getToEditLead/:leadId",
  interceptor.posAuth,
  posController.getToEditLead
);
userRouter.post(
  "/updateLeads/:leadId",
  interceptor.posAuth,
  posController.updateLeads
);
userRouter.post(
  "/takeAwayUserToLead",
  interceptor.posAuth,
  posController.takeAwayUserToLead
);

// Cap dashboard
userRouter.get(
  "/captainDashboard",
  interceptor.capAuth,
  capController.captainDashboard
);
userRouter.post(
  "/tableBooking",
  interceptor.capAuth,
  capController.tableBooking
);
userRouter.get(
  "/getTableStatus",
  interceptor.capAuth,
  capController.getTableStatus
);
userRouter.get(
  "/getMenuDataAtCap",
  interceptor.capAuth,
  capController.getMenuDataAtCap
);

userRouter.get(
  "/getAllRegisteredCapPos",
  interceptor.capAuth,
  capController.getAllRegisteredPosCap
);
userRouter.post(
  "/printBillAtCap",
  interceptor.capAuth,
  capController.printBillAtCap
);
userRouter.post(
  "/KotOrdersAtCap",
  interceptor.capAuth,
  capController.KotOrdersAtCap
);
userRouter.put(
  "/cancelTable/:tableId",
  interceptor.capAuth,
  capController.cancelTable
);
userRouter.get(
  "/TableDetailsByID/:tableId",
  interceptor.capAuth,
  capController.getTableDetails
);

userRouter.post(
  "/holdItemsAtCap",
  interceptor.capAuth,
  capController.holdItemsAtCap
);
userRouter.get(
  "/getAllcustomerBillForCaptain",
  interceptor.capAuth,
  capController.getAllcustomerBill
);
userRouter.get(
  "/getAllcustomerDetailsCap",
  interceptor.capAuth,
  controller.customerDetails
);

userRouter.get(
  "/getOrderedDataAtCap/:kotId",
  interceptor.capAuth,
  capController.getOrderedDataAtCap
); //bill data

userRouter.post(
  "/addLeadsAtCap",
  interceptor.capAuth,
  capController.addLeadsAtCap
); // leads related at cap
userRouter.get(
  "/getLeadsDataAtCap",
  interceptor.capAuth,
  capController.getLeadsDataAtCap
);
userRouter.post(
  "/deleteLeadDataAtCap",
  interceptor.capAuth,
  capController.deleteLeadDataAtCap
);
userRouter.get(
  "/getToEditLeadAtCap/:leadId",
  interceptor.capAuth,
  capController.getToEditLeadAtCap
);
userRouter.post(
  "/updateLeadsAtCap/:leadId",
  interceptor.capAuth,
  capController.updateLeadsAtCap
);

module.exports = userRouter;
