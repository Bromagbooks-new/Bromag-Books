const mongoose = require("mongoose");
const { menuSchema } = require("./menu_model");
// console.log(menuSchema);

const kotSchema = mongoose.Schema({
  restrauntId: {
    type: mongoose.ObjectId,
    ref: "restaurant",
    required: true
  },
  billNo: {
    type: String,

    required: true
  },
  kotNo: {
    type: String,
    required: true
  },
  billId: {
    type: mongoose.ObjectId,
    ref: "billingorders",
    required: true
  },
  date: {
    type: Date
  },
  // aggregator: {
  //   type: String,

  // },
  // aggregatorOrderId: {
  //   type: String,

  // },
  items: [
    new mongoose.Schema({
      actualPrice: Number,
      aggregatorId: String,
      cuisine: String,
      discountPrice: Number,
      itemId: String,
      itemType: String,
      name: String,
      portion: String,
      quantity: Number,
      subCuisine: String
    }),
  ],
  instructions: [
    {
      type: String
    }
  ],
  paymentMode: {
    type: String
  },
  status: {
    type: String,
    required: true,
    default: "HOLD",
    enum: ["COMPLETED", "HOLD", "CANCELLED"]
  },
});

kotSchema.statics.generateKOTNo = async function (
  restrauntId,
  restaurantName,
  billNo
) {
  // console.log('restaurantName:', restaurantName)
  // console.log('billNo:', billNo)
  // console.log("restaurant", restaurantName)
  const restaurantCode = (restaurantName ? restaurantName.substring(0, 3).toUpperCase() : "DEF") + billNo;
  // RAT0035 RAT
  // console.log('restaurantCode:', restaurantCode)
  // const today = new Date();
  // const dateString = today.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
  // console.log('dateString:', dateString)
  // console.log(restaurantName);
  // const restaurantCode = restaurantName.substring(0, 3).toUpperCase();

  // Find the last order for this restaurant from today
  const lastUniqueKotId = await this.findOne({
    restrauntId: restrauntId,
    // date: { $gte: new Date(dateString) },
    // $or: [
    //   { orderStatus: 'Success' },
    //   { orderMode: { $in: ['Swiggy', 'Zomato', 'Bromag', 'others'] } }
    // ],
  }).sort({ date: -1 });

  // console.log('lastUniqueKotId:', lastUniqueKotId)
  // console.log(lastUniqueKotId);
  let count = 1;
  if (lastUniqueKotId && lastUniqueKotId.kotNo) {
    // Extract the count from the last bill ID
    const lastKotId = lastUniqueKotId.kotNo;
    const lastCount = lastKotId?.split("#")[0]
      ? parseInt(lastKotId?.substring(3), 10)
      : 1;
    count = (lastCount + 1) % 10000; // Ensure the count is within 0000 to 9999 range
  }

  // Format the bill ID
  const billId = `${"KOT"}${count.toString().padStart(4, "0")}#${restaurantCode}`;
  return billId;
};

module.exports = mongoose.model("KOT", kotSchema);