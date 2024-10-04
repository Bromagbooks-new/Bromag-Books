
const mongoose = require("mongoose");

const restaurantTableNewSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },

    restaurant: {
        type: mongoose.ObjectId,
        ref: "Restaurant",
    },
}, {
    timestamps : true
})

restaurantTableNewSchema.index({ restaurant : 1 })
restaurantTableNewSchema.index({ tableNumber : 1 })

module.exports = mongoose.model("restaurantnewaddedtable", restaurantTableNewSchema);