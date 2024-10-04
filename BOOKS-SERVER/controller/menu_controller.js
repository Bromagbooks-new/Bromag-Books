const MenuCategory = require("../model/menuCategory_model");
const Menu = require("../model/menu_model");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const helpers = require("../utils/helpers");
const util = require("util");
const zomato_menu_Items_model = require("../model/zomato_menu_Items_model");
const aggregator_model = require("../model/aggregator_model");
const swiggy_menu_item_model = require("../model/swiggy_menu_item_model");
const others_menu_item_model = require("../model/others_menu_item_model");
const bromag_menu_items = require("../model/bromag_menu_items");
const Cuisine = require("../model/cuisine_model"); // Replace with the correct path to your model
const restaurant_menu_model = require("../model/restaurant_menu_model");

const MenuItem = require('../model/menu_item_model'); // Replace with the correct path to your model

const mongoose = require("mongoose");
const path = require("path");

exports.addAggregator = async (req, res) => {
  try {
    const restraunt = req.restaurant;

    const { name, description, id } = req.body;

    const existingAggregator = await aggregator_model.findOne({
      restrauntId: restraunt,
      name,
    });

    if (existingAggregator) {
      console.log("HERE");
      return res.status(200).json({
        status: "AGGREGATOR_ALLREADY_EXISTS",
        message: "Aggregator already exists",
      });
    }

    const aggreagtor = new aggregator_model({
      name,
      description,
      id,
      restrauntId: restraunt,
    });

    await aggreagtor.save();

    return res.status(201).json({
      status: "AGGREGATOR_CREATED",
      message: "Aggregator Created",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", status: "FAILED" });
  }
};

exports.getAllAggregators = async (req, res) => {
  try {
    const restraunt = req.restaurant;

    const aggregators = await aggregator_model.find({ restrauntId: restraunt });

    return res.status(200).json({
      status: "SUCCESS",
      aggregators,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "FAILED",
    });
  }
};

exports.addCuisine = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    const { name, subCusines, description } = req.body;

    const existingCusine = await Cuisine.findOne({
      name,
      restaurantId: restaurant,
    });

    console.log(existingCusine);

    if (existingCusine) {
      return res.status(200).json({
        status: "CUISINE_EXISTS",
        message: "Cuisine already exists",
      });
    }

    // Create a new Cuisine document
    const newCuisine = new Cuisine({
      name,
      subCuisines: subCusines,
      description,
      restaurantId: restaurant,
    });

    // Save the cuisine to the database
    await newCuisine.save();

    return res.status(201).json({
      status: "CUISINE_CREATED",
      message: "Cuisine Created Successfully",
      data: newCuisine,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "FAILED",
    });
  }
};

exports.getAllCuisines = async (req, res) => {
  try {

    const restaurant = req.restaurant;
    console.log(restaurant);

    // Fetch all cuisines from the database
    const cuisines = await Cuisine.find({
      restaurantId: restaurant
    });

    // console.log(cuisines);

    return res.status(200).json({
      status: "SUCCESS",
      cuisines
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "FAILED"
    });
  }
};

exports.addMenuItem = async (req, res) => {
  try {

    const restaurant = req.restaurant;

    const { data } = req.body;

    const {
      name,
      cusine: cuisine,
      subCusine: subCuisine,
      itemType,
      quantity,
      aggregators,
      description,
      image
    } = JSON.parse(data);

    console.log(data);

    // Check if a menu item with the same name already exists
    const existingMenuItem = await MenuItem.findOne({ name, restaurantId: restaurant });

    if (existingMenuItem) {
      return res.status(200).json({
        status: "MENU_ITEM_EXISTS",
        message: "Menu Item with this name already exists",
      });
    }

    const file = req.file;
    const dirPath = path.join("uploads", "menu", "itemImages");
    const fileName = `${restaurant}/${file.filename}`;
    const imagePath = path.join(dirPath, fileName);
    // const imagePath = `menu/itemImages/${isRestaurant}/${file.filename}`;

    await helpers.uploadFileLocally(file, imagePath);

    helpers.getFileUrlLocally(imagePath);
    const relativeImagePath = `/${imagePath.replace(/\\/g, "/")}`;

    helpers.deleteFileLocally(file.path);

    // Create a new MenuItem document
    const newMenuItem = new MenuItem({
      name,
      cuisine,
      subCuisine,
      itemType,
      quantity,
      aggregators,
      description,
      image: relativeImagePath,
      restaruntId: restaurant
    });

    // Save the menu item to the database
    await newMenuItem.save();

    return res.status(201).json({
      status: "MENU_ITEM_CREATED",
      message: "Menu Item Created Successfully",
      data: newMenuItem
    });
  } catch (error) {
    console.error("Failed to create menu item", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "FAILED"
    });
  }
};

exports.getAllMenuItems = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    // Fetch all menu items from the database
    const menuItems = await MenuItem.find({ restaruntId: restaurant });

    return res.status(200).json({
      status: "SUCCESS",
      data: menuItems
    });
  } catch (error) {
    console.error("Failed to fetch menu items", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "FAILED"
    });
  }
};

exports.addMenuCategory = async (req, res) => {
  try {
    console.log(req.body);

    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const { description, category, subcuisine } = req.body;

      let subcuisineArray = [];

      subcuisine.map((item) => {
        subcuisineArray.push(item.subCuisine);
      });

      // const wait = true;
      // console.log(req.body);
      // if (wait) {
      //   const isRestaurant = req.restaurant;
      //   if (isRestaurant) {
      //     const { description, category, subCategory } = req.body;
      const isExist = await MenuCategory.findOne({
        category: category,
        restaurant: isRestaurant,
      });
      if (!isExist) {
        const newCategoryData = new MenuCategory({
          category: category,
          description: description,
          restaurant: isRestaurant,
          subcategory: subcuisineArray,
          // subcategory: subCategory,
        });
        await newCategoryData.save();
        res.status(200).json({
          success: true,
          message: `${category} cuisine is added!`,
        });
      } else {
        res.json({
          success: false,
          message: "This cuisine is already exist!",
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
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.getMenuCategory = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const categories = await MenuCategory.find({ restaurant: isRestaurant });
      res.status(200).json({ success: true, Categories: categories });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMenuCategory = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (restaurant) {
      const { categoryId } = req.body;
      const category = await MenuCategory.findOne({ _id: categoryId });

      // if (response.itemImage) {
      //   const localFilePath = response.itemImage.replace('/uploads/', '');
      //   await helpers.deleteFileLocally(localFilePath);
      // }

      const activeMenuItemExists = await restaurant_menu_model.exists({
        restaurant: restaurant,
        category: category.category,
        isShared: true,
      });

      console.log(activeMenuItemExists);

      if (activeMenuItemExists) {
        console.log("Active menu exists", activeMenuItemExists);
        res.json({
          success: false,
          status: "ACTIVE_MENU_EXISITS",
          message: "Active menu items exists for this cusine.",
        });
        return;
      }

      const foundedCategory = await MenuCategory.findOneAndDelete({
        _id: categoryId,
        restaurant: restaurant,
      });

      foundedMenu = await restaurant_menu_model.deleteMany({
        restaurant: restaurant,
        category: category.category,
      });
      await swiggy_menu_item_model.deleteMany({
        restaurant: restaurant,
        category: category.category,
      });
      await swiggy_menu_item_model.deleteMany({
        restaurant: restaurant,
        category: category.category,
      });
      await bromag_menu_items.deleteMany({
        restaurant: restaurant,
        category: category.category,
      });
      await others_menu_item_model.deleteMany({
        restaurant: restaurant,
        category: category.category,
      });
      await zomato_menu_Items_model.deleteMany({
        restaurant: restaurant,
        category: category.category,
      });

      res.status(200).json({
        success: true,
        message: `${foundedCategory.category} category is deleted!`,
      });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getToEditMenuCategory = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    console.log("Called", restaurant);
    if (restaurant) {
      const categoryId = req.params.categoryId;
      const category = await MenuCategory.findOne({
        _id: categoryId,
        restaurant: restaurant,
      });

      if (category) {
        res.json({ success: true, category });
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

exports.updateMenuCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    console.log(req.body, "i am body");

    const { Description, CuisineName, subcuisine } = req.body;
    const newArray = Array.isArray(subcuisine)
      ? subcuisine.map(({ subCuisine }) => subCuisine)
      : [];
    console.log(newArray, "newArray");

    const newData = {
      category: CuisineName,
      description: Description,
      subcategory: newArray,
      // ... other fields you want to update
    };

    const updatedMenuCategory = await MenuCategory.findByIdAndUpdate(
      categoryId,
      { $set: newData }, // Use $set to update specific fields without overwriting the entire document
      { new: true } // Return the updated document
    );

    // if (!updatedCategory) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Category not found" });
    // }
    if (updatedMenuCategory) {
      return res.json({
        success: true,
        message: `${CuisineName} category updated successfully`,
        category: updatedMenuCategory,
      });
    } else {
      return res.json({
        success: false,
        message: `Failed to Update`,
        // category: updatedMenuCategory,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMenuData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    if (isRestaurant) {
      const categories = await MenuCategory.find({ restaurant: isRestaurant });

      // const menuData = await Menu.find({ restaurant: isRestaurant });

      const zomatoMenu = await zomato_menu_Items_model.find({
        restaurant: isRestaurant,
      });

      const swiggyMenu = await swiggy_menu_item_model.find({
        restaurant: isRestaurant,
      });

      const othersMenu = await others_menu_item_model.find({
        restaurant: isRestaurant,
      });

      const bromagMenu = await bromag_menu_items.find({
        restaurant: isRestaurant,
      });

      const restaurantMenu = await restaurant_menu_model.find({
        restaurant: isRestaurant,
      });

      res.status(200).json({
        success: true,
        Categories: categories,
        bromagMenu,
        zomatoMenu,
        swiggyMenu,
        othersMenu,
        restaurantMenu,
      });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
  }
};

function calculateDiscountPercentage(exactPrice, offerPrice) {
  const actualPrice = parseFloat(exactPrice);
  const discountPrice = parseFloat(offerPrice);

  if (!isNaN(actualPrice) && !isNaN(discountPrice) && actualPrice !== 0) {
    const discountPercentage = Math.floor(
      ((actualPrice - discountPrice) / actualPrice) * 100
    );
    return discountPercentage;
  } else {
    return "Invalid data";
  }
}

exports.addMenuData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(req.body, "i am body");
    if (isRestaurant) {
      const {
        Cuisine,
        subCuisine,
        Item,
        description,
        itemType,
        Zomato,
        Swiggy,
        Others,
        restaurant,
        Bromag,
        Quantity,
      } = req.body;

      const file = req.file;
      console.log(Item);

      const foundItem = await restaurant_menu_model.find({
        restaurant: isRestaurant,
        item: Item,
      });
      console.log("Found ITEMSSS.....................................");
      console.log(foundItem);

      if (foundItem.length > 0) {
        res.json({
          success: false,
          message: `Item already in the menu!`,
          status: "ITEM_EXISTS",
        });
        return;
      }

      const convertedQuantity = parseInt(Quantity, 10);

      console.log(file, "i am file");

      const categoryArray = Cuisine.split("-");

      const category = categoryArray[0].trim();

      const dirPath = path.join("uploads", "menu", "itemImages");
      const fileName = `${isRestaurant}/${file.filename}`;
      const imagePath = path.join(dirPath, fileName);
      // const imagePath = `menu/itemImages/${isRestaurant}/${file.filename}`;

      await helpers.uploadFileLocally(file, imagePath);

      helpers.getFileUrlLocally(imagePath);
      const relativeImagePath = `/${imagePath.replace(/\\/g, "/")}`;

      helpers.deleteFileLocally(file.path);
      const restaurantPrices = JSON.parse(restaurant);

      if (
        restaurantPrices[0].actualPrice !== "" &&
        restaurantPrices[0] !== ""
      ) {
        const restaurantActualPrice = parseInt(restaurantPrices[0].actualPrice);
        const restaurantDiscountPrice = parseInt(
          restaurantPrices[0].discountPrice
        );

        const restaurantOfferpercentage = calculateDiscountPercentage(
          restaurantActualPrice,
          restaurantDiscountPrice
        );

        const newRestaurantDiscountPriceMenuData = new restaurant_menu_model({
          item: Item,
          itemType: itemType,
          category: category,
          subCategory: subCuisine,
          itemImage: relativeImagePath,
          actualPrice: restaurantActualPrice,
          discountPrice: restaurantDiscountPrice,
          discountPercentage: restaurantOfferpercentage,
          description: description,
          restaurant: isRestaurant,
          quantity: convertedQuantity,
          isShared: false,
        });

        await newRestaurantDiscountPriceMenuData.save();
      }

      const zomatoPrices = JSON.parse(Zomato);
      if (zomatoPrices[0].actualPrice !== "" && zomatoPrices[0] !== "") {
        const zomatoActualPrice = parseInt(zomatoPrices[0].actualPrice);
        const zomatoDiscountPrice = parseInt(zomatoPrices[0].discountPrice);

        const ZomatoOfferpercentage = calculateDiscountPercentage(
          zomatoActualPrice,
          zomatoDiscountPrice
        );

        const newZomatoMenuData = new zomato_menu_Items_model({
          item: Item,
          itemType: itemType,
          category: category,
          subCategory: subCuisine,
          itemImage: relativeImagePath,
          actualPrice: zomatoActualPrice,
          discountPrice: zomatoDiscountPrice,
          discountPercentage: ZomatoOfferpercentage,
          description: description,
          restaurant: isRestaurant,
          quantity: convertedQuantity,
          isShared: false,
        });

        await newZomatoMenuData.save();
      }

      const swiggyPrices = JSON.parse(Swiggy);
      console.log(Swiggy, "Swiggy");

      if (swiggyPrices[0] !== "" && swiggyPrices[0].actualPrice !== "") {
        const swiggyActualPrice = parseInt(swiggyPrices[0].actualPrice);
        const swiggyDiscountPrice = parseInt(swiggyPrices[0].discountPrice);
        const swiggyOfferpercentage = calculateDiscountPercentage(
          swiggyActualPrice,
          swiggyDiscountPrice
        );

        const newSwiggyMenuData = new swiggy_menu_item_model({
          item: Item,
          itemType: itemType,
          category: category,
          subCategory: subCuisine,
          itemImage: relativeImagePath,
          actualPrice: swiggyActualPrice,
          discountPrice: swiggyDiscountPrice,
          discountPercentage: swiggyOfferpercentage,
          description: description,
          restaurant: isRestaurant,
          quantity: convertedQuantity,
          isShared: false,
        });

        await newSwiggyMenuData.save();
      }

      const othersPrices = JSON.parse(Others);
      if (othersPrices[0] !== "" && othersPrices[0].actualPrice !== "") {
        console.log(othersPrices, "othersPrices");
        const othersActualPrice = parseInt(othersPrices[0].actualPrice);
        const othersDiscountPrice = parseInt(othersPrices[0].discountPrice);
        const othersOfferpercentage = calculateDiscountPercentage(
          othersActualPrice,
          othersDiscountPrice
        );

        const newOthersMenuData = new others_menu_item_model({
          item: Item,
          itemType: itemType,
          category: category,
          subCategory: subCuisine,
          itemImage: relativeImagePath,
          actualPrice: othersActualPrice,
          discountPrice: othersDiscountPrice,
          discountPercentage: othersOfferpercentage,
          description: description,
          restaurant: isRestaurant,
          quantity: convertedQuantity,
          isShared: false,
        });
        await newOthersMenuData.save();
      }

      const bromagPrices = JSON.parse(Bromag);

      if (bromagPrices[0] !== "" && bromagPrices[0].actualPrice !== "") {
        const bromagActualPrice = parseInt(bromagPrices[0].actualPrice);
        const bromagDiscountPrice = parseInt(bromagPrices[0].discountPrice);

        const bromagOfferpercentage = calculateDiscountPercentage(
          bromagActualPrice,
          bromagDiscountPrice
        );

        const newbromagMenuData = new bromag_menu_items({
          item: Item,
          itemType: itemType,
          category: category,
          subCategory: subCuisine,
          itemImage: relativeImagePath,
          actualPrice: bromagActualPrice,
          discountPrice: bromagDiscountPrice,
          discountPercentage: bromagOfferpercentage,
          description: description,
          quantity: convertedQuantity,
          restaurant: isRestaurant,
          isShared: false,
        });

        await newbromagMenuData.save();
      }

      res
        .status(200)
        .json({ success: true, message: `${Item} added to the menu!` });
    } else {
      res.status(200).json({ success: false, message: "Session expired" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateOnlineAggregatorPrices = async (req, res) => {
  try {
    const { plateform, itemId, actualPrice, discountPrice } = req.body.data;

    const discountPercentage = await calculateDiscountPercentage(
      actualPrice,
      discountPrice
    );
    console.log(discountPercentage, "disCountPercentage");
    const updateDataOnlineAggregators = {
      $set: {
        actualPrice,
        discountPrice,
        discountPercentage: discountPercentage,
      },
    };

    if (plateform == "Zomato") {
      const updatedDocument = await zomato_menu_Items_model.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(itemId) },
        updateDataOnlineAggregators,
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Updated SuccessFully" });
    }
    if (plateform == "Bromag") {
      const updatedDocument = await bromag_menu_items.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(itemId) },
        updateDataOnlineAggregators,
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Updated SuccessFully" });
    }
    if (plateform == "Swiggy") {
      const updatedDocument = await swiggy_menu_item_model.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(itemId) },
        updateDataOnlineAggregators,
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Updated SuccessFully" });
    }
    if (plateform == "Others") {
      const updatedDocument = await others_menu_item_model.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(itemId) },
        updateDataOnlineAggregators,
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Updated SuccessFully" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });

    console.log(err);
  }
};

exports.updateMenuData = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    console.log(req.body, "i am updated body");
    if (isRestaurant) {
      const {
        Cuisine,
        subCuisine,
        Item,
        description,
        itemType,
        actualPrice,
        discountPrice,
        plateform,
        itemId,
        Quantity,
      } = req.body;

      if (itemId) {
        const previousMenuItem = await restaurant_menu_model.findById(
          new mongoose.Types.ObjectId(itemId)
        );
        console.log(previousMenuItem, "i am previous itemm");

        const parts = Cuisine.split("-");

        // Extract the name part and remove leading/trailing whitespace
        const category = parts[0].trim();

        if (previousMenuItem) {
          let itemImage;
          let relativeImagePath;
          if (req.file) {
            const file = req.file;
            await helpers.deleteFileLocally(previousMenuItem.itemImage);
            const dirPath = path.join("uploads", "menu", "itemImages");
            const fileName = `${isRestaurant}/${file.filename}`;
            const imagePath = path.join(dirPath, fileName);
            // const imagePath = `menu/itemImages/${isRestaurant}/${file.filename}`;

            await helpers.uploadFileLocally(file, imagePath);

            helpers.getFileUrlLocally(imagePath);
            relativeImagePath = `/${imagePath.replace(/\\/g, "/")}`;
            helpers.deleteFileLocally(file.path);
          }

          const updateDataOnlineAggregators = {
            $set: {
              category,
              subCategory: subCuisine,
              item: Item,
              description,
              itemType,
              quantity: Quantity,
              itemImage: relativeImagePath,
            },
          };

          const percentageDiscount = calculateDiscountPercentage(
            actualPrice,
            discountPrice
          );

          const updatedRestaurantMenu = {
            $set: {
              category,
              subCategory: subCuisine,
              item: Item,
              description,
              itemType,
              quantity: Quantity,
              discountPercentage: percentageDiscount,
              actualPrice: parseInt(actualPrice),
              discountPrice: parseInt(discountPrice),

              platformName: plateform,
              itemImage: relativeImagePath,
            },
          };

          await zomato_menu_Items_model.findOneAndUpdate(
            { item: previousMenuItem.item, restaurant: isRestaurant },
            updateDataOnlineAggregators,
            { new: true }
          );

          await swiggy_menu_item_model.findOneAndUpdate(
            { item: previousMenuItem.item, restaurant: isRestaurant },
            updateDataOnlineAggregators,
            { new: true }
          );
          await bromag_menu_items.findOneAndUpdate(
            { item: previousMenuItem.item, restaurant: isRestaurant },
            updateDataOnlineAggregators,
            { new: true }
          );
          await others_menu_item_model.findOneAndUpdate(
            { item: previousMenuItem.item, restaurant: isRestaurant },
            updateDataOnlineAggregators,
            { new: true }
          );

          await restaurant_menu_model.findOneAndUpdate(
            { item: previousMenuItem.item, restaurant: isRestaurant },
            updatedRestaurantMenu,
            { new: true }
          );

          return res
            .status(200)
            .json({ success: true, message: "Menu Item Updated" });
        } else {
          return res
            .status(200)
            .json({ success: false, message: "The menu Item didn't exist" });
        }
      } else {
        return res
          .status(200)
          .json({ success: false, message: "ItemId Not Found" });
      }

      // if (plateform === "Restaurant") {
      //   let updatedData = await restaurant_menu_model.findByIdAndUpdate(
      //     itemId,
      //     updateData,
      //     { new: true }
      //   );

      //   return res
      //     .status(200)
      //     .json({ success: true, message: "SuccessFully Updated" });
      // }
      // if (plateform === "Zomato") {
      //   let updatedData = await zomato_menu_Items_model.findByIdAndUpdate(
      //     itemId,
      //     updateData,
      //     { new: true }
      //   );

      //   return res
      //     .status(200)
      //     .json({ success: true, message: "SuccessFully Updated" });
      // }
      // if (plateform === "Others") {
      //   let updatedData = await others_menu_item_model.findByIdAndUpdate(
      //     itemId,
      //     updateData,
      //     { new: true }
      //   );

      //   return res
      //     .status(200)
      //     .json({ success: true, message: "SuccessFully Updated" });
      // }
      // if (plateform === "Bromag") {
      //   let updatedData = await bromag_menu_items.findByIdAndUpdate(
      //     itemId,
      //     updateData,
      //     { new: true }
      //   );
      //   return res
      //     .status(200)
      //     .json({ success: true, message: "SuccessFully Updated" });
      // }
      // if (plateform === "Swiggy") {
      //   let updatedData = await swiggy_menu_item_model.findByIdAndUpdate(
      //     itemId,
      //     updateData,
      //     { new: true }
      //   );
      //   return res
      //     .status(200)
      //     .json({ success: true, message: "SuccessFully Updated" });
      // }
    }
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateMenuActive = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;

    if (isRestaurant) {
      const { itemId } = req.params;
      const { isShared, plateform } = req.body;
      console.log(plateform, "itsss");
      console.log(itemId, isShared, "helooooooooboy");

      let updatedMenu;

      if (plateform == "Restaurant") {
        updatedMenu = await restaurant_menu_model.findByIdAndUpdate(
          itemId,
          {
            $set: {
              restaurant: isRestaurant,
              isShared: isShared,
              publish: false,
            },
          },
          { new: true }
        );
      }

      if (plateform == "Bromag") {
        updatedMenu = await bromag_menu_items.findByIdAndUpdate(
          itemId,
          {
            $set: {
              restaurant: isRestaurant,
              isShared: isShared,
              publish: false,
            },
          },
          { new: true }
        );
      }

      if (plateform == "Zomato") {
        updatedMenu = await zomato_menu_Items_model.findByIdAndUpdate(
          itemId,
          {
            $set: {
              restaurant: isRestaurant,
              isShared: isShared,
              publish: false,
            },
          },
          { new: true }
        );
      }

      if (plateform == "Swiggy") {
        updatedMenu = await swiggy_menu_item_model.findByIdAndUpdate(
          itemId,
          {
            $set: {
              restaurant: isRestaurant,
              isShared: isShared,
              publish: false,
            },
          },
          { new: true }
        );
      }
      if (plateform == "Others") {
        updatedMenu = await others_menu_item_model.findByIdAndUpdate(
          itemId,
          {
            $set: {
              restaurant: isRestaurant,
              isShared: isShared,
              publish: false,
            },
          },
          { new: true }
        );
      }

      if (!updatedMenu) {
        return res
          .status(404)
          .json({ success: false, message: "Menu not found" });
      }

      res.json({ success: true, updatedMenu });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.menuSharingUpdates = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      // const { category } = req.body;
      const { categoryName, plateform } = req.body;

      console.log(categoryName, plateform, "heyyy");

      let updatedMenu;
      if (plateform === "Zomato") {
        const existingMenu = await zomato_menu_Items_model.findOne({
          category: categoryName,
          restaurant: isRestaurant,
        });

        updatedMenu = await zomato_menu_Items_model.updateMany(
          {
            category: categoryName,
            platformName: plateform,
            restaurant: isRestaurant,
          },
          {
            $set: {
              menuShared: !existingMenu.menuShared,
              publish: false,
            },
          },
          { multi: true }
        );
      }

      if (plateform === "Others") {
        const existingMenu = await others_menu_item_model.findOne({
          category: categoryName,
          restaurant: isRestaurant,
        });
        console.log(
          existingMenu,
          categoryName,
          plateform,
          isRestaurant,
          "deaomo"
        );

        updatedMenu = await others_menu_item_model.updateMany(
          {
            category: categoryName,
            platformName: plateform,
            restaurant: isRestaurant,
          },
          {
            $set: {
              menuShared: !existingMenu.menuShared,
              publish: false,
            },
          },
          { multi: true }
        );
      }

      if (plateform === "Bromag") {
        const existingMenu = await bromag_menu_items.findOne({
          category: categoryName,
          restaurant: isRestaurant,
        });
        console.log(
          existingMenu,
          categoryName,
          plateform,
          isRestaurant,
          "deaomo"
        );

        updatedMenu = await bromag_menu_items.updateMany(
          {
            category: categoryName,
            platformName: plateform,
            restaurant: isRestaurant,
          },
          {
            $set: {
              menuShared: !existingMenu.menuShared,
              publish: false,
            },
          },
          { multi: true }
        );
      }
      if (plateform === "Swiggy") {
        const existingMenu = await swiggy_menu_item_model.findOne({
          category: categoryName,
          restaurant: isRestaurant,
        });
        console.log(
          existingMenu,
          categoryName,
          plateform,
          isRestaurant,
          "deaomo"
        );

        updatedMenu = await swiggy_menu_item_model.updateMany(
          {
            category: categoryName,
            platformName: plateform,
            restaurant: isRestaurant,
          },
          {
            $set: {
              menuShared: !existingMenu.menuShared,
              publish: false,
            },
          },
          { multi: true }
        );
      }

      // if (!existingMenu) {
      //   return res.json({ success: false, message: "Menu not found" });
      // }

      // const updatedMenu = await Menu.updateMany(
      //   { category },
      //   {
      //     $set: {
      //       restaurant: isRestaurant,
      //       menuShared: !existingMenu.menuShared,
      //     },
      //   },
      //   { new: true }
      // );

      if (!updatedMenu) {
        return res
          .status(404)
          .json({ success: false, message: "Menu not found" });
      }

      res.json({
        success: true,
        message: `${categoryName} category updated!`,
        updatedMenu,
      });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.publishMenu = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const filter = {
        isShared: true,
        menuShared: true,
        quantity: { $gt: 0 },
        restaurant: isRestaurant,
      };

      const update = {
        publish: true,
      };

      const options = {
        multi: true, // Update multiple documents that match the filter
      };

      await zomato_menu_Items_model.updateMany(filter, update, options);
      await swiggy_menu_item_model.updateMany(filter, update, options);
      await others_menu_item_model.updateMany(filter, update, options);
      await bromag_menu_items.updateMany(filter, update, options);
      await restaurant_menu_model.updateMany(filter, update, options);

      return res.json({
        success: true,
        message: "All menu items published to menu!",
      });

      // const menuItemsToPublish = req.body;

      // if (menuItemsToPublish && Array.isArray(menuItemsToPublish)) {
      //   let allMenuItemsPublished = true; // Track if all menu items are successfully published

      //   for (const menuItem of menuItemsToPublish) {
      //     const { itemId, quantity } = menuItem;

      //     const existingMenuItem = await Menu.findOne({ _id: itemId });
      //     if (existingMenuItem) {
      //       if (existingMenuItem.quantity === quantity) {
      //         if (!existingMenuItem.publish) {
      //           // If not already published, update and set publish to true
      //           await Menu.findByIdAndUpdate(existingMenuItem._id, {
      //             $set: { publish: true },
      //           });
      //         }
      //       } else {
      //         console.log(`Quantity mismatch for menu item ${itemId}`);
      //         allMenuItemsPublished = false;
      //       }
      //     } else {
      //       console.log(`Menu item with itemId ${itemId} not found`);
      //       allMenuItemsPublished = false;
      //     }
      //   }

      //   if (allMenuItemsPublished) {
      //     res.json({
      //       success: true,
      //       message: "All menu items published to menu!",
      //     });
      //   } else {
      //     // Some menu items failed to publish
      //     res.status(400).json({
      //       success: false,
      //       message: "Some menu items failed to publish",
      //     });
      //   }
      // } else {
      //   res.status(400).json({
      //     success: false,
      //     message: "Invalid data format in the request body",
      //   });
      // }
    } else {
      res.status(200).json({ success: false, message: "Session expired" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.quantityIncrementAtMenu = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    if (isRestaurant) {
      const { quantityStatus, ItemId, count, plateform } = req.body.data;

      // if (quantityStatus === "increment") {
      //   await Menu.findByIdAndUpdate(ItemId, { $set: { quantity: count } });
      // } else {
      //   await Menu.findByIdAndUpdate(ItemId, { $set: { quantity: count } });
      // }

      if (plateform === "Zomato") {
        await zomato_menu_Items_model.findByIdAndUpdate(ItemId, {
          $set: { quantity: count },
        });
      }
      if (plateform === "Restaurant") {
        await restaurant_menu_model.findByIdAndUpdate(ItemId, {
          $set: { quantity: count },
        });
      }

      if (plateform === "Others") {
        await others_menu_item_model.findByIdAndUpdate(ItemId, {
          $set: { quantity: count },
        });
      }

      if (plateform === "Bromag") {
        await bromag_menu_items.findByIdAndUpdate(ItemId, {
          $set: { quantity: count },
        });
      }

      if (plateform === "Swiggy") {
        await swiggy_menu_item_model.findByIdAndUpdate(ItemId, {
          $set: { quantity: count },
        });
      }

      res.json({ success: true, message: `Published to menu!` });
    } else {
      res.json({ success: false, message: "Session expired" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (restaurant) {
      const { menuId, plateform } = req.body;
      // const foundedMenu = await Menu.findOneAndDelete({
      //   _id: menuId,
      //   restaurant: restaurant,
      // });

      let foundedMenu;

      if (plateform === "Restaurant") {
        foundedMenu = await restaurant_menu_model.findOneAndDelete({
          _id: menuId,
          restaurant: restaurant,
        });
        await swiggy_menu_item_model.findOneAndDelete({
          restaurant: restaurant,
          item: foundedMenu.item,
        });
        await swiggy_menu_item_model.findOneAndDelete({
          restaurant: restaurant,
          item: foundedMenu.item,
        });
        await bromag_menu_items.findOneAndDelete({
          restaurant: restaurant,
          item: foundedMenu.item,
        });
        await others_menu_item_model.findOneAndDelete({
          restaurant: restaurant,
          item: foundedMenu.item,
        });
        await zomato_menu_Items_model.findOneAndDelete({
          restaurant: restaurant,
          item: foundedMenu.item,
        });
      }
      if (plateform === "Swiggy") {
        foundedMenu = await swiggy_menu_item_model.findOneAndDelete({
          _id: menuId,
          restaurant: restaurant,
        });
      }
      if (plateform === "Bromag") {
        foundedMenu = await bromag_menu_items.findOneAndDelete({
          _id: menuId,
          restaurant: restaurant,
        });
      }
      if (plateform === "Others") {
        foundedMenu = await others_menu_item_model.findOneAndDelete({
          _id: menuId,
          restaurant: restaurant,
        });
      }
      if (plateform === "Zomato") {
        foundedMenu = await zomato_menu_Items_model.findOneAndDelete({
          _id: menuId,
          restaurant: restaurant,
        });
      }

      res.status(200).json({
        success: true,
        message: `${foundedMenu.item} is deleted from menu!`,
      });
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
      const menuByCategory = await Menu.aggregate([
        { $match: { restaurant: req.restaurant } },
        { $sort: { _id: -1 } },
        {
          $group: {
            _id: "$category",
            items: {
              $push: "$item",
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);

      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const lastYear = new Date(today);
      lastYear.setFullYear(lastYear.getFullYear() - 1);

      const Today = await Menu.aggregate([
        {
          $match: {
            restaurant: isRestaurant,
            date: { $gte: today, $lt: tomorrow },
          },
        },
        { $sort: { _id: -1 } },
        {
          $group: {
            _id: "$category",
            items: {
              $push: "$item",
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const LastWeek = await Menu.aggregate([
        {
          $match: {
            restaurant: isRestaurant,
            date: { $gte: lastWeek, $lt: today },
          },
        },
        { $sort: { _id: -1 } },
        {
          $group: {
            _id: "$category",
            items: {
              $push: "$item",
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const LastMonth = await Menu.aggregate([
        {
          $match: {
            restaurant: isRestaurant,
            date: { $gte: lastMonth, $lt: today },
          },
        },
        { $sort: { _id: -1 } },
        {
          $group: {
            _id: "$category",
            items: {
              $push: "$item",
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const LastYear = await Menu.aggregate([
        {
          $match: {
            restaurant: isRestaurant,
            date: { $gte: lastYear, $lt: today },
          },
        },
        { $sort: { _id: -1 } },
        {
          $group: {
            _id: "$category",
            items: {
              $push: "$item",
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      console.log(menuByCategory, "menuByCategory");
      console.log(Today, "Today");
      console.log(LastWeek, "LastWeek");
      console.log(LastMonth, "LastMonth");
      console.log(LastYear, "LastYear");

      res.status(200).json({
        Menu: menuByCategory,
        Today: Today,
        LastWeek: LastWeek,
        LastMonth: LastMonth,
        LastYear: LastYear,
        success: true,
      });
    } else {
      res.status(200).json({ success: false, message: "Session expired" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.menuDateFilter = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    if (restaurant) {
      const { start, end } = req.body;

      const filteredData = await Menu.aggregate([
        {
          $match: {
            restaurant: restaurant,
            date: { $gte: new Date(start), $lte: new Date(end) },
          },
        },
        { $sort: { _id: -1 } },
        {
          $group: {
            _id: "$category",
            items: {
              $push: "$item",
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      console.log(filteredData);
      return res.json({ success: true, data: filteredData });
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getToEditMenu = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    if (restaurant) {
      const menuId = req.params.Id;
      const plateform = req.query.plateform;

      let menuData;

      if (plateform === "Restaurant") {
        menuData = await restaurant_menu_model.findOne({
          restaurant: restaurant,
          _id: menuId,
        });
      }
      if (plateform === "Zomato") {
        menuData = await zomato_menu_Items_model.findOne({
          restaurant: restaurant,
          _id: menuId,
        });
      }

      if (plateform === "Others") {
        menuData = await others_menu_item_model.findOne({
          restaurant: restaurant,
          _id: menuId,
        });
      }

      if (plateform === "Bromag") {
        menuData = await bromag_menu_items.findOne({
          restaurant: restaurant,
          _id: menuId,
        });
      }

      if (plateform === "Swiggy") {
        menuData = await swiggy_menu_item_model.findOne({
          restaurant: restaurant,
          _id: menuId,
        });
      }

      // const category = await MenuCategory.find({
      //   restaurant: restaurant,
      // });
      // const MenuData = await Menu.findOne({
      //   _id: menuId,
      //   restaurant: restaurant,
      // });

      console.log(menuData, "MenuData");

      if (menuData) {
        res.json({ success: true, MenuData: menuData });
      } else {
        res.status(404).json({ success: false, message: "Menu not found" });
      }
    } else {
      res.json({ success: false, message: "Session expired!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const isRestaurant = req.restaurant;
    const menuId = req.params.Id;
    const {
      item,
      description,
      itemType,
      actualPrice,
      discountPrice,
      category,
    } = req.body;

    if (isRestaurant) {
      if (isNaN(actualPrice)) {
        return res.json({
          success: false,
          message: "Invalid actualPrice value",
        });
      }

      // Check if discountPrice is a valid number or null
      const processedDiscountPrice =
        discountPrice !== null ? parseFloat(discountPrice) : null;

      // Calculate percentage discount based on actualPrice and processedDiscountPrice
      const percentageDiscount =
        processedDiscountPrice !== null
          ? (processedDiscountPrice / actualPrice) * 100
          : 0;

      // Calculate discounted price
      const discountedPrice =
        processedDiscountPrice !== null
          ? actualPrice - processedDiscountPrice
          : actualPrice;

      let itemImage;
      let relativeImagePath;

      if (req.files && req.files.length > 0) {
        const file = req.files[0];
        const menu = await Menu.find({ _id: menuId });

        const oldPicURL = menu.itemImage;

        await helpers.deleteFileLocally(oldPicURL);
        const dirPath = path.join("uploads", "menu", "itemImages");
        const fileName = `${isRestaurant}/${file.filename}`;
        const imagePath = path.join(dirPath, fileName);
        // const imagePath = `menu/itemImages/${isRestaurant}/${file.filename}`;

        await helpers.uploadFileLocally(file, imagePath);

        helpers.getFileUrlLocally(imagePath);
        relativeImagePath = `/${imagePath.replace(/\\/g, "/")}`;
        helpers.deleteFile(file.path);
      }

      const updatedMenu = await Menu.updateOne(
        { _id: menuId },
        {
          $set: {
            item,
            itemType,
            actualPrice: actualPrice,
            discountPercentage: percentageDiscount.toFixed(2),
            discountPrice: discountPrice,
            category,
            description,
            price: discountedPrice,
            relativeImagePath,
          },
        }
      );

      if (!updatedMenu) {
        return res
          .status(404)
          .json({ success: false, message: "Menu not found" });
      }

      res.json({
        success: true,
        message: "Menu updated successfully",
        menu: updatedMenu,
      });
    } else {
      res.status(200).json({ success: false, message: "session expired" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateMenuItemAvailableStatus = async (req, res) => {
  try {
    // console.log('req.body:', req.body)
    const { id, availableStatus } = req.body
    const isRestaurantId = req.restaurant;
    // console.log('isRestaurantId:', isRestaurantId)

    if (isRestaurantId) {
      const isExistingMenuItem = await MenuItem.findOne({ restaruntId: isRestaurantId, _id: id });
      // console.log('isExistingMenuItem:', isExistingMenuItem)
      if (!isExistingMenuItem) {
        return res.status(404).send({
          success: false,
          message: "Item is not available!"
        })
      }

      if(isExistingMenuItem.quantity === 0) {
        return res.status(406).send({
          success : false,
          message : "Quantity is 0, Please add some quantity to open this!"
        })
      }

      await MenuItem.findOneAndUpdate({ restaruntId: isRestaurantId, _id: id }, { availableStatus : availableStatus })
      // console.log('updateExistingMenuItem:', updateExistingMenuItem)
      console.log("Here");
      return res.status(201).send({
        success: true,
        message : `Menu item has been ${availableStatus ? "opened" : "closed"}!`
      })
    } else {
      res.status(401).send({ success: false, message: "session expired" });
    }
  } catch (error) {

  }
}