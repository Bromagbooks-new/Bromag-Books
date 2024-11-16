const mongoose = require("mongoose");
const { menuSchema } = require("./menu_model");

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
  kotNoList: {
    type: [String],
    required: true,
    default: []
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
  const restaurantCode = restaurantName
    ? restaurantName.substring(0, 3).toUpperCase()
    : "DEF";

  // Find the last KOT document for this restaurant
  const lastUniqueKotId = await this.findOne({
    restrauntId: restrauntId,
  }).sort({ date: -1 });

  let count = 1; // Default count if no prior KOTs exist
  if (lastUniqueKotId && lastUniqueKotId.kotNoList && lastUniqueKotId.kotNoList.length > 0) {
    const lastKotId = lastUniqueKotId.kotNoList.slice(-1)[0]; // Get the last KOT number in the list
    const lastCount = parseInt(lastKotId?.slice(6), 10) || 1; // Extract numeric part after "KOT"
    count = (lastCount + 1) % 10000; // Increment and ensure it's within the 4-digit range
  }

  // Format the count to 4 digits with leading zeros
  const formattedCount = count.toString().padStart(4, "0");

  // Create the final KOT number
  const kotNo = `${restaurantCode}KOT${formattedCount}`;
  return kotNo;
};


module.exports = mongoose.model("KOT", kotSchema);
