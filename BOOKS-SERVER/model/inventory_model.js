const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    itemImage: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
    },
    availableQuantity: {
        type: Number,
        required: true,
    },
    billDate: {
        type: Date,
        required: true,
    },
    billNo: {
        type: String,
        required: true,
        unique: true,
    },
    itemType: {
        type: String,
        required: true,
    },
    restaruntId: {
        type: String,
        required: true
    }
});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
