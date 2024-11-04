const { sendEmail } = require("../middleware/mailer");
const Restaurant = require("../model/restaurant_model");
const AccessedEmployees = require("../model/access_model");
const mongoose = require("mongoose");
const Employees = require("../model/employees_model");
const Customers = require("../model/customer_model");
const Venders = require("../model/vendors_model");
const Ingredients = require("../model/ingredients_model");
const jwtToken = require("jsonwebtoken");
const helpers = require("../utils/helpers");
const PosTodayOpeningBalance = require("../model/posTodayOpeningBalance");
const posTodayClosing = require("../model/posTodayClosing");
const VendorInvoice = require("../model/vendor_Invoice_model");
const Stock = require("../model/stock_model");
const StockIn = require("../model/stock_in");
const {
  ListBucketInventoryConfigurationsOutputFilterSensitiveLog,
} = require("@aws-sdk/client-s3");
const StockOut = require("../model/stock_out");
const { generateEmployId } = require("../middleware/employ_Id");
const feedback_model = require("../model/feedback_model");
const Token = require('../model/token_model');
const path = require('path');
const { DemoRequestModel } = require("../model/demo_request");
const { UserQuery } = require('../model/userQuery');
const crypto = require('crypto');

exports.getAllRegisteredPos = async (req, res) => {
  try {

    if (req.restaurant) {

      const response = await AccessedEmployees.find({
        accessFor: "POS manager",
        restaurant: req.restaurant
      }).select('username _id');


      if (response.length > 0) {
        res.status(200).json({ success: true, message: "Successfully Fetched", RegisteredPosManagers: response })
      } else {
        res.status(200).json({ success: false, message: "PosManagers didn't Exist" })
      }
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: true, message: "Internal Server Error " })
  }
}



exports.GetRestaurantDetail = async (req, res) => {
  try {
    console.log(req.restaurant, "restaurant token");
    let restaurantData
    if (req.restaurant) {

      restaurantData = await Restaurant.findById(req.restaurant)


      return res.status(200).json({ success: true, message: "Successfully Fetched", restaurantData })
    } else {

      return res.status(200).json({ success: false, message: "Something Went Wrong", restaurantData })
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: true, message: "Internal Server Error " })
  }
}


exports.getAllSalesReport = async (req, res) => {
  try {
    const restro = req.restaurant;
    const { POSManager, date } = req.query
    console.log(POSManager, "i am you");
    let response
    console.log(date, "datee");
    if (date) {

      console.log(date);

      const { start, end } = date
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (POSManager === 'All') {

        console.log(restro, POSManager, "heyy");

        response = await posTodayClosing.find({
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          restaurant: restro,
        }).sort({ date: -1 });

        console.log(response, "from date all");

      } else {

        response = await posTodayClosing.find({
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          restaurant: restro,
          posId: POSManager

        }).sort({ date: -1 });

        console.log(response, "from date ", POSManager);

      }


      return res.json({ success: true, data: response });


    } else {


      if (POSManager === 'All') {

        response = await posTodayClosing.find({
          restaurant: restro,
        }).sort({ date: -1 });

      } else {

        response = await posTodayClosing.find({
          restaurant: restro,
          posId: POSManager
        }).sort({ date: -1 });

        console.log(response, " I am response");
      }

      return res.json({ success: true, data: response });
    }

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal error occured" });
  }

};

exports.getStockInDetails = async (req, res) => {
  try {
    const restro = req.restaurant;
    const data = await StockIn.find({ restaurant: restro })
      .sort({ date: -1 })
      .populate({
        path: "VendorId",
        model: "Venders", // Replace with the actual model name for Venders
        select: "vendorName vendorId", // Specify the fields you want to retrieve for Venders
      });

    return res.status(200).json({
      message: "Successfully Fetched",
      success: true,
      stockInData: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
exports.getStockOutDetails = async (req, res) => {
  try {
    const restro = req.restaurant;

    const data = await StockOut.find({ restaurant: restro }).sort({ date: -1 });

    return res.status(200).json({
      message: "Successfully Fetched",
      success: true,
      stockOutData: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



exports.commodityStockOut = async (req, res) => {
  try {
    const restaurantId = req.restaurant;
    const { commodity, quantity, description } = req.body;

    // Find the stock entry for the given commodity and restaurant
    const stock = await Stock.findOne({
      commodityName: commodity,
      restaurant: restaurantId,
    }).select("quantity");

    // If no stock entry found, return 404 error
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Commodity not found in stock",
      });
    }

    // Check if requested quantity exceeds current stock
    if (stock.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds current stock",
      });
    }

    // Calculate new stock balance after stock outward
    const balance = stock.quantity - quantity;

    // If there is enough stock to perform stock outward
    if (balance >= 0) {
      // Create new stock outward record
      const newStockOutData = {
        date: new Date(),
        description: description,
        commodity: commodity,
        previousStock: stock.quantity,
        stockOutward: quantity,
        balanceStock: balance,
        restaurant: new mongoose.Types.ObjectId(restaurantId),
      };

      const newStockOut = new StockOut(newStockOutData);

      // Update stock quantity in the database
      const updatedStock = await Stock.updateOne(
        { commodityName: commodity, restaurant: restaurantId },
        { $set: { quantity: balance } }
      );

      console.log(updatedStock, "updated stock");

      // Save stock outward record to the database
      await newStockOut.save();

      // Return success response
      return res.status(200).json({
        success: true,
        message: "Stock updated!",
      });
    } else {
      // If there is insufficient stock balance, return error
      console.log("Insufficient stock balance: ", balance);
      return res.status(400).json({
        success: false,
        message: "Insufficient stock balance",
      });
    }
  } catch (err) {
    // Handle server errors
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};



exports.getPassBookData = async (req, res) => {
  try {
    const adminId = req.id;
    const restaurant = req.restaurant;

    //OpeningCash

    const data = await PosTodayOpeningBalance.find({
      restaurant: restaurant,
    });
    //floating Cash
    //closing cash
  } catch (err) {
    console.log(err);
  }
};

exports.verifyLogin = async (req, res) => {
  try {
    console.log("verify login called");
    const Employee = req.body.data;
    console.log("Employee data", Employee)

    const employee = await Restaurant.findOne({
      username: Employee.username,
    });
    console.log("Employee", employee)
    if (employee) {
      if (Employee.password === employee.password) {
        const token = jwtToken.sign(
          { id: employee._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1hr",
          }
        );

        const newToken = new Token({
          token: token,
          employeeId: employee._id,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        });

        await newToken.save();

        const encodedToken = btoa(token);
        const dashboardLink = `${process.env.CLIENT}/link-verification/token/${encodedToken}`;

        const mailFormat = {
          to: employee.email,
          subject: "Bromag Books Private Limited : Open your account",
          html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
              <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
                <img src="cid:logo" alt="Bromag Books" style="width: 120px; margin-bottom: 20px;">
                <h2>Welcome to BROMAG BOOKS!</h2>
                <p>Please click on the below blue button to verify & login.</p>
                <a href="${dashboardLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">LOGIN</a>
              </div>
              <div style="margin-top: 20px;">
                <p>Follow us on:</p>
                <p>
                  <a href="https://www.facebook.com" style="margin: 0 10px;"><img src="cid:facebook" alt="Facebook" style="width: 24px;"></a>
                  <a href="https://www.instagram.com" style="margin: 0 10px;"><img src="cid:instagram" alt="Instagram" style="width: 24px;"></a>
                  <a href="https://www.whatsapp.com" style="margin: 0 10px;"><img src="cid:whatsapp" alt="WhatsApp" style="width: 24px;"></a>
                  <a href="https://www.youtube.com" style="margin: 0 10px;"><img src="cid:youtube" alt="YouTube" style="width: 24px;"></a>
                  <a href="https://www.linkedin.com" style="margin: 0 10px;"><img src="cid:linkedin" alt="LinkedIn" style="width: 24px;"></a>
                </p>
              </div>
              <div style="margin-top: 20px; font-size: 12px;">
                <p>&copy; 2024 Bromag Books. All rights reserved.</p>
                <p><a href="https://www.bromagbooks.com" style="text-decoration: none; color: #007bff;">www.bromagbooks.com</a></p>
              </div>
            </div>
          `,
          attachments: [
            {
              filename: 'logo.svg',
              path: '/public',
              cid: 'logo' // same cid value as in the html img src
            },
            {
              filename: 'facebook.svg',
              path: '/public',
              cid: 'facebook'
            },
            {
              filename: 'instagram.svg',
              path: '/path',
              cid: 'instagram'
            },
            {
              filename: 'whatsapp.svg',
              path: '/path',
              cid: 'whatsapp'
            },
            {
              filename: 'youtube.svg',
              path: '/path',
              cid: 'youtube'
            },
            {
              filename: 'linkedin.svg',
              path: '/path',
              cid: 'linkedin'
            }
          ]
        };

        sendEmail(mailFormat.to, mailFormat.subject, mailFormat.html);
        res.json({
          success: true,
          token,
          message: `Welcome ${employee.username}!`,
        });

      } else {
        console.log("!password");
        res.json({ success: false, message: "Incorrect password!" });
      }
    } else {
      res.json({ success: false, message: "No match in our records!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, serverMessage: "Internal Server Error" });
  }
}


exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = atob(token);

    const tokenRecord = await Token.findOne({ token: decodedToken });

    if (!tokenRecord) {
      return res.status(200).json({ success: false, message: "Invalid token!" });
    }

    if (tokenRecord.used) {
      return res.status(200).json({ success: false, message: "This link has already been used!" });
    }

    if (new Date() > tokenRecord.expiresAt) {
      return res.status(200).json({ success: false, message: "This link has expired!" });
    }

    // Mark the token as used
    tokenRecord.used = true;
    await tokenRecord.save();

    // Return the actual token
    const actualToken = jwtToken.sign(
      { id: tokenRecord.employeeId },
      process.env.SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.json({ success: true, actualToken });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//send otp  for owner and employee verification for apk

exports.loginForMobileUsingOtp = async (req, res) => {
  try {
    console.log("verify login called");
    const Employee = req.body.data;
    console.log("Employee data", Employee);

    const employee = await Restaurant.findOne({
      username: Employee.username,
    });
    console.log("Employee", employee);
    if (employee && Employee.password === employee.password) {
      const otp = crypto.randomInt(100000, 999999);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      const otpToken = new Token({
        token: otp,
        employeeId: employee._id,
        expiresAt,
      });

      await otpToken.save();

      const mailFormat = {
        to: employee.email,
        subject: "Bromag Books Private Limited : Login OTP",
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
              <img src="cid:logo" alt="Bromag Books" style="width: 120px; margin-bottom: 20px;">
              <h2>Your OTP for BROMAG BOOKS Login</h2>
              <p>Use the OTP below to verify & login:</p>
              <h1 style="color: #007bff;">${otp}</h1>
              <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
            </div>
            <div style="margin-top: 20px; font-size: 12px;">
              <p>&copy; 2024 Bromag Books. All rights reserved.</p>
              <p><a href="https://www.bromagbooks.com" style="text-decoration: none; color: #007bff;">www.bromagbooks.com</a></p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: 'logo.svg',
            path: '/public',
            cid: 'logo'
          }
        ]
      };

      // Send OTP email
      sendEmail(mailFormat.to, mailFormat.subject, mailFormat.html);
      res.json({
        success: true,
        employeeId: employee._id,
        message: "OTP sent to your email. Please check your inbox.",
      });
    } else {
      res.json({ success: false, message: "Incorrect username or password!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, serverMessage: "Internal Server Error" });
  }
};

exports.verifyOtpForMobile = async (req, res) => {
  try {
    const { employeeId, otp } = req.body;

    const otpToken = await Token.findOne({
      employeeId,
      token: otp,
      used: false,
      expiresAt: { $gt: new Date() }
    });

    if (otpToken) {
      otpToken.used = true;
      await otpToken.save();

      const token = jwtToken.sign({ id: employeeId }, process.env.SECRET_KEY, {
        expiresIn: "1hr",
      });

      res.json({
        success: true,
        token,
        message: "OTP verified successfully!",
      });
    } else {
      res.json({ success: false, message: "Invalid, expired, or already used OTP!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, serverMessage: "Internal Server Error" });
  }
};




exports.storeDemoRequest = async (req, res) => {

  try {
    const { name, email, phone, location, type, designation, purpose, onlinePlatform } = req.body;

    const demoRequest = new DemoRequestModel({ name, email, phone, location, type, designation, purpose, onlinePlatform });
    await demoRequest.save();

    sendEmail("bromag0507@gmail.com", "New Demo Request", helpers.demoRequestEmailTemplate(name, email, phone, location, type, designation, purpose, onlinePlatform));

    res.json({ success: true, message: "Request Saved" });

  }
  catch (error) {
    res
      .status(500)
      .json({ success: false, serverMessage: "Internal Server Error" });
  }
};
exports.storeUserRequest = async (req, res) => {

  try {
    const { name, email, phone, query } = req.body;

    const userQuery = new UserQuery({ name, email, phone, query });
    await userQuery.save();

    sendEmail("bromag0507@gmail.com", "User Feedback", helpers.feedbackEmailTemplate(name, email, phone, query));

    res.json({ success: true, message: "Request Saved" });

  }
  catch (error) {
    res
      .status(500)
      .json({ success: false, serverMessage: "Internal Server Error" });
  }
};

exports.access = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const Token = token.replace(/"/g, "");
    const validUser = jwtToken.verify(Token, process.env.SECRET_KEY);

    const restaurant = validUser.id;
    const validRestaurant = await Restaurant.findOne({ _id: restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, serverMessage: "Internal Server Error" });
  }
};

exports.searchCustomerDetail = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const Token = token.replace(/"/g, "");
    const validUser = jwtToken.verify(Token, process.env.SECRET_KEY);
    console.log(validUser, "heyy");
    const restaurant = validUser.id;
    const searchValue = req.params.query;
    const restaurantId = req.restaurant;

    console.log(restaurantId);
    const query = {
      restaurant: new mongoose.Types.ObjectId(restaurantId),
    };



    if (searchValue) {

      if (!isNaN(searchValue)) {
        // If searchValue is a valid number, use direct equality match
        console.log("case 1");
        query.phone = searchValue;
      } else {

        query.$or = [
          { customer: { $regex: searchValue, $options: "i" } },
          { email: { $regex: searchValue, $options: "i" } },
          { city: { $regex: searchValue, $options: "i" } },
          { address: { $regex: searchValue, $options: "i" } },

        ];
      }
    }

    const result = await Customers.find(query);


    res.status(200).json({ success: true, data: result });
  } catch (err) {

    return res
      .status(500)
      .json({ success: false, serverMessage: "Internal Server Error" });
  }
};

exports.getAllvendors = async (req, res) => {
  try {
    const restro = req.restaurant;
    const data = await Venders.find({ restaurant: restro });
    if (data > 0) {
      return res.status(200).json({
        success: true,
        message: "SuccessFully fetched",
        vendors: data,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Please add a Vendor", vendors: data });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, serverMessage: "Internal Server Error" });
  }
};

exports.getCommidities = async (req, res) => {
  try {
    const restro = req.restaurant;

    const response = await VendorInvoice.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restro),
        },
      },
      {
        $unwind: "$commodities",
      },
      {
        $group: {
          _id: "$commodities.commodity",
        },
      },
      {
        $project: {
          _id: 0,
          commodity: "$_id",
        },
      },
    ]);
    if (response.length > 0) {
      const commodities = response.map((entry) => entry.commodity);

      return res.status(200).json({
        success: true,
        message: "Successfully Fetched",
        commodities: commodities,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, serverMessage: "Internal Server Error" });
  }
};

exports.accessedEmployees = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (restaurant) {
      const adminData = await Restaurant.findById(restaurant);
      const accessedEmployees = await AccessedEmployees.find({
        restaurant: restaurant,
        adminStatus: false,
      });
      res.json({
        success: true,
        adminData,
        accessedEmployees,
      });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, serverMessage: "Internal Server Error" });
  }
};

exports.generateNextEmployeeId = async (restaurantId) => {
  try {
    // Fetch the restaurant name using the restaurant ID
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const restaurantName = restaurant.username;
    if (!restaurantName || restaurantName.length < 3) {
      throw new Error('Invalid restaurant name');
    }

    const restaurantCode = restaurantName.substring(0, 3).toUpperCase();
    let nextEmployeeId;

    // Find the last employee whose employeeId starts with the restaurant code followed by "EMP"
    const lastEmployee = await AccessedEmployees.find({
      employeeId: { $regex: `^${restaurantCode}EMP` }
    })
      .sort({ employeeId: -1 })
      .limit(1);

    console.log("lastEmployee", lastEmployee);

    if (lastEmployee.length === 0) {
      nextEmployeeId = `${restaurantCode}EMP001`;
    } else {
      const lastEmployeeIdNumber = parseInt(lastEmployee[0].employeeId.slice(6), 10);
      const nextEmployeeIdNumber = lastEmployeeIdNumber + 1;
      const paddedNextEmployeeIdNumber = String(nextEmployeeIdNumber).padStart(3, "0");
      nextEmployeeId = `${restaurantCode}EMP${paddedNextEmployeeIdNumber}`;
    }

    console.log("Next Employee ID:", nextEmployeeId);
    return nextEmployeeId;
  } catch (err) {
    console.log(err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

exports.updatAccess = async (req, res) => {
  try {
    const { username, password, email, accessAs, ID } = req.body;
    const file = req.files[0];
    const restaurant = req.restaurant;
    console.log(accessAs, "i am accesss");
    const response = await AccessedEmployees.findOne({ _id: ID });

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const updates = {};

    if (username) updates.username = username;
    if (password) updates.password = password;
    if (email) updates.email = email;
    if (accessAs) updates.accessFor = accessAs;

    if (file) {
      console.log(file, " i am file");

      const dirPath = path.join('uploads', 'access', 'profileImage');
      const fileName = `${restaurant}/${file.filename}`;
      const imagePath = path.join(dirPath, fileName);
      // const imagePath = `/access/profileImage/${restaurant}/${file.filename}`;

      await helpers.uploadFileLocally(file, imagePath);

      const relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;
      updates.profileImage = relativeImagePath;

      if (response.profileImage) {
        const oldImagePath = path.join(__dirname, response.profileImage);
        helpers.deleteOldFiles(oldImagePath);
      }

    }

    await AccessedEmployees.updateOne({ _id: ID }, { $set: updates });

    return res
      .status(200)
      .json({ success: true, message: "Update successful" });

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.addAccess = async (req, res) => {
  try {

    const { username, password, email, accessAs } = req.body;
    const file = req.files[0];
    const employeeId = await this.generateNextEmployeeId(req.restaurant);
    console.log("emplueeID", employeeId)
    if (username) {
      const existingUsername = await AccessedEmployees.findOne({ username });
      const existingEmail = await AccessedEmployees.findOne({ email });

      if (existingUsername) {
        return res.status(200).json({
          success: false,
          message: "Username already exist Please choose another one",
        });
      } else if (existingEmail) {
        return res.status(200).json({
          success: false,
          message: "Email already exist Please choose another one",
        });
      }

      const isRestaurant = req.restaurant;
      if (file) {
        const dirPath = path.join('uploads', 'access', 'profileImage');
        const fileName = `${isRestaurant}/${file.filename}`;
        const imagePath = path.join(dirPath, fileName);
        // Log the image path
        console.log("Image path: ", imagePath);

        const uploadSuccess = await helpers.uploadFileLocally(file, imagePath);

        if (!uploadSuccess) {
          return res.status(500).json({ success: false, message: "Failed to upload file" });
        }

        const imageURL = helpers.getFileUrlLocally(imagePath);

        // Log the image URL
        console.log("Image URL: ", imageURL);

        const relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;

        const newAccess = new AccessedEmployees({
          username: username,
          password: password,
          email: email,
          profileImage: relativeImagePath,
          accessFor: accessAs,
          employeeId: employeeId,
          restaurant: req.restaurant,
        });

        await newAccess.save();

        return res
          .status(200)
          .json({ success: true, message: `${accessAs}'s access inserted!` });
      }
    } else {
      res.status(200).json({ success: false, message: "Somehing went wrong" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Somehing went wrong" });
    console.log(error);
  }
};

exports.deleteEmployeeAccess = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (restaurant) {
      const { employId } = req.body;

      const response = await AccessedEmployees.findOne({ _id: employId });

      if (response.profileImage) {
        const localFilePath = response.profileImage.replace('/uploads/', ''); // Remove the leading '/uploads/' part
        await helpers.deleteFileLocally(localFilePath);
      }

      await AccessedEmployees.findOneAndDelete({
        _id: employId,
        restaurant: restaurant,
      });

      res
        .status(200)
        .json({ success: true, message: "Employee details deleted !" });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addEmployDetails = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(req.body);
    if (isRestaurant) {
      const {
        employ,
        dob,
        currentAddress,
        email,
        permanentAddress,
        phone,
        gender,
        maritalStatus,
        aadharNumber,
        pancardNumber,
        pfNumber,
        uanNumber,
        emergencyContactName,
        emergencyContactAddress,
        emergencyContactNumber,
        emergencyContactPersonRelation,
        esiNumber,
        bloodGroup,
        employID,
      } = req.body;
      const aadharImage = req.files["aadharImage"][0];
      const pancardImage = req.files["pancardImage"][0];
      const dirPath = path.join('uploads', 'employee', 'aadharImages');
      const fileName = `${isRestaurant}/${aadharImage.filename}`;
      const aadharImagePath = path.join(dirPath, fileName);
      const dirPath1 = path.join('uploads', 'employee', 'pancardImages');
      const fileName1 = `${isRestaurant}/${pancardImage.filename}`;
      const pancardImagePath = path.join(dirPath1, fileName1);
      // const aadharImagePath = `employee/aadharImages/${isRestaurant}/${aadharImage.filename}`;
      // const pancardImagePath = `employee/pancardImages/${isRestaurant}/${pancardImage.filename}`;

      await helpers.uploadFileLocally(aadharImage, aadharImagePath);
      await helpers.uploadFileLocally(pancardImage, pancardImagePath);

      // const aadhar = helpers.getFileUrlLocally(aadharImagePath);
      // const pancard = helpers.getFileUrlLocally(pancardImagePath);

      // helpers.deleteFileLocally(pancardImage.path);
      // helpers.deleteFileLocally(aadharImage.path);

      const relativeImagePathadhar = `/${aadharImagePath.replace(/\\/g, '/')}`;
      const relativeImagePathpancard = `/${pancardImagePath.replace(/\\/g, '/')}`;

      const existingEmployee = await Employees.findOne({ employID })
      if (existingEmployee) {
        const updatedData = {
          staff: employ,
          current_address: currentAddress,
          email: email,
          gender: gender,
          aadhar_number: aadharNumber,
          pan_number: pancardNumber,
          // pf_number: pfNumber,
          // uan_number: uanNumber,
          phone: phone,
          emergency_contact_person_name: emergencyContactName,
          emergency_contact_person_address: emergencyContactAddress,
          permanent_address: permanentAddress,
          dob: dob,
          marital_status: maritalStatus,
          aadhar_image: relativeImagePathadhar,
          pancard_image: relativeImagePathpancard,
          // esi_number: esiNumber,
          blood_group: bloodGroup,
          emergency_contact_person_number: emergencyContactNumber,
          emergency_contact_person_relation: emergencyContactPersonRelation,

          status: true,
        };

        await Employees.updateOne({ employID }, { $set: updatedData });
        res
          .status(200)
          .json({ success: true, message: `${employ}'s details recorded!` });
      } else {
        res.json({
          success: false,
          message: "Employ ID is not matching in our collection",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Session expired!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.employDetails = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const employeeData = await Employees.find({
        restaurantId: isRestaurant,
      }).sort({ joinDate: -1 });
      res.status(200).json({
        success: true,
        EmployData: employeeData,
      });
    } else {
      res.json({
        success: false,
        message: "Session expired!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.addEmploymentDetails = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const { email, joinDate, employeeType, designation, employ } = req.body;
      const employID = await generateEmployId();
      const isExist = await Employees.findOne({
        restaurantId: isRestaurant,
        email: email,
      });
      if (!isExist) {
        const newUser = new Employees({
          restaurant: isRestaurant,
          employID: employID,
          email: email,
          joinDate: joinDate,
          employeeType: employeeType,
          designation: designation,
          staff: employ,
          restaurantId: isRestaurant,
        });
        await newUser.save();
        res.status(200).json({
          success: true,
          message: `${employ}'s details inserted as ${designation}.`,
        });
      } else {
        res.json({
          success: false,
          message: "This employee is already exist!",
        });
      }
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addCustomer = async (req, res) => {
  try {

    console.log("called");

    const token = req.headers["authorization"];
    const Token = token.replace(/"/g, "");
    const validUser = jwtToken.verify(Token, process.env.SECRET_KEY);


    const {
      customer,
      phone,
      email,
      city,
      state,
      zipcode,
      limit,
      address,
      aadharNumber,
    } = req.body;

    const files = req.files;

    const restaurant = validUser.restaurant;

    console.log(files, restaurant, "i am customer");

    if (restaurant) {
      let aadharImages = []

      const result = await Customers.findOne({ phone: phone });



      if (result) {
        return res
          .status(200)
          .json({ success: false, message: "Phone number already exist" });
      }
      const response = await Customers.findOne({ email: email });
      if (response) {
        return res.status(200).json({ success: false, message: "Email already exist" });
      }


      if (files) {


        for (const file of req.files) {
          // const imageURL = await S3uploadFile(file.originalname, file.buffer);
          const dirPath = path.join('uploads', 'customer', 'aadharImages');
          const fileName = `${restaurant}/${file.filename}`;
          const imagePath = path.join(dirPath, fileName);
          // const imagePath = `customer/aadharImages/${restaurant}/${file.filename}`;

          await helpers.uploadFileLocally(file, imagePath);

          helpers.deleteFileLocally(file.path);

          const imageURL = helpers.getFileUrlLocally(imagePath);
          const relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;

          // Store the URL in the array
          aadharImages.push(relativeImagePath);
        }


      }


      const newUser = new Customers({
        customer: customer,
        phone: phone,
        address: address,
        email: email,
        city: city,
        state: state,
        zipcode: zipcode,
        limit: limit,
        balance: limit,
        aadharImage: aadharImages,
        aadharNumber: aadharNumber,
        restaurant: validUser.restaurant,
      });

      await newUser.save();
      return res.status(200).json({
        success: true,
        message: `${customer}'s details stored successfully!`,
      });

    }
  } catch (error) {
    console.log(error);
  }



};

exports.customerDetails = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const Token = token.replace(/"/g, "");
    const validUser = jwtToken.verify(Token, process.env.SECRET_KEY);

    if (validUser) {
      const customerData = await Customers.find({
        restaurant: validUser.restaurant,
      });
      res.status(200).json({ success: true, customerData: customerData });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Something Went Wrong" });
  }
};

exports.getcustomerDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const customerData = await Customers.findById(id);
    res.status(200).json({ success: true, customerData: customerData });
  } catch (error) { }
};

exports.updateCustomerDetail = async (req, res) => {
  try {

    const token = req.headers["authorization"];
    const Token = token.replace(/"/g, "");
    const validUser = jwtToken.verify(Token, process.env.SECRET_KEY);


    // const Token = token.replace(/"/g, "");
    // const validUser = jwtToken.verify(Token, process.env.SECRET_KEY);
    const restaurant = validUser.restaurant;

    const {
      customer,
      email,
      phone,
      limit,
      zipcode,
      address,
      city,
      aadharNumber,
      state,
      id,
    } = req.body;

    const files = req.files;


    if (restaurant) {

      console.log("entered restro");
      const data = await Customers.findById(id);
      let aadharImages = []

      const resultByPhone = await Customers.findOne({ phone: phone, _id: { $ne: id } });


      if (resultByPhone) {
        return res
          .status(200)
          .json({ success: false, message: "Phone number already exist" });
      }

      const resultByEmail = await Customers.findOne({ email: email, _id: { $ne: id } });
      if (resultByEmail) {
        return res.status(200).json({ success: false, message: "Email already exist" });
      }


      if (files.length > 0) {
        console.log("entered files>0");

        for (const imageUrl of data.aadharImage) {
          await helpers.deleteFileLocally(imageUrl);
        }

        for (const file of files) {
          // const imageURL = await S3uploadFile(file.originalname, file.buffer);


          const dirPath = path.join('uploads', 'customer', 'aadharImages');
          const fileName = `${restaurant}/${file.filename}`;
          const imagePath = path.join(dirPath, fileName);
          // const imagePath = `customer/aadharImages/${restaurant}/${file.filename}`;
          await helpers.uploadFileLocally(file, imagePath);
          helpers.deleteFileLocally(file.path);
          const relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;
          aadharImages.push(relativeImagePath);
        }

      }

      console.log(aadharImages, " iam aadhar images arrays");

      const updateFields = {
        $set: {
          customer,
          email,
          phone,
          limit,
          zipcode,
          address,
          city,
          aadharNumber,
          state,
        },
      };


      if (aadharImages && aadharImages.length > 0) {
        updateFields.$set.aadharImage = aadharImages;
      }

      const result = await Customers.updateOne(
        { _id: id },
        updateFields
      );




      if (data.limit == data.balance) {
        await Customers.updateOne(
          { _id: id },
          {
            $set: {
              balance: limit,
            },
          }
        );
      }

      if (result.modifiedCount <= 0) {
        res.json({ success: false, message: "No change found" });
      } else if (result.modifiedCount > 0) {
        res.json({ success: true, message: "Updated Successfully" });
      } else {
        res.json({ success: false, message: "Something went wrong" });
      }

    } else {
      res.json({ success: false, message: "RestroId Unavailable" });

    }
  } catch (error) {
    console.log(error, " i am error");
    res.json({ success: false, message: "Something went wrong" });
  }
};

exports.deleteCustomerDetail = async (req, res) => {
  try {
    const customerId = req.params.Id;

    const customerData = await Customers.find({ _id: customerId });

    console.log(customerData, "customeree prevented delete temporory");
    // const deleteResult = await Customers.deleteOne({ _id: customerId });

    res.json({ success: true, message: "Deletion successfull" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const vendor_id = req.body.vendor_id;

    const response = await Venders.deleteOne({ _id: vendor_id });

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.accessRestaurantHome = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (token != null) {
      const Token = token.replace(/"/g, "");
      const validUser = jwtToken.verify(Token, process.env.SECRET_KEY);
      const restaurant = validUser.id;
      const validRestaurant = await Restaurant.findOne({
        _id: restaurant,
      }).select("-password");
      res.json({ success: true, restaurantData: validRestaurant });
    } else {
      res.json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.adminLoginVerification = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const { password, username } = req.body;
    const Token = token.replace(/"/g, "");
    const validRestaurant = jwtToken.verify(Token, process.env.SECRET_KEY);

    console.log(validRestaurant, "validated Restaurant Id");
    const restaurant = await Restaurant.findById(validRestaurant.id);
    console.log(restaurant, "validated restaurant");

    if (restaurant) {
      console.log(restaurant);
      const admin = await AccessedEmployees.findOne({
        password: password,
        username: username,
        adminStatus: true,
        restaurant: restaurant._id,
      });
      console.log(admin, "validated admin");

      if (admin) {
        const token = jwtToken.sign(
          { id: admin._id, role: "owner", restaurant: restaurant.id },
          process.env.SECRET_KEY,
          {
            expiresIn: "30d",
          }
        );

        res.json({
          success: true,
          Token: token,
          message: `Welcome ${admin.username}`,
        });
      } else {
        res.json({ success: false, message: "Invalid Credentials" });
      }
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error during admin login verification:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.employeeSignInVerification = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const Token = token.replace(/"/g, "");
    const validUser = jwtToken.verify(Token, process.env.SECRET_KEY);
    const { username, password } = req.body;
    const employee = await AccessedEmployees.findOne({
      $and: [
        { username: username },
        { password: password },
        { adminStatus: { $ne: true } },
        { restaurant: validUser.id },
      ],
    });
    if (employee) {
      const designation = employee.accessFor;

      let responseData = { success: true };

      if (designation === "POS manager") {
        const token = jwtToken.sign(
          { id: employee._id, role: "pos", restaurant: validUser.id },
          process.env.SECRET_KEY,
          {
            expiresIn: "30d",
          }
        );
        responseData.PosManager = true;
        responseData.token = token;
      } else if (designation === "Captain manager") {
        const token = jwtToken.sign(
          { id: employee._id, role: "cap", restaurant: validUser.id },
          process.env.SECRET_KEY,
          {
            expiresIn: "30d",
          }
        );
        responseData.Captain = true;
        responseData.token = token;
      } else {
        responseData.OtherDesignation = true;
      }

      res.json(responseData);
    } else {
      res.json({ success: false, message: "Username or password incorrect!" });
    }
  } catch (error) {
    console.error("Error during employee login verification:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.generateVendorId = async (req, res) => {
  try {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var uniqueID = "";

    // First character is always an uppercase letter
    uniqueID += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
      Math.floor(Math.random() * 26)
    );

    // Generate the rest of the ID
    for (var i = 1; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters.charAt(randomIndex);
    }

    const isExist = await Venders.findOne({ vendorId: uniqueID });
    if (isExist) {
      return await this.generateVendorId();
    }
    return uniqueID;
  } catch (err) {
    console.log(err);
  }
};

exports.getAllVendorCategories = async (req, res) => {
  try {
    const restro = req.restaurant;
    const ingredient = await Venders.distinct("ingredient", {
      restaurant: restro,
    });
    if (ingredient < 0) {
      return res
        .status(200)
        .json({ success: false, message: "No Category at all" });
    }

    return res.status(200).json({
      success: true,
      message: "Succefully fetched",
      category: ingredient,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.addVenderDetails = async (req, res) => {
  try {
    const file = req.file;
    const restaurant = req.restaurant;
    const VendorId = await this.generateVendorId();
    let imagePath;
    const {
      AccountNumber,
      BranchCode,
      GST,
      category,
      contact,
      vendorName,
      ifsc,
    } = req.body;

    if (file) {
      const dirPath = path.join('uploads', 'vender', 'vendorProof');
      const fileName = `${restaurant}/${file.filename}`;
      const imagePath = path.join(dirPath, fileName);
      // imagePath = `vender/vendorProof/${restaurant}/${file.filename}`;
      await helpers.uploadFileLocally(file, imagePath);
      ImageURL = helpers.getFileUrlLocally(imagePath);
      const relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;
      helpers.deleteFileLocally(file.path)

      const vendorData = new Venders({
        ingredient: category,
        vendorId: VendorId,
        vendorName: vendorName,
        phone: contact,
        billImage: relativeImagePath,
        gst: GST,
        ifsc: ifsc,
        branchCode: BranchCode,
        accountNumber: AccountNumber,
        restaurant: restaurant,
      });

      await vendorData.save();

      return res
        .status(200)
        .json({ success: true, message: "Vendor details successFully  saved" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Unable to upload Proof" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.updateVenderDetails = async (req, res) => {
  try {
    const file = req.file;
    const restaurant = req.restaurant;
    let imagePath;
    const {
      AccountNumber,
      BranchCode,
      GST,
      category,
      contact,
      vendorName,
      ifsc,
      id,
    } = req.body;
    const vendorData = await Venders.find({ _id: id });

    if (file) {
      const dirPath = path.join('uploads', 'vender', 'vendorProof');
      const fileName = `${restaurant}/${file.filename}`;
      const imagePath = path.join(dirPath, fileName);
      // imagePath = `vender/vendorProof/${restaurant}/${file.filename}`;

      helpers.deleteFileLocally(vendorData.billImage);
      await helpers.uploadFileLocally(file, imagePath);

      ImageURL = helpers.getFileUrlLocally(imagePath);
      const relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;
      // helpers.deleteFileLocally(file.path);

      const updateData = {
        $set: {
          ingredient: category,
          vendorName: vendorName,
          phone: contact,
          billImage: relativeImagePath,
          gst: GST,
          ifsc: ifsc,
          branchCode: BranchCode,
          accountNumber: AccountNumber,
          restaurant: restaurant,
        },
      };

      await Venders.updateOne({ _id: id }, updateData);
    } else {
      const updateData = {
        $set: {
          ingredient: category,
          vendorName: vendorName,
          phone: contact,
          gst: GST,
          ifsc: ifsc,
          branchCode: BranchCode,
          accountNumber: AccountNumber,
          restaurant: restaurant,
        },
      };

      await Venders.updateOne({ _id: id }, updateData);
    }

    return res
      .status(200)
      .json({ success: true, message: "Vendor details successFully  saved" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.getVenderDetails = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const vendorsData = await Venders.find({ restaurant: isRestaurant }).sort({ addedDate: -1 });
      res.status(200).json({ success: true, VendorData: vendorsData });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

exports.addIngredientsDetails = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    const {
      description,
      vendorDetails,
      commodities,
      totalAmount,
      paymentMode,
    } = req.body;
    const [vendor_id, vendorID, companyName, vendorNumber] =
      vendorDetails.split(" - ");

    const comoditiesArray = JSON.parse(commodities);

    if (restaurant) {
      const file = req.file;

      let ImageURL;
      let relativeImagePath;

      if (file) {
        const dirPath = path.join('uploads', 'vender', 'ingredients');
        const fileName = `${restaurant}/${file.filename}`;
        const imagePath = path.join(dirPath, fileName);
        // const imagePath = `vender/ingredients/${restaurant}/${file.filename}`;

        await helpers.uploadFileLocally(file, imagePath);

        ImageURL = helpers.getFileUrlLocally(imagePath);

        relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;
        console.log(ImageURL, "url");
      }
      const isExist = await Venders.findOne({ _id: vendor_id });

      if (isExist) {
        const vendorInvoice = new VendorInvoice({
          vendorId: vendor_id,
          description: description,
          amount: totalAmount,
          paymentMode: paymentMode,
          billImage: relativeImagePath,
          restaurant: restaurant,
          vendorName: companyName,
          commodities: comoditiesArray,
        });

        // [ { commodity: 'Potato', Quantity: '8.9', Unit: 'kg' } ]

        for (const stockItem of comoditiesArray) {
          const quantity = parseFloat(stockItem.Quantity);
          const CommodityAmount = parseFloat(stockItem.CommodityAmount);

          await Stock.findOneAndUpdate(
            {
              commodityName: stockItem.commodity,
              restaurant: new mongoose.Types.ObjectId(restaurant),
            },
            {
              $inc: { quantity: quantity },
              $set: { unit: stockItem.Unit },
            },
            { upsert: true, new: true }
          );

          const newStockInEntry = new StockIn({
            date: new Date(),
            commodity: stockItem.commodity,
            stockInward: quantity,
            unit: stockItem.Unit,
            VendorId: new mongoose.Types.ObjectId(vendor_id),
            amount: CommodityAmount,
            billURL: relativeImagePath,
            restaurant: new mongoose.Types.ObjectId(restaurant),
          });

          await vendorInvoice.save();
          await newStockInEntry.save();
        }

        res.status(200).json({
          success: true,
          message: `Invoice recorded SuccessFully`,
        });
      } else {
        res.json({
          success: false,
          message: "This vendor ID is not found!",
        });
      }
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getIngredientsData = async (req, res) => {
  try {
    const restaurantId = req.restaurant;

    if (restaurantId) {
      console.log(restaurantId, "hey");
      const response = await VendorInvoice.find({ restaurant: restaurantId })
        .sort({ createdAt: -1 })
        .populate({
          path: "vendorId",
          model: "Venders", // Replace with the actual model name for Venders
          select: "vendorName vendorId", // Specify the fields you want to retrieve for Venders
        });

      return res.status(200).json({ success: true, IngredientsData: response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.fetchAcessDetail = async (req, res) => {
  try {
    const ID = req.params.ID;
    const restaurant = req.restaurant;
    if (restaurant) {
      const response = await AccessedEmployees.find({
        _id: ID,
        restaurant: restaurant,
      });
      return res.status(200).json({ success: true, AccessData: response });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

async function getBillImagesForYesterday(restaurantId) {
  // Get the start and end of yesterday
  const startOfYesterday = new Date();
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  startOfYesterday.setHours(0, 0, 0, 0);

  const endOfYesterday = new Date();
  endOfYesterday.setDate(endOfYesterday.getDate() - 1);
  endOfYesterday.setHours(23, 59, 59, 999);

  try {
    // Query the database for VendorInvoices created yesterday for the given restaurantId
    const invoices = await VendorInvoice.find({
      restaurant: restaurantId,
      createdAt: { $gte: startOfYesterday, $lte: endOfYesterday },
    });

    // Extract and return the billImages and vendorNames
    const billImagesByVendor = {};
    invoices.forEach((invoice) => {
      const { vendorName, billImage } = invoice;
      if (!billImagesByVendor[vendorName]) {
        billImagesByVendor[vendorName] = [billImage];
      } else {
        billImagesByVendor[vendorName].push(billImage);
      }
    });

    return billImagesByVendor;
  } catch (error) {
    console.error(
      "Error fetching yesterday's billImages and vendorNames:",
      error
    );
    throw error;
  }
}
async function getBillImagesForTodays(restaurantId) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const invoices = await VendorInvoice.find({
      restaurant: restaurantId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    // Group billImages by vendorName
    const billImagesByVendor = {};
    invoices.forEach((invoice) => {
      const { vendorName, billImage } = invoice;
      if (!billImagesByVendor[vendorName]) {
        billImagesByVendor[vendorName] = [billImage];
      } else {
        billImagesByVendor[vendorName].push(billImage);
      }
    });

    return billImagesByVendor;
  } catch (error) {
    console.error(
      "Error fetching yesterday's billImages and vendorNames:",
      error
    );
    throw error;
  }
}

async function getBillImagesForLastWeek(restaurantId) {
  // Get the current date
  const currentDate = new Date();

  // Calculate the start and end of the last week (Monday to Saturday)
  const endOfLastWeek = new Date(currentDate);
  endOfLastWeek.setDate(
    endOfLastWeek.getDate() - ((endOfLastWeek.getDay() + 6) % 7)
  );
  endOfLastWeek.setHours(23, 59, 59, 999);

  const startOfLastWeek = new Date(endOfLastWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 6);
  startOfLastWeek.setHours(0, 0, 0, 0);

  try {
    // Query the database for VendorInvoices created in the last week for the given restaurantId
    const invoices = await VendorInvoice.find({
      restaurant: restaurantId,
      createdAt: { $gte: startOfLastWeek, $lte: endOfLastWeek },
    });

    // Extract and return the billImages and vendorNames
    // const billImagesAndVendorNames = invoices.map((invoice) => ({
    //   vendorName: invoice.vendorName,
    //   billImage: invoice.billImage,
    // }));

    const billImagesByVendor = {};
    invoices.forEach((invoice) => {
      const { vendorName, billImage } = invoice;
      if (!billImagesByVendor[vendorName]) {
        billImagesByVendor[vendorName] = [billImage];
      } else {
        billImagesByVendor[vendorName].push(billImage);
      }
    });

    return billImagesByVendor;
  } catch (error) {
    console.error("Error fetching billImages for the last week:", error);
    throw error;
  }
}

async function getBillImagesForLastMonth(restaurantId) {
  // Get the current date
  const currentDate = new Date();

  // Calculate the start and end of the last month
  const endOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0,
    23,
    59,
    59,
    999
  );
  const startOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
    0,
    0,
    0,
    0
  );

  try {
    // Query the database for VendorInvoices created in the last month for the given restaurantId
    const invoices = await VendorInvoice.find({
      restaurant: restaurantId,
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    // Extract and return the billImages and vendorNames
    const billImagesByVendor = {};
    invoices.forEach((invoice) => {
      const { vendorName, billImage } = invoice;
      if (!billImagesByVendor[vendorName]) {
        billImagesByVendor[vendorName] = [billImage];
      } else {
        billImagesByVendor[vendorName].push(billImage);
      }
    });

    return billImagesByVendor;
  } catch (error) {
    console.error("Error fetching billImages for the last month:", error);
    throw error;
  }
}

async function getBillImagesForLastYear(restaurantId) {
  // Get the current date
  const currentDate = new Date();

  // Calculate the start and end of the last year
  const endOfLastYear = new Date(
    currentDate.getFullYear() - 1,
    11,
    31,
    23,
    59,
    59,
    999
  );
  const startOfLastYear = new Date(
    currentDate.getFullYear() - 1,
    0,
    1,
    0,
    0,
    0,
    0
  );

  try {
    // Query the database for VendorInvoices created in the last year for the given restaurantId
    const invoices = await VendorInvoice.find({
      restaurant: restaurantId,
      createdAt: { $gte: startOfLastYear, $lte: endOfLastYear },
    });

    // Extract and return the billImages and vendorNames
    const billImagesByVendor = {};
    invoices.forEach((invoice) => {
      const { vendorName, billImage } = invoice;
      if (!billImagesByVendor[vendorName]) {
        billImagesByVendor[vendorName] = [billImage];
      } else {
        billImagesByVendor[vendorName].push(billImage);
      }
    });

    return billImagesByVendor;
  } catch (error) {
    console.error("Error fetching billImages for the last year:", error);
    throw error;
  }
}

const convertObjectToArray = (obj) => {
  return Object.entries(obj).map(([vendor, imageUrls]) => ({
    vendor,
    imageUrls,
  }));
};

exports.vendorDashboard = async (req, res) => {
  try {
    const restaurantId = req.restaurant;
    if (restaurantId) {
      const todays = await getBillImagesForTodays(restaurantId);

      const yesterday = await getBillImagesForYesterday(restaurantId);

      const lastweek = await getBillImagesForLastWeek(restaurantId);

      const lastmonth = await getBillImagesForLastMonth(restaurantId);

      const lastYear = await getBillImagesForLastYear(restaurantId);

      const todaysArray = convertObjectToArray(todays);
      const yesterdayArray = convertObjectToArray(yesterday);
      const lastweekArray = convertObjectToArray(lastweek);
      const lastmontharray = convertObjectToArray(lastmonth);
      const lastYeararray = convertObjectToArray(lastYear);

      res.status(200).json({
        success: true,
        message: "Successfully fetched",
        todaysArray,
        yesterdayArray,
        lastweekArray,
        lastYeararray,
        lastmontharray,
      });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.StockDashboard = async (req, res) => {
  try {
    // Extract restaurant ID from request
    const restaurantId = req.restaurant;

    // Find stocks associated with the restaurant
    const stocks = await Stock.find({ restaurant: restaurantId });

    // Send successful response with fetched stocks
    return res.status(200).json({ success: true, message: "Successfully fetched", stocks });
  } catch (err) {
    // Log any errors that occur during the process
    console.log(err);

    // Send internal server error response in case of error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.deleteEmploymentData = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (restaurant) {
      const { employId } = req.body;
      await Employees.findOneAndDelete({
        _id: employId,
        restaurantId: restaurant,
      });
      res
        .status(200)
        .json({ success: true, message: "Employment data deleted!" });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.vendorDateFilter = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    if (restaurant) {
      const { start, end } = req.body;

      const filteredData = await Ingredients.aggregate([
        {
          $match: {
            restaurant: restaurant,
            date: { $gte: new Date(start), $lte: new Date(end) },
          },
        },
        {
          $group: {
            _id: "$ingredient",
            totalQuantity: { $sum: "$quantity" },
          },
        },
      ]);

      return res.json({ success: true, data: filteredData });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.menuManagement = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const Total = await Menu.aggregate([
        { $match: { restaurant: isRestaurant } },
        {
          $group: {
            _id: "$ingredient",
            totalQuantity: { $sum: "$quantity" },
          },
        },
      ]);

      res.status(200).json({
        Total: Total,
        Today: Today,
        LastWeek: LastWeek,
        LastMonth: LastMonth,
        LastYear: LastYear,
        success: true,
      });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getToEditEmploymentDetails = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (restaurant) {
      const employId = req.params.employId;
      const EmploymentData = await Employees.findOne({
        _id: employId,
        restaurant: restaurant,
      });
      if (EmploymentData) {
        res.json({ success: true, EmploymentData });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Employment not found" });
      }
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateEmploymentDetails = async (req, res) => {
  try {
    const employId = req.params.employId;
    // console.clear()
    console.log(req.files, "filesss", employId);
    console.log(req.body, "bodyy");
    const {
      employ,
      dob,
      currentAddress,
      email,
      permanentAddress,
      phone,
      gender,
      maritalStatus,
      aadharNumber,
      pancardNumber,
      pfNumber,
      uanNumber,
      emergencyContactName,
      emergencyContactAddress,
      emergencyContactNumber,
      emergencyContactPersonRelation,
      esiNumber,
      bloodGroup,
    } = req.body;
    const restaurant = req.restaurant;

    if (restaurant) {

      const employee = await Employees.findOne({ _id: employId });

      let aadharImages = []
      let pancard
      let relativeImagePathpancard

      if (req.files && Object.keys(req.files).length > 0) {
        console.log(req.files);
        const aadharImage = req.files["aadharImage"] ? req.files["aadharImage"] : false;

        const pancardImage = req.files["pancardImage"][0] ? req.files["pancardImage"][0] : false



        if (aadharImage) {



          for (const file of aadharImage) {
            // const imageURL = await S3uploadFile(file.originalname, file.buffer);

            const dirPath = path.join('uploads', 'employee', 'aadharImages');
            const fileName = `${restaurant}/${file.filename}`;
            const imagePath = path.join(dirPath, fileName);
            // const imagePath = `employee/aadharImages/${restaurant}/${file.filename}`

            await helpers.uploadFileLocally(file, imagePath);

            helpers.deleteFileLocally(file.path);

            const imageURL = helpers.getFileUrlLocally(imagePath);
            console.log(imageURL);
            const relativeImagePath = `/${imagePath.replace(/\\/g, '/')}`;
            // Store the URL in the array
            aadharImages.push(relativeImagePath);

          }


          if (employee.aadhar_image && employee.aadhar_image.length > 0) {

            for (const imageURL of employee.aadhar_image) {

              await helpers.deleteFileLocally(imageURL);

            }

          }

        }


        if (pancardImage) {

          const dirPath = path.join('uploads', 'employee', 'pancardImages');
          const fileName = `${restaurant}/${pancardImage.filename}`;
          const pancardImagePath = path.join(dirPath, fileName);
          // const pancardImagePath = `employee/pancardImages/${restaurant}/${pancardImage.filename}`;

          await helpers.uploadFileLocally(pancardImage, pancardImagePath);

          pancard = helpers.getFileUrlLocally(pancardImagePath);
          relativeImagePathpancard = `/${pancardImagePath.replace(/\\/g, '/')}`;
          helpers.deleteFileLocally(pancardImage.path);

          const oldPanPicURL = employee.pancard_image;

          await helpers.deleteFileLocally(oldPanPicURL);




        }


      }

      // const updatedData = {
      //   staff: employ,
      //   current_address: currentAddress,
      //   email: email,
      //   gender: gender,
      //   aadhar_number: aadharNumber,
      //   pan_number: pancardNumber,
      //   pf_number: pfNumber,
      //   uan_number: uanNumber,
      //   phone: phone,
      //   emergency_contact_person_name: emergencyContactName,
      //   emergency_contact_person_address: emergencyContactAddress,
      //   permanent_address: permanentAddress,
      //   dob: dob,
      //   marital_status: maritalStatus,
      //   aadhar_image: aadharImages,
      //   pancard_image: pancard,
      //   esi_number: esiNumber,
      //   blood_group: bloodGroup,
      //   emergency_contact_person_number: emergencyContactNumber,
      //   emergency_contact_person_relation: emergencyContactPersonRelation,
      //   status: true,
      // };


      // console.log(updatedData, "updatedData");


      const updatedData = {
        staff: employ,
        current_address: currentAddress,
        email: email,
        gender: gender,
        aadhar_number: aadharNumber,
        pan_number: pancardNumber,
        pf_number: pfNumber,
        uan_number: uanNumber,
        phone: phone,
        emergency_contact_person_name: emergencyContactName,
        emergency_contact_person_address: emergencyContactAddress,
        permanent_address: permanentAddress,
        dob: dob,
        marital_status: maritalStatus,
        aadhar_image: aadharImages,
        pancard_image: relativeImagePathpancard,
        esi_number: esiNumber,
        blood_group: bloodGroup,
        emergency_contact_person_number: emergencyContactNumber,
        emergency_contact_person_relation: emergencyContactPersonRelation,
        status: true,
      };

      // Remove properties with undefined, null, empty strings, or empty arrays
      Object.entries(updatedData).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          delete updatedData[key];
        }
      });

      const updatedEmployment = await Employees.findOneAndUpdate(
        { _id: employId, restaurant: restaurant },
        { $set: updatedData }
      );

      if (!updatedEmployment) {
        return res
          .status(404)
          .json({ success: false, message: "Employment not found" });
      }

      res.json({
        success: true,
        message: `${employ}'s data successfully updated`,
        // employment: updatedEmployment,
      });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateEmploymentData = async (req, res) => {
  try {
    const employId = req.params.employId;
    const { employ, joinDate, employeeType, email, designation } = req.body;
    const restaurant = req.restaurant;
    console.log("gere");

    if (restaurant) {
      const updatedEmployment = await Employees.findOneAndUpdate(
        { _id: employId },
        {
          $set: {
            email: email,
            joinDate: joinDate,
            employeeType: employeeType,
            designation: designation,
            staff: employ,
          },
        },
        { new: true }
      );

      if (!updatedEmployment) {
        return res
          .status(404)
          .json({ success: false, message: "Employment not found" });
      }

      res.json({
        success: true,
        message: `${employ}'s data successfully updated`,
        employment: updatedEmployment,
      });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.sendFeedback = async (req, res) => {
  try {
    console.log(req.body, "feedback");

    const isRestaurant = req.restaurant;
    const { name, email, phoneNumber, message } = req.body;
    if (isRestaurant) {
      const newFeedback = new feedback_model({
        name,
        email,
        phoneNumber,
        message,
      });
      // await newFeedback.save();
      res.json({ success: true, message: "Data saved successfully!" });
    } else {
      res.status(200).json({
        success: false,
        message: "Your session expired, Please login!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
