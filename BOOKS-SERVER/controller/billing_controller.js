const bill_model = require("../model/bill_model");
const Bill = require("../model/bill_model");
const restaurant_model = require("../model/restaurant_model");

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

    res
      .status(201)
      .json({
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

    

    res
      .status(200)
      .json({
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


    const bills = await bill_model.find({restrauntId: isRestaurant, status: 'HOLD'});

    

    res
      .status(200)
      .json({
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


    const bills = await bill_model.find({restrauntId: isRestaurant, status: 'COMPLETED'});

    

    res
      .status(200)
      .json({
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
exports.updateBill = async (req, res)=> {

  try {
    const {billId, items, instructions, paymentMode, status} = req.body;

    const bill = await bill_model.findById(billId);
    console.log(bill);
    if(items) bill.items = items;

    console.log("BILL ITEMSS-----", items);
    if(instructions) bill.instructions = instructions;
    if(paymentMode) bill.paymentMode = paymentMode;
    if(status) bill.status = status;

    console.log("BILL---------------------------------------------", bill);

    if(status === 'COMPLETED') {
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

      if(paymentMode === 'cash') {
        roundOff = totalValue - Math.round(totalValue);
        totalValue = Math.round(totalValue);
      }
  

      bill.grossValue = grossValue;
      bill.discount = discount;
      bill.netValue = netValue;
      bill.taxes = tax;
      bill.roundOff = roundOff
      bill.total = totalValue;

    }

    await bill.save();

    console.log(bill);
    res
      .status(201)
      .json({
        status: "BILL_MODIFIED",
        message: "Bill Modified Successfully",
        bill: bill,
      });

  } catch(error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }

}
