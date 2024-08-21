const mongoose = require("mongoose");

  

const closingReportSchema = mongoose.Schema({
    totalCashAmount: {
        type: Number,
        required: true,
        
    },
    restaurantId: {type: String},

    cashDenomination: {
        type: Object,
        required: true,
    },
    totalBills: {type: Number, required: true},
    totalAmount: {type: Number, required: true},
    totalOnlineAmount: {type: Number, required: true},
    totalTakeawayAmount: {type: Number, required: true},
    totalDineinAmount: {type: Number, required: true},
    
    
}, {
    timestamps: true, 
  })

const ClosingReport = mongoose.model('ClosingReport', closingReportSchema);

module.exports = ClosingReport;