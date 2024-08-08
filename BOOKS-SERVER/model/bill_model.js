const mongoose = require("mongoose");
const { menuSchema } = require("./menu_model");
// console.log(menuSchema);

const billSchema = mongoose.Schema({
  restrauntId: String,
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
  employeeId: String,
  billNo: String,
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
  grossValue: {
    type: Number,
    
  },
  discount: {
    type: Number,
    
  },
  netValue: {
    type: Number,
    
  },
  taxes: {
    type: Number,
    
  },
  roundOff: {
    type: Number,
    
  },
  total: {
    type: Number,
    
  },
  paymentMode: {
    type: String,
    
  },
  status: String,
});

billSchema.statics.generateBillId = async function (
  restaurantName,
  restrauntId
) {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
  console.log(restaurantName);
  const restaurantCode = restaurantName.substring(0, 3).toUpperCase();

  // Find the last order for this restaurant from today
  const lastOrder = await this.findOne({
    restrauntId: restrauntId,
    // date: { $gte: new Date(dateString) },
    // $or: [
    //   { orderStatus: 'Success' },
    //   { orderMode: { $in: ['Swiggy', 'Zomato', 'Bromag', 'others'] } }
    // ],
  }).sort({ date: -1 });

  console.log("NEWWW BILLL ID-----------------------------------------");
  console.log(lastOrder);
  let count = 0;
  if (lastOrder && lastOrder.billNo) {
    // Extract the count from the last bill ID
    const lastBillId = lastOrder.billNo;
    const lastCount = lastBillId
      ? parseInt(lastBillId?.substring(3), 10)
      : 1;
    count = (lastCount + 1) % 10000; // Ensure the count is within 0000 to 9999 range
  }

  // Format the bill ID
  const billId = `${restaurantCode}${count.toString().padStart(4, "0")}`;
  return billId;
};

billSchema.statics.getTotalBillsForDay = async function(restaurantId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: 1 }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalAmount : 0;
};

billSchema.statics.getTotalAmountForDay = async function(restaurantId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$total" }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalAmount : 0;
};


billSchema.statics.getTotalOnlineAmountForDay = async function(restaurantId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        mode: 'online',
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$total" }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalAmount : 0;
};


billSchema.statics.getTotalTakeawayAmountForDay = async function(restaurantId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        mode: 'takeaway',
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$total" }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalAmount : 0;
};


billSchema.statics.getTotalDineinAmountForDay = async function(restaurantId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        mode: 'dinein',
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$total" }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalAmount : 0;
};


// Daily breakdown
billSchema.statics.getBillBreakdownForDay = async function(restaurantId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: "$mode",
        count: { $sum: 1 }
      }
    }
  ]);

  const breakdown = {
    online: 0,
    takeaway: 0,
    dinein: 0,
    total: 0
  };

  result.forEach(item => {
    if (item._id === 'online') breakdown.online = item.count;
    if (item._id === 'takeaway') breakdown.takeaway = item.count;
    if (item._id === 'dinein') breakdown.dinein = item.count;
    breakdown.total += item.count;
  });

  return breakdown;
};

// Weekly breakdown
billSchema.statics.getBillBreakdownForWeek = async function(restaurantId, date) {
  const startOfWeek = new Date(date);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        date: {
          $gte: startOfWeek,
          $lte: endOfWeek
        }
      }
    },
    {
      $group: {
        _id: "$mode",
        count: { $sum: 1 }
      }
    }
  ]);

  const breakdown = {
    online: 0,
    takeaway: 0,
    dinein: 0,
    total: 0
  };

  result.forEach(item => {
    if (item._id === 'online') breakdown.online = item.count;
    if (item._id === 'takeaway') breakdown.takeaway = item.count;
    if (item._id === 'dinein') breakdown.dinein = item.count;
    breakdown.total += item.count;
  });

  return breakdown;
};

// Monthly breakdown
billSchema.statics.getBillBreakdownForMonth = async function(restaurantId, inpDate) {
  const date = new Date(inpDate);
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        date: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      }
    },
    {
      $group: {
        _id: "$mode",
        count: { $sum: 1 }
      }
    }
  ]);

  const breakdown = {
    online: 0,
    takeaway: 0,
    dinein: 0,
    total: 0
  };

  result.forEach(item => {
    if (item._id === 'online') breakdown.online = item.count;
    if (item._id === 'takeaway') breakdown.takeaway = item.count;
    if (item._id === 'dinein') breakdown.dinein = item.count;
    breakdown.total += item.count;
  });

  return breakdown;
};

// Helper function to get date range
const getDateRange = (date, period) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  if (period === 'week') {
    start.setDate(start.getDate() - start.getDay());
    end.setDate(end.getDate() + (6 - end.getDay()));
  } else if (period === 'month') {
    start.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
  }

  return { start, end };
};

// Total Bills
billSchema.statics.getTotalBills = async function(restaurantId, date, period = 'day') {
  const { start, end } = getDateRange(date, period);
  return this.countDocuments({
    restrauntId: restaurantId,
    status: "COMPLETED",
    date: { $gte: start, $lte: end }
  });
};

// Total Bills where items are same
billSchema.statics.getTotalBillsWithSameItems = async function(restaurantId, date, period = 'day') {
  const { start, end } = getDateRange(date, period);
  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        date: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: {
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: "$$item.itemId"
            }
          }
        },
        count: { $sum: 1 }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    },
    {
      $group: {
        _id: null,
        totalBillsWithSameItems: { $sum: "$count" }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalBillsWithSameItems : 0;
};

// Total Bills where same items are repeated
billSchema.statics.getTotalBillsWithRepeatedItems = async function(restaurantId, date, period = 'day') {
  const { start, end } = getDateRange(date, period);
  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        date: { $gte: start, $lte: end }
      }
    },
    {
      $addFields: {
        hasRepeatedItems: {
          $gt: [
            { $size: { $setDifference: ["$items.itemId", { $setUnion: "$items.itemId" }] } },
            0
          ]
        }
      }
    },
    {
      $match: {
        hasRepeatedItems: true
      }
    },
    {
      $count: "totalBillsWithRepeatedItems"
    }
  ]);

  return result.length > 0 ? result[0].totalBillsWithRepeatedItems : 0;
};

// Repeat rate
billSchema.statics.getRepeatRate = async function(restaurantId, date, period = 'day') {
  const totalBills = await this.getTotalBills(restaurantId, date, period);
  const billsWithRepeatedItems = await this.getTotalBillsWithRepeatedItems(restaurantId, date, period);

  if (totalBills === 0) return 0;

  return (billsWithRepeatedItems / totalBills) * 100;
};

// Function to get order type breakdown
billSchema.statics.getOrderTypeBreakdown = async function(restaurantId, date, period = 'day') {
  const { start, end } = getDateRange(date, period);
  const result = await this.aggregate([
    {
      $match: {
        restrauntId: restaurantId,
        status: "COMPLETED",
        date: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: "$mode",
        count: { $sum: 1 }
      }
    }
  ]);

  const totalOrders = result.reduce((sum, item) => sum + item.count, 0);
  const breakdown = {
    online: 0,
    takeaway: 0,
    dinein: 0
  };

  result.forEach(item => {
    if (item._id in breakdown) {
      breakdown[item._id] = (item.count / totalOrders) * 100;
    }
  });

  return {
    online: +breakdown.online.toFixed(2),
    takeaway: +breakdown.takeaway.toFixed(2),
    dinein: +breakdown.dinein.toFixed(2)
  };
};

// Updated function to get all stats including order type breakdown
billSchema.statics.getStats = async function(restaurantId, date, period = 'day') {
  const totalBills = await this.getTotalBills(restaurantId, date, period);
  const billsWithSameItems = await this.getTotalBillsWithSameItems(restaurantId, date, period);
  const billsWithRepeatedItems = await this.getTotalBillsWithRepeatedItems(restaurantId, date, period);
  const repeatRate = await this.getRepeatRate(restaurantId, date, period);
  const orderTypeBreakdown = await this.getOrderTypeBreakdown(restaurantId, date, period);

  return {
    totalBills,
    billsWithSameItems,
    billsWithRepeatedItems,
    repeatRate: repeatRate.toFixed(2) + '%',
    orderTypeBreakdown
  };
};

module.exports = mongoose.model("BillingOrder", billSchema);
