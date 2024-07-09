const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  orderStation: String,
  orderId: String,
  orderTime: String,
  paymentMethod: String,
  Amount: Number,
  KotItems: [
    {
      id: String,
      quantity: Number,
      item: String,
      price: Number,
      totalItemPrice: Number,
    },
  ],
  restaurantId: {
    type: String,
    ref: "Restaurant",
  },
  posManagerId: String,
  billId: String, 
  date: {
    type: Date,
    default: Date.now,
  },
  orderStatus: String,
  kotCount:{type:Number,
    default:1
  },
  orderMode: {
    type: String,
    enum: ['Zomato','Swiggy','Bromag','Others','takeaway', 'dineIn'], 
    default: 'pending', 
  },
  customerName: String,
  phone: String,
  // capManagerId: {
  //   type: String,
  //   ref: "Restaurant",
  // },
  capManagerId: {
    type: String,
    ref: "AccessedEmployees",
  },
  tableStatus: {
    type: String,
  },
  tableNumber: {
    type: String,
    ref: "RestaurantTable",

  },
  status: String,
  tableId: {
    type: String,
    ref: "RestaurantTable",
  },
});

orderSchema.statics.generateBillId = async function(restaurantName, restrauntId) {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
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
    const lastCount = lastBillId ? parseInt(lastOrder.billId?.substring(3), 10) :  0;
    count = (lastCount + 1) % 10000; // Ensure the count is within 0000 to 9999 range
  }

  // Format the bill ID
  const billId = `${restaurantCode}${count.toString().padStart(4, '0')}`;
  return billId;
};

module.exports = mongoose.model('Order', orderSchema);
