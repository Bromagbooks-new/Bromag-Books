const kot_model = require("../model/kot_model");
const restaurant_model = require("../model/restaurant_model");

exports.generateKOT = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(isRestaurant, req.body);

    const {billData} = req.body;

    const kotNo = await kot_model.generateKOTNo(isRestaurant);

    // console.log(isRestaurant, req.body);

    const newKOT = new kot_model({...billData, kotNo, billId: billData._id});
   console.log(newKOT);
   newKOT.save();

    res
      .status(201)
      .json({
        status: "KOT_GENERATED",
        message: "KOT Generated Successfully",
        KOT: newKOT,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
