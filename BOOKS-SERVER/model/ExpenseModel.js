const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    restaurantId: { type: String },

    description: { type: String },
    bill: { type: String },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
