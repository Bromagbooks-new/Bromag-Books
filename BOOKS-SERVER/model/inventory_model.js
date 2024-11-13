const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemType: {
        type: String,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
    },
    soldOut: {
        type: Number,
        required: true,
    },
    leftOut: {
        type: Number,
        required: true,
    },
    priceValue: {
        type: Number,
        required: true,
    },
    // date: {
    //     type: Date,
    //     default: Date.now,
    // },
    size: {
        type: String,
        required: false,
    },
    restaurantId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
