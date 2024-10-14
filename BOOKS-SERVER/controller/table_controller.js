const helpers = require("../utils/helpers");
const Table = require("../model/restaurant_table_model");
const AccessedEmployees = require("../model/access_model");
const Order = require("../model/order_model");
const path = require('path');
const restaurantTableModel = require("../model/restaurant_table_new_model");
const mongoose = require("mongoose");

exports.addTableData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    if (isRestaurant) {
      const { numberOfSeats, tableNum, captain } = req.body;
      const file = req.files[0];

      const dirPath = path.join('uploads', 'table');
      const fileName = `${isRestaurant}/${file.filename}`;
      const imagePath = path.join(dirPath, fileName);
    // const imagePath = `table/${isRestaurant}/${file.filename}`;

    await helpers.uploadFileLocally(file, imagePath);

    const itemImage = helpers.getFileUrlLocally(imagePath);
    // console.log("imagePath: ", itemImage);
    // helpers.deleteFile(file.path);
    const relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;

      const newTable = new Table({
        numberOfSeats,
        tableName: tableNum,
        restaurant: isRestaurant,
        image: relativeImagePath,
        captainId: captain,
      });

      await newTable.save();

      res.status(200).json({ success: true, message: `Table counts updated!` });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// New controller addNewTableData() for table management without captain
exports.addNewTableData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    console.log('isRestaurant:', isRestaurant)
    if (isRestaurant) {
      console.log('req.body:', req.body)
      const { tableNumber, numberOfSeats } = req.body;

      const existingTableNumber = await restaurantTableModel.findOne({ tableNumber });
      if(existingTableNumber) {
        return res.status(400).json({ success : false, message : "Table is already added with this table number!"})
      }

      const newTable = await new restaurantTableModel({
        tableNumber : tableNumber,
        numberOfSeats : numberOfSeats,
        restaurant : isRestaurant
      }).save();

      res.status(200).json({ 
        success: true, 
        newTable,
        message: `New table has created!` 
      });

    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* 

[
  {
    $match: {
      restaurant : ObjectId("66ebea9e2e76f642e528ec1d")
    }
  },
  {
    $group: {
      _id: "$numberOfSeats",
      totalTableCountBasedOnSeaterType : {
      	$sum : 1
      },
      newAddedTableData : {
        $push : "$$ROOT"
      }
    }
  },
  {
    $unwind: "$newAddedTableData"
  },
  {
    $sort : {"newAddedTableData.createdAt" : 1}
  },
  {
    $skip: 0
  },
  {
    $limit : 10
  }
]
_id
restrauntId
customerName
mode
tableNo
status
tableData.numberOfSeats
{
    $group: {
      _id: "$tableData.numberOfSeats",
      tableBillData : {
        $push : "$$ROOT"
      }
    }
  }
*/

// Get total count of added table
exports.getNewTableDatCount = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    if(isRestaurant) {
      const pipeline = [
        {
          $match: {
            restaurant : new mongoose.Types.ObjectId(isRestaurant)
          }
        },
        {
          $group: {
            _id: "$numberOfSeats",
            totalTableCountBasedOnSeaterType : {
              $sum : 1
            }
          }
        },
        {
          $sort : { _id : 1 }
        }
      ]
      const getNewTableDatCount = await restaurantTableModel.aggregate(pipeline)

      res.status(200).json({ success : true, getNewTableDatCount });
    } else {
      return res.status(401).json({ success : false, message : "session expired please do login again!" })
    }

  } catch(error) {
    console.error("error in getNewTableDatCount :", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// get all added table data
exports.getNewTableData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log('req.query:', req.query)
    let { page = 1, sortBy } = req.query
    page = Number(page)
    const limit = 10;
    const skip = (page - 1) * limit;

    if(isRestaurant) {
      const pipeline = [
        {
          $match: {
            restaurant : new mongoose.Types.ObjectId(isRestaurant)
          }
        },
        {
          $sort : { [sortBy] : 1 }
        },
        {
          $skip: skip
        },
        {
          $limit : limit
        }
      ]
      const newAddedTableData = await restaurantTableModel.aggregate(pipeline)

      res.status(200).json({ success : true, newAddedTableData });
    } else {
      return res.status(401).json({ success : false, message : "session expired please do login again!" })
    }
  } catch(error) {
    console.error("error in getNewTableData :", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// get single table data
exports.getSingleTableInfo = async (req, res) => {
  try {
    const { tableId } = req.params;
    const isRestaurant = req.restaurant;

    if(isRestaurant) {
      const getSingleTableInfo = await restaurantTableModel
      .find({ $and : [{ restaurant : isRestaurant}, {_id : tableId} ] })
      .select({ _id : 1, numberOfSeats : 1, tableNumber : 1 })
      res.status(200).json({ success : true, getSingleTableInfo });
    } else {
      return res.status(401).json({ success : false, message : "session expired please do login again!" })
    }
  } catch(error) {
    console.error("error in getSingleTableInfoTableManagement :", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.updateTableForTableManagement = async (req, res) => {
  try {
    const { tableId } = req.params;
    const { tableNumber, numberOfSeats } = req.body;
    const isRestaurant = req.restaurant;
    if(isRestaurant) {
      // const existingTableNumber = await restaurantTableModel.findOne({ $and : [{ restaurant : isRestaurant}, {tableNumber : tableNumber} ] });
      // console.log('existingTableNumber:', existingTableNumber)

      // if(existingTableNumber) {
      //   return res.status(400).json({ success : false, message : "Table is already exists with this table number!"})
      // }

      const getUpdatedTableInfo = await restaurantTableModel
      .findOneAndUpdate({ $and : [{ restaurant : isRestaurant}, {_id : tableId} ] }, { tableNumber, numberOfSeats });
      console.log('getUpdatedTableInfo:', getUpdatedTableInfo)

      res.status(200).json({ success : true, message : "Table data has updated" });
    } else {
      return res.status(401).json({ success : false, message : "session expired please do login again!" })
    }
  } catch(error) {
    console.error("error in updateTableForTableManagement :", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getTableDataAtAdmin = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const tableData = await Table.find({
        restaurant: isRestaurant,
      })
      console.log(tableData, "tableData");
      res.status(200).json({ success: true, tableData });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateTableActive = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const { tableId } = req.params;
      const { isShared } = req.body;
      const updatedTable = await Table.findByIdAndUpdate(
        tableId,
        {
          $set: {
            restaurant: isRestaurant,
            isShared: isShared,
          },
        },
        { new: true }
      );

      if (!updatedTable) {
        return res
          .status(404)
          .json({ success: false, message: "Table not found" });
      }

      res.json({ success: true, updatedTable });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getToEditTableData = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (restaurant) {
      const tableId = req.params.tableId;
      const table = await Table.findOne({
        _id: tableId,
        restaurant: restaurant,
      });
      const captains = await AccessedEmployees.find({
        restaurant: restaurant,
        accessFor: "Captain manager",
      }).select("-password");
      
      if (table) {
        res.json({ success: true, table, captains ,table});
      } else {
        res.status(404).json({ success: false, message: "Category not found" });
      }
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateTableData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const tableId = req.params.tableId;
    const { tableNum, numberOfSeats ,captain} = req.body;

  
    
    if (isRestaurant) {
      let tableImage;
      let relativeImagePath;

      if (req.files && req.files.length > 0) {
        const file = req.files[0];
        const table = await Table.find({ _id: tableId });

        const oldPicURL = table.image;

        await helpers.deleteOldFiles(oldPicURL);

        const dirPath = path.join('uploads', 'table');
      const fileName = `${isRestaurant}/${file.filename}`;
      const imagePath = path.join(dirPath, fileName);
        // const imagePath = `table/${isRestaurant}/${file.filename}`;

        await helpers.uploadFileLocally(file, imagePath);

        tableImage = helpers.getFileUrlLocally(imagePath);
        console.log(tableImage, "tableImage");
        relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;
      }

      const updatedTable = await Table.updateOne(
        { _id: tableId },
        {
          $set: {
            tableName: tableNum,
            numberOfSeats: numberOfSeats,
            image: relativeImagePath,
            captainId:captain
          },
        }
      );
console.log(updatedTable,"updatedTable");
      if (!updatedTable) {
        return res
          .status(404)
          .json({ success: false, message: "Table not found" });
      }

      res.json({
        success: true,
        message: "Table updated successfully",
        menu: updatedTable,
      });
    } else {
      res.json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.deleteTable = async (req, res) => {
  try {
    // Extract restaurant from request
    const restaurant = req.restaurant;
    
    // Check if the request is from a restaurant
    if (restaurant) {
      // Extract tableId from request body
      const { tableId } = req.body;
      
      // Find and delete the table based on its ID and associated restaurant
      const tableData = await Table.findOneAndDelete({
        _id: tableId,
        restaurant: restaurant,
      });
      
      // Send successful response with confirmation message
      res.status(200).json({
        success: true,
        message: `Table ${tableData.tableName} is deleted!`, // Include deleted table's name in message
      });
    } else {
      // Send failure message if the request is not from a restaurant
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
  }
};




exports.captainList = async (req, res) => {
  try {
    // Check if the request comes from a restaurant

    console.log('In captain list');
    const isRestaurant = req.restaurant;
    
    // If it's from a restaurant
    if (isRestaurant) {
      // Find captains associated with the restaurant
      const captains = await AccessedEmployees.find({
        restaurant: isRestaurant,
        accessFor: "Captain manager",
      }).select("-password"); // Exclude password field from the result
      
      // Count total dine-in orders for the restaurant
      const TotalDineInOrders = await Order.countDocuments({
        orderMode: "dineIn",
        billId: { $exists: true, $ne: null }, // Check if billId exists and is not null
        restaurantId: isRestaurant,
      });

      console.log(TotalDineInOrders);
      console.log("Hre");
      
      // Send successful response with captains list and total dine-in orders
      res.status(200).json({ success: true, captains, TotalDineInOrders });
    } else {
      // If request is not from a restaurant, send failure message
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
  }
};



exports.captainPassFilter = async (req, res) => {
  try {
    // Extract restaurant from request
    const restaurant = req.restaurant;

    // Check if the request is from a restaurant
    if (restaurant) {
      // Extract start and end dates from request body
      const { start, end } = req.body;

      // Aggregate orders based on specified criteria
      const filteredData = await Order.aggregate([
        {
          $match: {
            orderMode: 'dineIn',
            restaurantId: restaurant,
            date: {
              $gte: new Date(start), // Filter orders from start date
              $lte: new Date(end + 'T23:59:59.999Z'), // Filter orders till end of end date
            },
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%d-%m-%Y", date: "$date" } // Group orders by formatted date
              },
            },
            totalSales: { $sum: '$Amount' }, // Calculate total sales
            totalOrders: { $sum: 1 }, // Count total orders
          },
        },
        {
          $sort: { '_id.date': -1 } // Sort results by date in descending order
        }
      ]);

      // Send successful response with filtered data
      return res.json({ success: true, data: filteredData });
      
    } else {
      // Send failure message if the request is not from a restaurant
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
  }
};

