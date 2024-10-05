const Expense = require("../model/ExpenseModel");
const OpeningBalance = require("../model/OpeningBalance");
const bill_model = require("../model/bill_model");
const Bill = require("../model/bill_model");
const restaurant_model = require("../model/restaurant_model");
const path = require("path");
const helpers = require("../utils/helpers");
const ClosingReport = require("../model/ClosingReport");
const restaurantTableModel = require("../model/restaurant_table_new_model");
const mongoose = require("mongoose");

exports.generateBill = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(isRestaurant, req.body);

    const {
      customerName,
      customerEmail,
      customerPhone,
      aggregator,
      orderId,
      tableNo,
      mode,
    } = req.body;
    // console.log('req.body:', req.body)

    // console.log('mode:', mode)
    if (mode === "dinein") {
      const isTableExists = await restaurantTableModel.findOne({ $and: [{ restaurant: isRestaurant }, { tableNumber: tableNo }] })
      // console.log('isTableExists:', isTableExists)
      if (!isTableExists) return res.status(404).json({ success: false, message: "This table is not present! Please select avilable table!" })

      const isTableOnHold = await bill_model.findOne({ $and: [{ restrauntId: isRestaurant }, { tableNo: tableNo }, { status: "HOLD" }] })
      // console.log('isTableOnHold:', isTableOnHold)
      if (isTableOnHold) return res.status(406).json({ success: false, message: "This table is on hold! Please choose another table Number!" })
    }


    const restraunt = await restaurant_model.findById(isRestaurant);
    // console.log('restraunt:', restraunt)

    console.log(restraunt);
    const generatedBillNo = await bill_model.generateBillId(
      restraunt.username,
      isRestaurant
    );
    // console.log('generatedBillNo:', generatedBillNo)

    // console.log(isRestaurant, req.body);
    const newBill = new bill_model({
      restrauntId: restraunt.id,
      restrauntName: restraunt.username,
      restrauntAddress: restraunt.address,
      restrauntEmail: restraunt.email,
      billNo: generatedBillNo,
      mode: mode,
      status: "HOLD",
    });

    if (mode === "online") {
      newBill.mode === "online",
        (newBill.aggregatorOrderId = orderId),
        (newBill.aggregator = aggregator);
    }

    if (mode === "takeaway") {
      newBill.customerName = customerName;
      newBill.customerEmail = customerEmail;
      newBill.customerPhone = customerPhone;
    }

    if (mode === "dinein") {
      newBill.customerName = customerName;
      newBill.customerEmail = customerEmail;
      newBill.customerPhone = customerPhone;
      newBill.tableNo = tableNo;
    }

    // console.log(newBill);
    // console.log(newBill.id);

    await newBill.save();

    res.status(201).json({
      status: "BILL_GENERATED",
      message: "Bill Generated Successfully",
      billId: newBill.id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.fetchBill = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(isRestaurant, req.body);

    const billId = req.body.billId;

    const bill = await bill_model.findOne({ _id : billId, restrauntId : isRestaurant });

    res.status(200).json({
      status: "BILL_FETCHED",
      message: "Bill Fetched Successfully",
      bill: bill,
    });
  } catch (error) {
    console.error(error);
    
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.fetchHoldBills = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(isRestaurant, req.body);
    const { type } = req.query

    // const billId = req.body.billId;

    const bills = await bill_model.find({
      restrauntId: isRestaurant,
      status: "HOLD",
      mode : type
    }).sort({date : -1});

    res.status(200).json({
      status: "BILL_FETCHED",
      message: "Bill Fetched Successfully",
      bill: bills,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.fetchCompletedBills = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const { type }  = req.query
    // console.log(isRestaurant);
    // console.log('req.body:', req.query)

    // const billId = req.body.billId;

    // Fetch and sort bills in descending order based on the date field
    const bills = await bill_model
      .find({
        restrauntId: isRestaurant,
        status: "COMPLETED",
        mode : type
      })
      .sort({ date: -1 }).limit(50);

    res.status(200).json({
      status: "BILL_FETCHED",
      message: "Bill Fetched Successfully",
      bill: bills,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.updateBill = async (req, res) => {
  try {
    const { billId, items, instructions, paymentMode, status } = req.body;

    const bill = await bill_model.findById(billId);
    console.log(bill);
    if (items) bill.items = items;

    console.log("BILL ITEMSS-----", items);
    if (instructions) bill.instructions = instructions;
    if (paymentMode) bill.paymentMode = paymentMode;
    if (status) bill.status = status;

    console.log("BILL---------------------------------------------", bill);

    if (status === "COMPLETED") {
      console.log(bill.items);
      const grossValue = bill.items.reduce(
        (total, item) => (total += item.quantity * item.actualPrice),
        0
      );

      console.log("grossValue", grossValue);
      const discount = bill.items.reduce(
        (total, item) =>
          (total += (item.actualPrice - item.discountPrice) * item.quantity),
        0
      );
      // console.log(discount);

      const netValue = bill.items.reduce(
        (total, item) => (total += item.quantity * item.discountPrice),
        0
      );

      const taxRate = 5;
      const tax = (taxRate / 100) * netValue;

      let totalValue = netValue + tax;

      let roundOff = 0;

      if (paymentMode === "cash") {
        roundOff = totalValue - Math.round(totalValue);
        totalValue = Math.round(totalValue);
      }

      bill.grossValue = grossValue;
      bill.discount = discount;
      bill.netValue = netValue;
      bill.taxes = tax;
      bill.roundOff = roundOff;
      bill.total = totalValue;
    }

    await bill.save();

    console.log(bill);
    res.status(201).json({
      status: "BILL_MODIFIED",
      message: "Bill Modified Successfully",
      bill: bill,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
exports.deleteBill = async (req, res) => {
  try {
    const { billId } = req.body;

    // Find the bill by ID and delete it
    const bill = await bill_model.findByIdAndDelete(billId);

    // If bill doesn't exist, return an error
    if (!bill) {
      return res.status(404).json({
        status: "BILL_NOT_FOUND",
        message: "Bill not found",
      });
    }

    res.status(200).json({
      status: "BILL_DELETED",
      message: "Bill deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.getTotalBillsEitherForTakeAwayOrOnlineOrdersController = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    let { page = 1, type } = req.query;
    page = Number(page);
    const limit = 10;
    const skip = (page - 1) * limit;

    if(isRestaurant) {
      const totalOrdersBillData = await bill_model.find({ mode : type, restrauntId : isRestaurant }).sort({ date : -1 }).skip(skip).limit(limit);

      res.status(200).send({
        success : true,
        totalOrdersBillData
      });
    } else {
      return res.status(401).json({ success : false, message : "session expired please do login again!" })
    }
  } catch(error) {
    console.error("error in getTotalBillsEitherForTakeAwayOrOnlineOrdersController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Get Tables Hold, Available And Total Tables Count
/* 
{
  db.collection.aggregate([
  {
    $addFields: {
      holdAndAvailableTableData: {
        $map: {
          input: "$holdAndAvailableTableData",
          as: "table",
          in: {
            $mergeObjects: [
              "$$table",
              {
                date: { $ifNull: ["$$table.date", new Date(0)] } // Default to epoch if date is missing
              }
            ]
          }
        }
      }
    }
  },
  {
    $project: {
      holdAndAvailableTableData: {
        $sortArray: {
          input: "$holdAndAvailableTableData",
          sortBy: { date: 1 } // Ascending order
        }
      }
    }
  }
])

const sortedTableData = [...tableData].sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0); // Default to epoch if date is missing
    const dateB = b.date ? new Date(b.date) : new Date(0); // Default to epoch if date is missing
    return dateA - dateB; // Ascending order
  });

  [
  {
    $match: {
      restaurant : ObjectId("66ebea9e2e76f642e528ec1d")
    }
  },
  {
    $project: {
      _id : 1,
      tableNumber : 1,
      numberOfSeats : 1,
    }
    
  },
  {
    $lookup: {
      from : "billingorders",
      let : {tableNum : "$tableNumber"},
      pipeline : [
        {
          $match : {
            $expr : {
              $and : [
                {$eq : ["$tableNo", "$$tableNum"]},
                {$eq : ["$status", "HOLD"]}
              ]
            }
          }
        },
        {
          $project : {
            _id : 1,
            customerName : 1,
            tableNo : 1,
            status : 1,
            date : 1
          }
        }
      ],
      as : "dataWithHoldTable"
    }
  },
  {
    $unwind: {
      path: "$dataWithHoldTable",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group: {
      _id: "$numberOfSeats",
      holdAndAvailableTableData : {
        $push : {
          tableId : "$_id",
          tableNumber : "$tableNumber",
          tableNumber : "$tableNumber",
          billId : "$dataWithHoldTable._id",
          status : "$dataWithHoldTable.status",
          date : "$dataWithHoldTable.date",
          customerName : "$dataWithHoldTable.customerName",
        }
      }
    }
  }
]
}
*/
exports.getTablesHoldAndAvailableCount = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    let pipeline = [
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(isRestaurant)
        }
      },
      {
        $lookup: {
          from: "billingorders",
          let: { tableNum: "$tableNumber" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$tableNo", "$$tableNum"] },
                    { $eq: ["$status", "HOLD"] }
                  ]
                }
              }
            }
          ],
          as: "TablesBillData"
        }
      },
      {
        $group: {
          _id: { $cond: { if: { $gt: [{ $size: "$TablesBillData" }, 0] }, then: "TablesOnHold", else: "AvailableTables" } },
          "count": { $sum: 1 }
        }
      }
    ]

    const tableData = await restaurantTableModel.aggregate(pipeline);
    console.log('tableData:', tableData)

    let AvailableTables = 0;
    let TablesOnHold = 0;
    for (const item of tableData) {
      console.log('item:', item)
      if (item._id === "AvailableTables") {
        AvailableTables = item.count
      } else if (item._id === "TablesOnHold") {
        TablesOnHold = item.count
      }
    }
    res.status(200).json({
      success: true,
      AvailableTables,
      TablesOnHold,
      TotalTables: AvailableTables + TablesOnHold
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Get hold table data
exports.getTablesOnHoldDataController = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const pipeline = [
      {
        $match: {
          restrauntId: isRestaurant,
          mode: "dinein",
          status: "HOLD",
        }
      },
      {
        $project: {
          tableNo: 1,
          customerName: 1,

          mode: 1,
          status: 1
        }
      },
      {
        $lookup: {
          from: "restaurantnewaddedtables",
          let: { tableNum: "$tableNo" },

          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$tableNumber", "$$tableNum"] }
              },
            },
            {
              $project: {
                tableNumber: 1,
                numberOfSeats: 1
              }
            }
          ],
          as: "tableData"
        }
      },
      {
        $unwind: "$tableData"
      },
      {
        $group: {
          _id: "$tableData.numberOfSeats",
          tables: {
            $push: {
              _id: "$_id",
              tableNo: "$tableNo",
              customerName: "$customerName",
              mode: "$mode",
              status: "$status",
              tableId: "$tableData._id",
              numberOfSeats: "$tableData.numberOfSeats"
            }
          },
          tablesCount: { $sum: 1 }
        }
      },
      {
        $project: {
          tables: 1,
          tablesCount: 1
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]

    const onHoldTableData = await bill_model.aggregate(pipeline);

    res.status(200).json({
      success: true,
      onHoldTableData
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: `Error in getTablesOnHoldDataController ${error.message}`
    })
  }
}

// Get hold and available table data
exports.getHoldAndAvailableTableDataController = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const pipeline = [
      {
        $match: {
          restaurant : new mongoose.Types.ObjectId(isRestaurant)
        }
      },
      {
        $project: {
          _id : 1,
          tableNumber : 1,
          numberOfSeats : 1,
        } 
      },
      {
        $lookup: {
          from : "billingorders",
          let : {tableNum : "$tableNumber"},
          pipeline : [
            {
              $match : {
                $expr : {
                  $and : [
                    {$eq : ["$tableNo", "$$tableNum"]},
                    {$eq : ["$status", "HOLD"]}
                  ]
                }
              }
            },
            {
              $project : {
                _id : 1,
                customerName : 1,
                tableNo : 1,
                status : 1,
                date : 1,
                mode : 1
              }
            }
          ],
          as : "dataWithHoldTable"
        }
      },
      {
        $unwind: {
          path: "$dataWithHoldTable",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$numberOfSeats",
          holdAndAvailableTableData : {
            $push : {
              tableId : "$_id",
              tableNumber : "$tableNumber",
              numberOfSeats : "$numberOfSeats",
              billId : "$dataWithHoldTable._id",
              status : "$dataWithHoldTable.status",
              date : "$dataWithHoldTable.date",
              customerName : "$dataWithHoldTable.customerName",
              mode : "$dataWithHoldTable.mode",
            }
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]

    const onHoldAndAvailableTableData = await restaurantTableModel.aggregate(pipeline);

    res.status(200).send({
      success : true,
      onHoldAndAvailableTableData
    })

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: `Error in getHoldAndAvailableTableDataController ${error.message}`
    })
  }
}

/* 
[
  {
    $match: {
     restrauntId : "66ebea9e2e76f642e528ec1d",
    	mode : "takeaway"
    }
  },
  {
    $sort : {
      date : -1
    }
  },
  {
    $group: {
      _id: "$status",
      totalOrders : { $sum : 1 },
      ordersData : {

        $push : {
          billNo : "$billNo",
          customerName : "$customerName",
          customerPhone : "$customerPhone",
         	mode : "$mode",
          items : "$items",
          date : "$date",
          restrauntAddress : "$restrauntAddress",
          paymentMode : "$paymentMode"
        }
      }
    }
  },
  {
    $addFields: {
      ordersData : {
        $cond : {
          if : { $eq : ["$_id", "COMPLETED"]},
          then : { $slice : [{ $sortArray : { input : "$ordersData", sortBy : { date : -1 }}}, 1]},
          else : "$ordersData"
        }
      }
    }
  }
]

[
  {
    $match: {
     restrauntId : "66ebea9e2e76f642e528ec1d",
    	mode : "takeaway"
    }
  },
  {
    $sort: {
      date: -1
    }
  },
  
  {
    $group: {
      _id: "$status",
      totalOrders : { $sum : 1 },
      ordersData : {

        $push : {
          billNo : "$billNo",
          customerName : "$customerName",
          customerPhone : "$customerPhone",
         	mode : "$mode",
          items : "$items",
          date : "$date",
          restrauntAddress : "$restrauntAddress",
          paymentMode : "$paymentMode"
        }
      }
    }
  },
  {
    $addFields: {
      ordersData : {
        $cond : {
          if : { $eq : ["$_id", "COMPLETED"]},
          then : { $slice : [{ input : "$ordersData", 1}]},
          else : "$ordersData"
        }
      }
    }
  }
]
*/

// Get Total And Hold Orders Bill Data For Takeaway
// exports.getTotalAndHoldOrdersBillDataForTakeAwayController = async (req, res) => {
//   try {
//     const isRestaurant = req.restaurant;

//     const pipeline = [
//       {
//         $match: {
//          restrauntId : isRestaurant,
//           mode : "takeaway"
//         }
//       },
//       {
//         $sort: {
//           date: -1
//         }
//       },
      
//       {
//         $group: {
//           _id: "$status",
//           totalOrders : { $sum : 1 },
//           ordersData : {
//             $push : {
//               $cond : {
//                 if : { $eq : ["$status", "COMPLETED"]},
//                 then : {
//                   billNo : "$billNo",
//                   customerName : "$customerName",
//                   customerPhone : "$customerPhone",
//                    mode : "$mode",
//                   items : "$items",
//                   date : "$date",
//                   restrauntAddress : "$restrauntAddress",
//                   paymentMode : "$paymentMode"
//                 },
//                 else : null
//               }
//             }
//           }
//         }
//       },
//       {
//         $addFields: {
//           ordersData : {
//             $filter : {
//               input : "$ordersData",
//               as : "ordersWithoutHold",
//               cond : { $ne : ["$$ordersWithoutHold", null]}
//             }
//           }
//         }
//       },
//       {
//         $addFields: {
//           ordersData : {
//             $cond : {
//               if : { $eq : ["$_id", "COMPLETED"]},
//               then : { $slice : ["$ordersData", 50]},
//               else : "$ordersData"
//             }
//           }
//         }
//       }
//     ]

//     const ordersBillDataForTakeAway = await bill_model.aggregate(pipeline);

//     const result = {
//       success : true,
//       totalOrdersCountForTakeAway : 0,
//       totalholdOrdersCountForTakeAway : 0,
//       completedOrdersBillForTakeAway : [],
//     }
//     if(ordersBillDataForTakeAway.length > 0) {
//       const holdOrdersData = ordersBillDataForTakeAway.find(order => order._id === "HOLD");
//       const completedOrdersData = ordersBillDataForTakeAway.find(order => order._id === "COMPLETED");

//       result.totalOrdersCountForTakeAway = (holdOrdersData?.totalOrders || 0) + (completedOrdersData?.totalOrders || 0),
//       result.totalholdOrdersCountForTakeAway = holdOrdersData?.totalOrders || 0;
//       result.completedOrdersBillForTakeAway = completedOrdersData?.ordersData || []
//     } 

//     res.status(200).send(result);
//   } catch(error) {
//     res.status(500).send({
//       success: false,
//       message: "Internal Server Issue",
//       error: `Error in getTotalAndHoldOrdersBillDataForTakeAwayController ${error.message}`
//     })
//   }
// }

// Get Total And Hold Orders Bill Count Either For TakeAway or For Online Orders
exports.getTotalAndHoldOrdersCountEitherForTakeAwayOrForOnlineController = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const { type } = req.query

    const pipeline = [
      {
        $match: {
         restrauntId : isRestaurant,
         mode : type
        }
      }, 
      {
        $group: {
          _id: "$status",
          totalOrders : { $sum : 1 },
        }
      }
    ]

    const ordersBillDataEitherForTakeAwayOrForOnline = await bill_model.aggregate(pipeline);

    const result = {
      success : true,
      totalOrdersCount : 0,
      totalholdOrdersCount : 0,
    }
    if(ordersBillDataEitherForTakeAwayOrForOnline.length > 0) {
      const holdOrdersData = ordersBillDataEitherForTakeAwayOrForOnline.find(order => order._id === "HOLD");
      const completedOrdersData = ordersBillDataEitherForTakeAwayOrForOnline.find(order => order._id === "COMPLETED");

      result.totalOrdersCount = (holdOrdersData?.totalOrders || 0) + (completedOrdersData?.totalOrders || 0),
      result.totalholdOrdersCount = holdOrdersData?.totalOrders || 0;
    } 

    res.status(200).send(result);
  } catch(error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: `Error in getTotalAndHoldOrdersCountEitherForTakeAwayOrForOnlineController ${error.message}`
    })
  }
}

exports.addOpeningReport = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const { denominations, totalAmount } = req.body;
    console.log(denominations);

    const openingReport = new OpeningBalance({
      cashDenomination: denominations,
      totalAmount,
      restaurantId: isRestaurant,
    });

    await openingReport.save();

    res.status(201).json({
      status: "OPENING_REPORT_CREATED",
      message: "Opening Report Crearted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};
exports.getOpeningReports = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const reports = await OpeningBalance.find({
      restaurantId: isRestaurant,
    }).sort({ createdAt: -1 }); // Sort in descending order

    // console.log("REPORTSSSS", reports);

    res.status(200).json({
      status: "OPENING_REPORT_CREATED",
      message: "Opening Report Created Successfully",
      reports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.isOpeningReportCreatedToday = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const report = await OpeningBalance.findOne({
      restaurantId: isRestaurant,
      createdAt: { $gte: today },
    });

    res.status(200).json({
      status: "SUCCESS",
      isCreatedToday: !!report,
      message: report
        ? "Opening report has been created today"
        : "No opening report created today",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const { description, totalAmount } = req.body;

    const file = req.files[0];

    const dirPath = path.join("uploads", "expenses");
    const fileName = `${isRestaurant}/${file.filename}`;
    const imagePath = path.join(dirPath, fileName);
    // const imagePath = `table/${isRestaurant}/${file.filename}`;

    await helpers.uploadFileLocally(file, imagePath);

    const itemImage = helpers.getFileUrlLocally(imagePath);
    console.log("imagePath: ", itemImage);
    // helpers.deleteFile(file.path);
    const relativeImagePath = `/${imagePath.replace(/\\/g, "/")}`;

    // console.log(denominations);

    const expense = new Expense({
      description,
      totalAmount,
      restaurantId: isRestaurant,
      bill: relativeImagePath,
    });

    await expense.save();

    res.status(201).json({
      status: "EXPENSE_CREATED",
      message: "Expense Crearted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};
exports.getExpenses = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const reports = await Expense.find({ restaurantId: isRestaurant }).sort({
      createdAt: -1,
    }); // Sort in descending order

    // console.log("REPORTSSSS", reports);

    res.status(200).json({
      status: "EXPENSES_FETCHED",
      message: "Expenses Fetched Successfully",
      reports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.getPassbookData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const { date } = req.body;

    // Create start and end of the day
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    console.log(start);

    let openingBalance = 0;
    const openingReport = await OpeningBalance.findOne({
      restaurantId: isRestaurant,
      createdAt: { $gte: start },
    });
    if (openingReport) {
      openingBalance = openingReport.totalAmount;
    }

    let closingBalance = 0;
    const closingReport = await ClosingReport.findOne({
      restaurantId: isRestaurant,
      createdAt: { $gte: start },
    });

    if (closingReport) {
      // console.log("CLOSINGG REPORTT", closingReport);
      closingBalance = closingReport.totalCashAmount;
    }

    const totalExpenses = await Expense.getTotalExpensesForDay(
      isRestaurant,
      date
    );

    const salesAmount = await Bill.getTotalAmountForDay(isRestaurant, date);

    const netAmount = openingBalance + salesAmount - totalExpenses;

    const passbookData = {
      openingBalance,
      salesAmount,
      totalExpenses,
      closingBalance,
      netAmount,
    };

    res.status(200).json({
      status: "PASSBOOK_DATA_FETCHD",
      message: "Passbook Data Fetched Successfully",
      passbookData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.addClosingReport = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const { denominations, totalAmount: totalCashAmount } = req.body;
    console.log(denominations);

    const today = new Date();

    const totalBills = await Bill.getTotalBillsForDay(isRestaurant, today);
    const totalAmount = await Bill.getTotalAmountForDay(isRestaurant, today);
    const totalOnlineAmount = await Bill.getTotalTakeawayAmountForDay(
      isRestaurant,
      today
    );
    const totalTakeawayAmount = await Bill.getTotalOnlineAmountForDay(
      isRestaurant,
      today
    );
    const totalDineinAmount = await Bill.getTotalDineinAmountForDay(
      isRestaurant,
      today
    );

    const closingReport = new ClosingReport({
      cashDenomination: denominations,
      totalCashAmount,
      restaurantId: isRestaurant,
      totalBills,
      totalAmount,
      totalDineinAmount,
      totalOnlineAmount,
      totalTakeawayAmount,
    });

    await closingReport.save();

    res.status(201).json({
      status: "CLOSING_REPORT_CREATED",
      message: "Closing Report Crearted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};
exports.getClosingReports = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const reports = await ClosingReport.find({
      restaurantId: isRestaurant,
    }).sort({ createdAt: -1 }); // Sort in descending order

    // console.log("REPORTSSSS", reports);

    res.status(200).json({
      status: "CLOSING_REPORTS_FETCHED",
      message: "Closing Report Fetched Successfully",
      reports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.isClosingReportCreatedToday = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const report = await ClosingReport.findOne({
      restaurantId: isRestaurant,
      createdAt: { $gte: today },
    });

    res.status(200).json({
      status: "SUCCESS",
      isCreatedToday: !!report,
      message: report
        ? "Closing report has been created today"
        : "No opening report created today",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.getCardAnalytics = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    const { date } = req.body;

    const dailyBreakdown = await Bill.getBillBreakdownForDay(
      isRestaurant,
      date
    );
    const monthlyBreakdown = await Bill.getBillBreakdownForMonth(
      isRestaurant,
      date
    );
    const weeklyBreakdown = await Bill.getBillBreakdownForWeek(
      isRestaurant,
      date
    );

    const breakdown = { dailyBreakdown, monthlyBreakdown, weeklyBreakdown };

    res.status(200).json({
      status: "CARD_ANALYTICS_FETCHED",
      message: "Card Analytics Fetched Successfully",
      breakdown,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const isRestraunt = req.restaurant;

    const { date } = req.body;
    // console.log('date:', date)

    const dailyStats = await Bill.getStats(isRestraunt, date, "day");
    const weeklyStats = await Bill.getStats(isRestraunt, date, "week");
    const monthlyStats = await Bill.getStats(isRestraunt, date, "month");

    const stats = {
      dailyStats,
      weeklyStats,
      monthlyStats,
    };
    res.status(200).json({
      status: "DASHBOARD_ANALYTICS_FETCHED",
      message: "Dashboard Analtics Fetched Successfully",
      stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal Server Error",
    });
  }
};


exports.getTableStatusData = async (req, res) => {
  try {

  } catch (error) {

  }
}