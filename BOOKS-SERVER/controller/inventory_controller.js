const mongoose = require('mongoose');
const Bill = require("../model/bill_model");
const moment = require('moment');
const Inventory = require('../model/inventory_model')


exports.getTotalInventory = async (req, res) => {
    try {
        const restaurantId = req.restaurant;
        const { page, limit, skip } = req.pagination;
        // const now = new Date();
        // const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        // const startDate = moment.tz(istDate, "Asia/Kolkata").startOf('day').toDate();
        // const endDate = moment.tz(istDate, "Asia/Kolkata").endOf('day').toDate();

        if (restaurantId) {
            const totalDocuments = await Inventory.countDocuments({
                restaruntId: restaurantId,
            });

            const itemData = await Inventory.aggregate([
                {
                    $match: {
                        restaruntId: restaurantId,
                    }
                },
                {
                    $project: {
                        _id: 1,
                        itemImage: 1,
                        itemName: 1,
                        totalQuantity: 1,
                        availableQuantity: 1,
                        billDate: 1,
                        billNo: 1,
                        itemType: 1
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ]);

            const formattedData = itemData.map((item) => ({
                itemId: item._id,
                image: item.itemImage,
                name: item.itemName,
                totalQuantity: item.totalQuantity,
                availableQuantity: item.availableQuantity,
                billDate: item.billDate,
                billNumber: item.billNo,
                type: item.itemType
            }));

            res.status(200).json({
                success: true,
                itemData: formattedData,
                pagination: {
                    totalDocuments,
                    currentPage: page,
                    totalPages: Math.ceil(totalDocuments / limit),
                    limit
                }
            });
        } else {
            return res.status(401).json({ success: false, message: "Session expired!" });
        }
    } catch (error) {
        console.error("Error fetching item data:", error);
        res.status(500).json({ success: false, message: "Failed to load item data" });
    }
};


exports.getAvailaibleInventory = async (req, res) => {
    try {
        const restaurantId = req.restaurant;
        const { page, limit, skip } = req.pagination;

        if (restaurantId) {
            const totalDocuments = await Inventory.countDocuments({
                restaruntId: restaurantId,
                availableQuantity: { $gt: 1 }
            });

            const itemData = await Inventory.aggregate([
                {
                    $match: {
                        restaruntId: restaurantId,
                        availableQuantity: { $gt: 1 }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        itemImage: 1,
                        itemName: 1,
                        totalQuantity: 1,
                        availableQuantity: 1,
                        billDate: 1,
                        billNo: 1,
                        itemType: 1
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ]);

            const formattedData = itemData.map((item) => ({
                itemId: item._id,
                image: item.itemImage,
                name: item.itemName,
                totalQuantity: item.totalQuantity,
                availableQuantity: item.availableQuantity,
                billDate: item.billDate,
                billNumber: item.billNo,
                type: item.itemType
            }));

            res.status(200).json({
                success: true,
                itemData: formattedData,
                pagination: {
                    totalDocuments,
                    currentPage: page,
                    totalPages: Math.ceil(totalDocuments / limit),
                    limit
                }
            });
        } else {
            return res.status(401).json({ success: false, message: "Session expired!" });
        }
    } catch (error) {
        console.error("Error fetching item data:", error);
        res.status(500).json({ success: false, message: "Failed to load item data" });
    }
};

