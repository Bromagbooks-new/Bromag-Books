const mongoose = require("mongoose");
const { menuSchema } = require("./menu_model");
// console.log(menuSchema);

const kotSchema = mongoose.Schema({
  restrauntId: {type: String, required: true},
  restrauntName: String,
  restrauntEmail: String,
  restrauntAddress:  [
    {
      building: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pin: {
        type: Number,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
  ],
  billNo: {type: String, required: true},
  kotNo: {type: String, required: true},
  billId: {type: String, required: true},
  date: {
    type: Date,
    default: Date.now,
  },
  mode: {type: String, required: true},
  tableNo: {
    type: Number,
    
  },
  aggregator: {
    type: String,
    
  },
  aggregatorOrderId: {
    type: String,
    
  },
  customerName: {
    type: String,
    
  },
  customerPhone: {
    type: String,
    
  },
  customerEmail: {
    type: String,
    
  },
  items: [
    new mongoose.Schema({
      name: String,
      quantity: Number,
      actualPrice: Number,
      discountPrice: Number,
      itemId: String,
    }),
  ],
  instructions: [String],
  status: {type: String, required: true},
});

kotSchema.statics.generateKOTNo = async function (
  restrauntId
) {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
  // console.log(restaurantName);
  // const restaurantCode = restaurantName.substring(0, 3).toUpperCase();

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
  const billId = `${"KOT"}${count.toString().padStart(4, "0")}`;
  return billId;
};

module.exports = mongoose.model("KOT", kotSchema);
