const Expense = require("../model/ExpenseModel");
const OpeningBalance = require("../model/OpeningBalance");
const bill_model = require("../model/bill_model");
const Bill = require("../model/bill_model");
const restaurant_model = require("../model/restaurant_model");
const path = require("path");
const helpers = require("../utils/helpers");
const ClosingReport = require("../model/ClosingReport");

exports.generateBill = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(isRestaurant, req.body);

    const {
      customerName,
      customerEmail,
      customerPhone,
      aggregator,
      orderId,
      tableNo,
      mode,
    } = req.body;
    const restraunt = await restaurant_model.findById(isRestaurant);

    console.log(restraunt);
    const generatedBillNo = await bill_model.generateBillId(
      restraunt.username,
      isRestaurant
    );

    // console.log(isRestaurant, req.body);
    const newBill = new bill_model({
      restrauntId: restraunt.id,
      restrauntName: restraunt.username,
      restrauntAddress: restraunt.address,
      restrauntEmail: restraunt.email,
      billNo: generatedBillNo,
      mode: mode,
      status: "HOLD",
    });

    if (mode === "online") {
      newBill.mode === "online",
        (newBill.aggregatorOrderId = orderId),
        (newBill.aggregator = aggregator);
    }

    if (mode === "takeaway") {
      newBill.customerName = customerName;
      newBill.customerEmail = customerEmail;
      newBill.customerPhone = customerPhone;
    }

    if (mode === "dinein") {
      newBill.customerName = customerName;
      newBill.customerEmail = customerEmail;
      newBill.customerPhone = customerPhone;
      newBill.tableNo = tableNo;
    }

    console.log(newBill);
    console.log(newBill.id);

    await newBill.save();

    res.status(201).json({
      status: "BILL_GENERATED",
      message: "Bill Generated Successfully",
      billId: newBill.id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.fetchBill = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(isRestaurant, req.body);

    const billId = req.body.billId;

    const bill = await bill_model.findById(billId);

    res.status(200).json({
      status: "BILL_FETCHED",
      message: "Bill Fetched Successfully",
      bill: bill,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.fetchHoldBills = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(isRestaurant, req.body);

    // const billId = req.body.billId;

    const bills = await bill_model.find({
      restrauntId: isRestaurant,
      status: "HOLD",
    });

    res.status(200).json({
      status: "BILL_FETCHED",
      message: "Bill Fetched Successfully",
      bill: bills,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.fetchCompletedBills = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(isRestaurant, req.body);

    // const billId = req.body.billId;

    // Fetch and sort bills in descending order based on the date field
    const bills = await bill_model
      .find({
        restrauntId: isRestaurant,
        status: "COMPLETED",
      })
      .sort({ date: -1 });

    res.status(200).json({
      status: "BILL_FETCHED",
      message: "Bill Fetched Successfully",
      bill: bills,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.updateBill = async (req, res) => {
  try {
    const { billId, items, instructions, paymentMode, status } = req.body;

    const bill = await bill_model.findById(billId);
    console.log(bill);
    if (items) bill.items = items;

    console.log("BILL ITEMSS-----", items);
    if (instructions) bill.instructions = instructions;
    if (paymentMode) bill.paymentMode = paymentMode;
    if (status) bill.status = status;

    console.log("BILL---------------------------------------------", bill);

    if (status === "COMPLETED") {
      console.log(bill.items);
      const grossValue = bill.items.reduce(
        (total, item) => (total += item.quantity * item.actualPrice),
        0
      );

      console.log("grossValue", grossValue);
      const discount = bill.items.reduce(
        (total, item) =>
          (total += (item.actualPrice - item.discountPrice) * item.quantity),
        0
      );
      // console.log(discount);

      const netValue = bill.items.reduce(
        (total, item) => (total += item.quantity * item.discountPrice),
        0
      );

      const taxRate = 5;
      const tax = (taxRate / 100) * netValue;

      let totalValue = netValue + tax;

      let roundOff = 0;

      if (paymentMode === "cash") {
        roundOff = totalValue - Math.round(totalValue);
        totalValue = Math.round(totalValue);
      }

      bill.grossValue = grossValue;
      bill.discount = discount;
      bill.netValue = netValue;
      bill.taxes = tax;
      bill.roundOff = roundOff;
      bill.total = totalValue;
    }

    await bill.save();

    console.log(bill);
    res.status(201).json({
      status: "BILL_MODIFIED",
      message: "Bill Modified Successfully",
      bill: bill,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.deleteBill = async (req, res) => {
  try {
    const { billId } = req.body;

    // Find the bill by ID and delete it
    const bill = await bill_model.findByIdAndDelete(billId);

    // If bill doesn't exist, return an error
    if (!bill) {
      return res.status(404).json({
        status: "BILL_NOT_FOUND",
        message: "Bill not found",
      });
    }

    res.status(200).json({
      status: "BILL_DELETED",
      message: "Bill deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.addOpeningReport = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const { denominations, totalAmount } = req.body;
    console.log(denominations);

    const openingReport = new OpeningBalance({
      cashDenomination: denominations,
      totalAmount,
      restaurantId: isRestaurant,
    });

    await openingReport.save();

    res.status(201).json({
      status: "OPENING_REPORT_CREATED",
      message: "Opening Report Crearted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};
exports.getOpeningReports = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const reports = await OpeningBalance.find({
      restaurantId: isRestaurant,
    }).sort({ createdAt: -1 }); // Sort in descending order

    // console.log("REPORTSSSS", reports);

    res.status(200).json({
      status: "OPENING_REPORT_CREATED",
      message: "Opening Report Created Successfully",
      reports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.isOpeningReportCreatedToday = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const report = await OpeningBalance.findOne({
      restaurantId: isRestaurant,
      createdAt: { $gte: today },
    });

    res.status(200).json({
      status: "SUCCESS",
      isCreatedToday: !!report,
      message: report
        ? "Opening report has been created today"
        : "No opening report created today",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const { description, totalAmount } = req.body;

    const file = req.files[0];

    const dirPath = path.join("uploads", "expenses");
    const fileName = `${isRestaurant}/${file.filename}`;
    const imagePath = path.join(dirPath, fileName);
    // const imagePath = `table/${isRestaurant}/${file.filename}`;

    await helpers.uploadFileLocally(file, imagePath);

    const itemImage = helpers.getFileUrlLocally(imagePath);
    console.log("imagePath: ", itemImage);
    // helpers.deleteFile(file.path);
    const relativeImagePath = `/${imagePath.replace(/\\/g, "/")}`;

    // console.log(denominations);

    const expense = new Expense({
      description,
      totalAmount,
      restaurantId: isRestaurant,
      bill: relativeImagePath,
    });

    await expense.save();

    res.status(201).json({
      status: "EXPENSE_CREATED",
      message: "Expense Crearted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};
exports.getExpenses = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const reports = await Expense.find({ restaurantId: isRestaurant }).sort({
      createdAt: -1,
    }); // Sort in descending order

    // console.log("REPORTSSSS", reports);

    res.status(200).json({
      status: "EXPENSES_FETCHED",
      message: "Expenses Fetched Successfully",
      reports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.getPassbookData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const { date } = req.body;

    // Create start and end of the day
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    console.log(start);

    let openingBalance = 0;
    const openingReport = await OpeningBalance.findOne({
      restaurantId: isRestaurant,
      createdAt: { $gte: start },
    });
    if (openingReport) {
      openingBalance = openingReport.totalAmount;
    }

    let closingBalance = 0;
    const closingReport = await ClosingReport.findOne({
      restaurantId: isRestaurant,
      createdAt: { $gte: start },
    });

    if (closingReport) {
      // console.log("CLOSINGG REPORTT", closingReport);
      closingBalance = closingReport.totalCashAmount;
    }

    const totalExpenses = await Expense.getTotalExpensesForDay(
      isRestaurant,
      date
    );

    const salesAmount = await Bill.getTotalAmountForDay(isRestaurant, date);

    const netAmount = openingBalance + salesAmount - totalExpenses;

    const passbookData = {
      openingBalance,
      salesAmount,
      totalExpenses,
      closingBalance,
      netAmount,
    };

    res.status(200).json({
      status: "PASSBOOK_DATA_FETCHD",
      message: "Passbook Data Fetched Successfully",
      passbookData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.addClosingReport = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const { denominations, totalAmount: totalCashAmount } = req.body;
    console.log(denominations);

    const today = new Date();

    const totalBills = await Bill.getTotalBillsForDay(isRestaurant, today);
    const totalAmount = await Bill.getTotalAmountForDay(isRestaurant, today);
    const totalOnlineAmount = await Bill.getTotalTakeawayAmountForDay(
      isRestaurant,
      today
    );
    const totalTakeawayAmount = await Bill.getTotalOnlineAmountForDay(
      isRestaurant,
      today
    );
    const totalDineinAmount = await Bill.getTotalDineinAmountForDay(
      isRestaurant,
      today
    );

    const closingReport = new ClosingReport({
      cashDenomination: denominations,
      totalCashAmount,
      restaurantId: isRestaurant,
      totalBills,
      totalAmount,
      totalDineinAmount,
      totalOnlineAmount,
      totalTakeawayAmount,
    });

    await closingReport.save();

    res.status(201).json({
      status: "CLOSING_REPORT_CREATED",
      message: "Closing Report Crearted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};
exports.getClosingReports = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const reports = await ClosingReport.find({
      restaurantId: isRestaurant,
    }).sort({ createdAt: -1 }); // Sort in descending order

    // console.log("REPORTSSSS", reports);

    res.status(200).json({
      status: "CLOSING_REPORTS_FETCHED",
      message: "Closing Report Fetched Successfully",
      reports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.isClosingReportCreatedToday = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const report = await ClosingReport.findOne({
      restaurantId: isRestaurant,
      createdAt: { $gte: today },
    });

    res.status(200).json({
      status: "SUCCESS",
      isCreatedToday: !!report,
      message: report
        ? "Closing report has been created today"
        : "No opening report created today",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.getCardAnalytics = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const { date } = req.body;

    const dailyBreakdown = await Bill.getBillBreakdownForDay(
      isRestaurant,
      date
    );
    const monthlyBreakdown = await Bill.getBillBreakdownForMonth(
      isRestaurant,
      date
    );
    const weeklyBreakdown = await Bill.getBillBreakdownForWeek(
      isRestaurant,
      date
    );

    const breakdown = { dailyBreakdown, monthlyBreakdown, weeklyBreakdown };

    res.status(200).json({
      status: "CARD_ANALYTICS_FETCHED",
      message: "Card Analytics Fetched Successfully",
      breakdown,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const isRestraunt = req.restaurant;

    const { date } = req.body;

    const dailyStats = await Bill.getStats(isRestraunt, date, "day");
    const weeklyStats = await Bill.getStats(isRestraunt, date, "week");
    const monthlyStats = await Bill.getStats(isRestraunt, date, "month");

    const stats = {
      dailyStats,
      weeklyStats,
      monthlyStats,
    };
    res.status(200).json({
      status: "DASHBOARD_ANALYTICS_FETCHED",
      message: "Dashboard Analtics Fetched Successfully",
      stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};
