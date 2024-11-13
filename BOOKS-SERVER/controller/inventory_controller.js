const mongoose = require('mongoose');
const Bill = require("../model/bill_model");
const moment = require('moment');
const Inventory = require('../model/inventory_model')


exports.getTotalInventory = async (req, res) => {
    try {
        const restaurantId = req.restaurant;
        const { page, limit, skip } = req.pagination;

        if (restaurantId) {
            const totalDocuments = await Inventory.countDocuments({
                restaurantId: restaurantId,
            });

            const itemData = await Inventory.aggregate([
                {
                    $match: {
                        restaurantId: restaurantId,
                    }
                },
                {
                    $project: {
                        _id: 1,
                        itemImage: 1,
                        itemName: 1,
                        itemPrice: 1,
                        itemType: 1,
                        totalQuantity: 1,
                        leftOut: 1,
                        priceValue: 1,
                        createdAt: 1,
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ]);

            const formattedData = itemData.map((item) => ({
                itemId: item._id,
                image: item.itemImage,
                name: item.itemName,
                price: item.itemPrice,
                type: item.itemType,
                totalQuantity: item.totalQuantity,
                leftOut: item.leftOut,
                priceValue: item.priceValue,
                createdAt: item.createdAt
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
                restaruntId: restaurantId
            });

            const itemData = await Inventory.aggregate([
                {
                    $match: {
                        restaurantId: restaurantId
                    }
                },
                {
                    $project: {
                        _id: 1,
                        itemImage: 1,
                        itemName: 1,
                        itemPrice: 1,
                        itemType: 1,
                        totalQuantity: 1,
                        soldOut: 1,
                        leftOut: 1,
                        priceValue: 1,
                        createdAt: 1,
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ]);

            const formattedData = itemData.map((item) => ({
                itemId: item._id,
                image: item.itemImage,
                name: item.itemName,
                price: item.itemPrice,
                type: item.itemType,
                totalQuantity: item.totalQuantity,
                soldOut: item.soldOut,
                leftOut: item.leftOut,
                priceValue: item.priceValue,
                createdAt: item.createdAt
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


const getStartDate = (timeFrame) => {
    const now = moment();
    switch (timeFrame) {
        case "day":
            return now.startOf('day').toDate();
        case "week":
            return now.startOf('week').toDate();
        case "month":
            return now.startOf('month').toDate();
        default:
            return new Date(0); // Return an epoch date as fallback
    }
};

exports.getPieChartDataInventory = async (req, res) => {
    const restaurantId = req.restaurant;

    if (!restaurantId) {
        return res.status(400).json({ message: "restaurantId is required" });
    }

    try {
        const timeFrames = ["day", "week", "month"];
        const response = {};

        for (const timeFrame of timeFrames) {
            const startDate = getStartDate(timeFrame);
            const now = new Date();

            console.log(`Filtering ${timeFrame} data from ${startDate} to ${now}`);

            // Aggregate inventory data based on time frame
            const inventoryData = await Inventory.aggregate([
                {
                    $match: {
                        restaurantId: restaurantId,
                        createdAt: { $gte: startDate, $lte: now }, // Use createdAt instead of date
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalQuantity: { $sum: "$totalQuantity" },
                        leftOut: { $sum: "$leftOut" },
                    },
                },
            ]);

            // If no data exists for the given time frame, provide default values
            if (inventoryData.length > 0) {
                const { totalQuantity, leftOut } = inventoryData[0];

                const chartData = {
                    totalQuantity,
                    leftOut,
                    totalQuantityColor: '#32CD32',
                    leftOutColor: '#FFD700',
                };

                response[timeFrame] = chartData;
            } else {
                // Default response when no data is found for the time frame
                response[timeFrame] = {
                    totalQuantity: 0,
                    leftOut: 0,
                    totalQuantityColor: '#32CD32',
                    leftOutColor: '#FFD700',
                };
            }
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching inventory summary data:", error);
        res.status(500).json({ message: "Failed to retrieve inventory summary data" });
    }
};




exports.getCardInventoryHomePage = async (req, res) => {
    try {
        const restaurantId = req.restaurant;

        // Define date ranges for today, yesterday, week, and month
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'day').startOf('day');
        const startOfThisWeek = moment().startOf('week');
        const startOfLastWeek = moment().subtract(1, 'week').startOf('week');
        const startOfThisMonth = moment().startOf('month');
        const startOfLastMonth = moment().subtract(1, 'month').startOf('month');

        // Calculate totalQuantity and leftOut for different time frames
        const todayInventory = await calculateTotalInventory(today, moment(), restaurantId);
        const yesterdayInventory = await calculateTotalInventory(yesterday, today, restaurantId);
        const thisWeekInventory = await calculateTotalInventory(startOfThisWeek, moment(), restaurantId);
        const lastWeekInventory = await calculateTotalInventory(startOfLastWeek, startOfThisWeek, restaurantId);
        const thisMonthInventory = await calculateTotalInventory(startOfThisMonth, moment(), restaurantId);
        const lastMonthInventory = await calculateTotalInventory(startOfLastMonth, startOfThisMonth, restaurantId);

        // Calculate change percentages
        const todayInventoryChange = ((todayInventory.totalQuantity - yesterdayInventory.totalQuantity) / (yesterdayInventory.totalQuantity || 1)) * 100;
        const weekInventoryChange = ((thisWeekInventory.totalQuantity - lastWeekInventory.totalQuantity) / (lastWeekInventory.totalQuantity || 1)) * 100;
        const monthInventoryChange = ((thisMonthInventory.totalQuantity - lastMonthInventory.totalQuantity) / (lastMonthInventory.totalQuantity || 1)) * 100;

        const todayLeftOutChange = ((todayInventory.leftOut - yesterdayInventory.leftOut) / (yesterdayInventory.leftOut || 1)) * 100;
        const weekLeftOutChange = ((thisWeekInventory.leftOut - lastWeekInventory.leftOut) / (lastWeekInventory.leftOut || 1)) * 100;
        const monthLeftOutChange = ((thisMonthInventory.leftOut - lastMonthInventory.leftOut) / (lastMonthInventory.leftOut || 1)) * 100;

        // Prepare the final response
        const totalInventory = {
            totalQuantity: {
                today: parseFloat(todayInventory.totalQuantity.toFixed(2)),
                week: parseFloat(thisWeekInventory.totalQuantity.toFixed(2)),
                month: parseFloat(thisMonthInventory.totalQuantity.toFixed(2)),
                todayChangePercentage: parseFloat(todayInventoryChange.toFixed(2)),
                weekChangePercentage: parseFloat(weekInventoryChange.toFixed(2)),
                monthChangePercentage: parseFloat(monthInventoryChange.toFixed(2))
            },
            leftOut: {
                today: parseFloat(todayInventory.leftOut.toFixed(2)),
                week: parseFloat(thisWeekInventory.leftOut.toFixed(2)),
                month: parseFloat(thisMonthInventory.leftOut.toFixed(2)),
                todayChangePercentage: parseFloat(todayLeftOutChange.toFixed(2)),
                weekChangePercentage: parseFloat(weekLeftOutChange.toFixed(2)),
                monthChangePercentage: parseFloat(monthLeftOutChange.toFixed(2))
            }
        };

        // Send the response
        res.json({
            status: "Inventory Summary",
            message: "Inventory Summary Fetched Successfully",
            totalInventory
        });
    } catch (error) {
        console.error('Error fetching inventory dashboard data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Utility function to calculate totalQuantity and leftOut
async function calculateTotalInventory(startDate, endDate, restaurantId) {
    try {
        const inventoryData = await Inventory.aggregate([
            {
                $match: {
                    restaurantId: restaurantId,
                    createdAt: { $gte: startDate.toDate(), $lte: endDate },
                },
            },
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: "$totalQuantity" },
                    leftOut: { $sum: "$leftOut" },
                },
            },
        ]);

        // Return the summed totalQuantity and leftOut
        return inventoryData.length > 0 ? inventoryData[0] : { totalQuantity: 0, leftOut: 0 };
    } catch (error) {
        console.error('Error calculating total inventory:', error);
        throw error;
    }
}


