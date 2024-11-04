
const kot_model = require("../model/kot_model");
const restaurant_model = require("../model/restaurant_model");
const menu_item_model = require("../model/menu_item_model");
const billModel = require("../model/bill_model");
const { formatTodayDate } = require("../utils/formateDate.js");

exports.generateKOT = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log("kotNo", isRestaurant, req.body);

    const { billData } = req.body;
    const { items, restrauntName, billNo } = billData;
    console.log("kotNo2", isRestaurant, items);
    const kotNo = await kot_model.generateKOTNo(isRestaurant, restrauntName, billNo);
    // console.log("object", kotNo);

    const newKOT = new kot_model({ ...billData, kotNo, billId: billData._id });
    console.log("newkot", newKOT);
    await newKOT.save();

    const promises = items.map(async (item) => {
      return await menu_item_model.findOneAndUpdate(
        { _id: item._id },
        { $inc: { quantity: -item.quantity }, itemType: item?.itemType }
      );
    });

    const updates = await Promise.all(promises);
    console.log("UPDATESSS", updates);

    res.status(201).json({
      status: "KOT_GENERATED",
      message: "KOT Generated Successfully",
      KOT: newKOT,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "FAILED", message: "Internal Server Error" });
  }
};


exports.getKotUniqueIdController = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    // console.log('isRestaurant:', isRestaurant)
    const { name, street } = req.body;
    let subStreet = street.substring(3)
    // console.log(' req.body:',  req.body)
    // console.log('subStreet:', subStreet)
    // console.log('name:', name)

    const generateUniqueKotId = await kot_model.generateKOTNo(isRestaurant, name, subStreet);

    res.status(201).send({
      success: true,
      getKotUniqueId: generateUniqueKotId
    })

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong! Please again letter!"
    })
  }
}

exports.createNewKotController = async (req, res) => {
  try {
    // console.log("req.body :", req.body);
    const { billId, billItems, kotUniqueId, instructions, paymentMode } = req.body;
    const isRestaurant = req.restaurant;
    const date = formatTodayDate(new Date());
    console.log('date:', date)
    // console.log('billId, billItems, kotUniqueId, instructions:', billId, billItems, kotUniqueId, instructions)

    const existingKotWithSameIdForRespectiveRestarunt = await kot_model.findOne({ restrauntId: isRestaurant, billId: billId, kotNo: kotUniqueId });
    // console.log('existingKotWithSameIdForRespectiveRestarunt:', existingKotWithSameIdForRespectiveRestarunt)

    if (existingKotWithSameIdForRespectiveRestarunt) {
      return res.status(406).send({
        success: false,
        message: "Please provide unique kotId! This kotId is already existed!"
      })
    }

    const findBill = await billModel.findOne({ restrauntId: isRestaurant, _id: billId })
    // console.log('findBill:', findBill)
    const currentBillItems = findBill?.items || [];
    // console.log('currentBillItems:', currentBillItems)

    if (!findBill) {
      return res.status(404).send({
        success: false,
        message: "Bill is not found!"
      })
    }

    const newKot = await new kot_model({
      restrauntId: isRestaurant,
      billNo: findBill?.billNo,
      kotNo: kotUniqueId,
      billId: billId,
      items: billItems,
      instructions: instructions ? instructions : [],
      status: "HOLD",
      paymentMode: paymentMode,
      date: date
    }).save();

    const object = {};
    if (newKot) {
      for (let i = 0; i < billItems?.length; i++) {
        if (object[billItems[i].itemId]) {
          if (billItems[i].portion === "full") {
            object[billItems[i].itemId] += billItems[i].quantity * 2
          } else if (billItems[i].portion === "half") {
            object[billItems[i].itemId] += billItems[i].quantity
          }
        } else {
          if (billItems[i].portion === "full") {
            object[billItems[i].itemId] = billItems[i].quantity * 2
          } else if (billItems[i].portion === "half") {
            object[billItems[i].itemId] = billItems[i].quantity
          }
        }
      }
      // const object = billItems.reduce((acc, item) => {
      //   const multiplier = item.portion === "full" ? 2 : item.portion === "half" ? 1 : 1;
      //   acc[item.itemId] = (acc[item.itemId] || 0) + item.quantity * multiplier;
      //   return acc;
      // }, {});
    } else {
      return res.status(500).send({
        success: false,
        message: "Something went wrong! Please again letter!",
        error: "Error in creation of newKot"
      })
    }

    // const updatePromises = Object.entries(object).map(([id, quantity], index) => {
    //   return menu_item_model.updateOne(
    //     {
    //       restaruntId : isRestaurant,
    //       _id : id
    //     },
    //     {
    //       $inc : { quantity : -quantity }
    //     }
    //   )
    // })

    const updatePromises = Object.entries(object).map(([id, quantity], index) => {
      return menu_item_model.updateOne(
        {
          restaruntId: isRestaurant,
          _id: id
        },
        [
          {
            $set: {
              quantity: { $max: [0, { $subtract: ["$quantity", quantity] }] },
              availableStatus: { $cond: [{ $eq: [{ $subtract: ["$quantity", quantity] }, 0] }, false, "$availableStatus"] }
            }
          }
        ]
      )
    })

    /* 
      Promise.all(updatePromises).then((result) => console.log("result :", result)).catch((error) => console.log("error :", error))
    */
    const updateStatus = await Promise.all(updatePromises);
    // console.log('updateStatus:', updateStatus);

    if (!updateStatus[0]?.acknowledged) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong! Please again letter!",
        error: "Error in updateStatus of menu_item_model"
      })
    }

    billItems.forEach(billItem => {
      // Find if the item already exists in the items array of plainObject
      const existingItem = currentBillItems.find(item =>
        item.itemId === billItem.itemId && item.portion === billItem.portion
      );

      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += billItem.quantity;
      } else {
        // If it does not exist, push the new billItem into the items array
        currentBillItems.push(billItem);
      }
    });
    // console.log('currentBillItems:', currentBillItems)

    const updateCurrentBillItems = await billModel.updateOne(
      { restrauntId: isRestaurant, _id: billId },
      { $set: { items: currentBillItems, paymentMode: paymentMode } },
      { new: true }
    )
    // console.log('updateCurrentBillItems:', updateCurrentBillItems)

    // const updateOperations = billItems.map((item) => {
    //   return {
    //     updateOne: {
    //       filter: {
    //         restrauntId: isRestaurant,
    //         _id: billId,
    //         "items.itemId": item.itemId,
    //         "items.portion": item.portion
    //       },
    //       update: {
    //         $inc: {
    //           "items.$.quantity": item.quantity // Increment quantity if the item already exists
    //         }
    //       },
    //       upsert: false // Do not create a new document if it doesn't exist
    //     }
    //   }
    // })
    // console.log('updateOperations:', updateOperations)

    // const updateBillItemsIntoBill = await billModel.bulkWrite(updateOperations);
    // console.log('updateBillItemsIntoBill:', updateBillItemsIntoBill)

    // const existingBillDoc = await billModel.findOne({ restrauntId: isRestaurant, _id: billId })
    // const existingItems = existingBillDoc ? existingBillDoc.items : [];


    // const newItems = billItems.filter((item) => {
    //   return !existingItems.some((existing) => existing.itemId === item.itemId && existing.portion === item.portion);
    // })

    // if (newItems.length > 0) {
    // const updateNewItems = await billModel.updateOne({ restrauntId: isRestaurant, _id: billId }, { $push: { items: { $each: newItems } } });
    // console.log('updateNewItems:', updateNewItems)
    // }

    const uniqueInstructions = [...new Set(instructions)];
    if (uniqueInstructions.length > 0) {
      const updateBillWithNewInstructions = await billModel.updateOne(
        { restrauntId: isRestaurant, _id: billId },
        { $addToSet: { instructions: { $each: uniqueInstructions } } }
      )
      // console.log('updateBillWithNewInstructions:', updateBillWithNewInstructions)
    }

    return res.status(201).send({
      success: true,
      newKot: newKot,
      message: "Kot has been sent to kitchen! Thank you for order!",
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong! Please again letter!",
      error: error.message
    })
  }
}