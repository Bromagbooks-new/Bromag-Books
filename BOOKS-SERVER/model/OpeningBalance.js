const mongoose = require("mongoose");

  

const openingReportSchema = mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true,
        
    },
    restaurantId: {type: String},

    cashDenomination: {
        type: Object,
        required: true,
    },
    
}, {
    timestamps: true, 
  })

const OpeningBalance = mongoose.model('OpeningReport', openingReportSchema);

module.exports = OpeningBalance;