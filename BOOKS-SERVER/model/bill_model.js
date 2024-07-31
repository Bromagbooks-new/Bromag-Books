const mongoose = require("mongoose");
const { menu } = require("./menu_model");
const billSchema = mongoose.Schema({
  restrauntId: String,
  employeeId: String,
  billId: String,
  date: {
    type: Date,
    default: Date.now,
  },
  mode: String,
  tableNo: {
    type: String,
    optional,
  },
  aggregator: {
    type: String,
    optional,
  },
  aggregatorsOrderId: {
    type: String,
    optional,
  },
  customerName: {
    type: String,
    optional,
  },
  customerPhone: {
    type: String,
    optional,
  },
  customerEmail: {
    type: String,
    optional,
  },
  items: [
    new mongoose.Schema({
      item: menu,
      quantiy: Number,
    }),
  ],
  grossValue: {
    type: Number,
    optional,
  },
  discount: {
    type: Number,
    optional,
  },
  netValue: {
    type: Number,
    optional,
  },
  taxes: {
    type: Number,
    optional,
  },
  roundOff: {
    type: Number,
    optional,
  },
  total: {
    type: Number,
    optional,
  },
  paymentMode: {
    type: String,
    optional,
  },
  status: String,
});

billSchema.statics.generateBillId = async function (
  restaurantName,
  restrauntId
) {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
  console.log(restaurantName);
  const restaurantCode = restaurantName.substring(0, 3).toUpperCase();

  // Find the last order for this restaurant from today
  const lastOrder = await this.findOne({
    restaurantId: restrauntId,
    date: { $gte: new Date(dateString) },
    // $or: [
    //   { orderStatus: 'Success' },
    //   { orderMode: { $in: ['Swiggy', 'Zomato', 'Bromag', 'others'] } }
    // ],
  }).sort({ date: -1 });

  console.log(lastOrder);
  let count = 0;
  if (lastOrder && lastOrder.billId) {
    // Extract the count from the last bill ID
    const lastBillId = lastOrder.billId;
    const lastCount = lastBillId
      ? parseInt(lastOrder.billId?.substring(3), 10)
      : 1;
    count = (lastCount + 1) % 10000; // Ensure the count is within 0000 to 9999 range
  }

  // Format the bill ID
  const billId = `${restaurantCode}${count.toString().padStart(4, "0")}`;
  return billId;
};

module.exports = mongoose.model("BillingOrder", billSchema);
