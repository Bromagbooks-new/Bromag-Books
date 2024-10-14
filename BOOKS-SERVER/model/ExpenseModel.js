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


expenseSchema.statics.getTotalExpensesForDay = async function(restaurantId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restaurantId: restaurantId,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: "$totalAmount" }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalExpenses : 0;
};

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
