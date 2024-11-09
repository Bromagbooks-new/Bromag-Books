const mongoose = require('mongoose');
const Bill = require("../model/bill_model");
const moment = require('moment');
const Inventory = require('../model/inventory_model')


exports.getDashboardCard = async (req, res) => {
    try {
        const restrauntId = req.restaurant;
        const { date } = req.body;
        console.log('date:', date);

        // Get start of day, last week, and last month
        const today = moment().startOf('day');
        const startOfLastWeek = moment().subtract(1, 'week').startOf('day');
        const startOfLastMonth = moment().subtract(1, 'month').startOf('day');

        // Get total sales for today, last week, and last month
        const todaySales = await calculateTotalSales(today, restrauntId);
        const lastWeekSales = await calculateTotalSales(startOfLastWeek, restrauntId);
        const lastMonthSales = await calculateTotalSales(startOfLastMonth, restrauntId);
        const totalSales = {
            today: todaySales,
            lastWeek: lastWeekSales,
            lastMonth: lastMonthSales
        };

        // Fetch the stats for day, week, and month
        const dailyStats = await Bill.getStats(restrauntId, date, "day");
        const weeklyStats = await Bill.getStats(restrauntId, date, "week");
        const monthlyStats = await Bill.getStats(restrauntId, date, "month");

        // Calculate total sales and total orders for today, last week, and last month
        const totalOrder = {
            today: dailyStats.totalBills,
            lastWeek: weeklyStats.totalBills,
            lastMonth: monthlyStats.totalBills
        };

        // Calculate inventory totals for today, last week, and last month
        const todayInventory = await calculateTotalInventory(today, restrauntId);
        const lastWeekInventory = await calculateTotalInventory(startOfLastWeek, restrauntId);
        const lastMonthInventory = await calculateTotalInventory(startOfLastMonth, restrauntId);

        const totalInventory = {
            today: todayInventory,
            lastWeek: lastWeekInventory,
            lastMonth: lastMonthInventory
        };

        res.json({
            status: "Dashboard Summary",
            message: "Dashboard Summary Fetched Successfully",
            totalOrder,
            totalSales,
            totalInventory
        });
    } catch (error) {
        console.error('Error fetching dashboard sales data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getSalesSummary = async (req, res) => {
    try {
        const restrauntId = req.restaurant;

        const dailyGraphData = await getGraphData('day', restrauntId);
        const weeklyGraphData = await getGraphData('week', restrauntId);
        const monthlyGraphData = await getGraphData('month', restrauntId);

        res.json({
            graphData: {
                day: dailyGraphData,
                week: weeklyGraphData,
                month: monthlyGraphData
            }
        });
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getOrderSummary = async (req, res) => {
    try {
        const isRestraunt = req.restaurant;
        const { date } = req.body;
        console.log('dateq1234567:', date);

        const dailyStats = await Bill.getStats(isRestraunt, date, "day");
        const weeklyStats = await Bill.getStats(isRestraunt, date, "week");
        const monthlyStats = await Bill.getStats(isRestraunt, date, "month");

        const totalOrder = {
            today: dailyStats.totalBills,
            lastWeek: weeklyStats.totalBills,
            lastMonth: monthlyStats.totalBills
        };

        const stats = {
            totalOrder,
            dailyStats,
            weeklyStats,
            monthlyStats,
        };

        res.status(200).json({
            status: "Dashboard Order Summary",
            message: "Dashboard Order Summary Fetched Successfully",
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




exports.getVegNonVegSummary = async (req, res) => {
    try {
        const restaurantId = req.restaurant;

        const getChartData = async (timePeriod) => {
            let startDate;
            let groupByFormat;

            if (timePeriod === 'day') {
                startDate = moment().startOf('day');
                groupByFormat = { $hour: "$date" };
            } else if (timePeriod === 'week') {
                startDate = moment().subtract(6, 'days').startOf('day');
                groupByFormat = { $dayOfMonth: "$date" };
            } else if (timePeriod === 'month') {
                startDate = moment().subtract(29, 'days').startOf('day');
                groupByFormat = { $dayOfMonth: "$date" };
            }

            const chartData = await Bill.aggregate([
                {
                    $match: {
                        restrauntId: restaurantId,
                        status: "COMPLETED",
                        date: { $gte: startDate.toDate() }
                    }
                },
                { $unwind: "$items" },
                {
                    $group: {
                        _id: {
                            dateGroup: groupByFormat,
                            itemType: "$items.itemType"
                        },
                        totalOrders: { $sum: "$items.quantity" }
                    }
                },
                {
                    $group: {
                        _id: "$_id.dateGroup",
                        veg: {
                            $sum: { $cond: [{ $eq: ["$_id.itemType", "veg"] }, "$totalOrders", 0] }
                        },
                        nonVeg: {
                            $sum: { $cond: [{ $eq: ["$_id.itemType", "non-veg"] }, "$totalOrders", 0] }
                        }
                    }
                },
                { $sort: { _id: 1 } }
            ]);
            const dataLength = timePeriod === 'day' ? 24 : (timePeriod === 'week' ? 7 : 30);
            const vegArray = Array(dataLength).fill(0);
            const nonVegArray = Array(dataLength).fill(0);

            chartData.forEach(item => {
                const index = item._id - 1; // Align with array indexing
                if (index >= 0 && index < dataLength) {
                    vegArray[index] = item.veg;
                    nonVegArray[index] = item.nonVeg;
                }
            });

            return { veg: vegArray, nonVeg: nonVegArray };
        };

        const dailyData = await getChartData('day');
        const weeklyData = await getChartData('week');
        const monthlyData = await getChartData('month');

        res.json({
            chartData: {
                day: dailyData,
                week: weeklyData,
                month: monthlyData
            }
        });
    } catch (error) {
        console.error('Error fetching veg/non-veg data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getInventorySummary = async (req, res) => {
    const restaurantId = req.restaurant;

    if (!restaurantId) {
        return res.status(400).json({ message: "restaurantId is required" });
    }

    const getStartDate = (timeFrame) => {
        const now = new Date();
        switch (timeFrame) {
            case "day":
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
            case "week":
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                return startOfWeek;
            case "month":
                return new Date(now.getFullYear(), now.getMonth(), 1);
            default:
                return new Date(0);
        }
    };

    try {
        const timeFrames = ["day", "week", "month"];
        const response = {};

        for (const timeFrame of timeFrames) {
            const startDate = getStartDate(timeFrame);
            const now = new Date();

            console.log(`Filtering ${timeFrame} data from ${startDate} to ${now}`);

            const inventoryData = await Inventory.aggregate([
                {
                    $match: {
                        restaruntId: restaurantId,
                        billDate: { $gte: startDate, $lt: now },
                    },
                },
                {
                    $group: {
                        _id: "$itemName",
                        totalQuantity: { $sum: "$totalQuantity" },
                        availableQuantity: { $sum: "$availableQuantity" },
                        itemType: { $first: "$itemType" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        name: "$_id",
                        totalQuantity: 1,
                        availableQuantity: 1,
                        itemImage: 1,
                        itemType: 1,
                    },
                },
            ]);

            console.log(`Inventory data for ${timeFrame}:`, inventoryData);

            const totalQuantity = inventoryData.reduce(
                (acc, item) => acc + item.totalQuantity,
                0
            );

            const chartData = inventoryData.map((item, index) => ({
                name: item.name,
                percent: ((item.totalQuantity / totalQuantity) * 100).toFixed(2),
                fill: ["#339AF0", "#FFA94D", "#FCC419", "#51CF66", "#94D82D", "#FCC2C3", "#D9480F", "#38D9A9", "#845EF7", "#F03E3E"][index % 10],
                itemType: item.itemType,
                totalQuantity: item.totalQuantity,
                availableQuantity: item.availableQuantity,
            }));

            const vegCount = inventoryData
                .filter(item => item.itemType === "veg")
                .reduce((acc, item) => acc + item.totalQuantity, 0);

            const nonVegCount = inventoryData
                .filter(item => item.itemType !== "veg")
                .reduce((acc, item) => acc + item.totalQuantity, 0);

            response[timeFrame] = {
                chartData,
                vegCount,
                nonVegCount,
            };
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching inventory summary data:", error);
        res.status(500).json({ message: "Failed to retrieve inventory summary data" });
    }
};
const calculateTotalInventory = async (startDate, restrauntId) => {
    console.log('Start Date677:', startDate);
    console.log('Current Date990:', new Date());
    const startDateUTC = startDate.utc().toDate();
    const inventoryData = await Inventory.aggregate([
        {
            $match: {
                restaruntId: restrauntId,  // Filter by restaurant ID
                billDate: { $gte: startDateUTC, $lt: new Date() },  // Filter by date range
            },
        },
        {
            $group: {
                _id: null,  // Group by null to aggregate everything into one result
                totalAvailableQuantity: { $sum: "$availableQuantity" },  // Sum up available quantities
            },
        },
        {
            $project: {
                _id: 0,
                totalAvailableQuantity: 1,  // Return only total available quantity
            },
        },
    ]);

    // If no inventory data is found, return totalAvailableQuantity as 0
    const totalInventory = inventoryData.length > 0 ? inventoryData[0].totalAvailableQuantity : 0;

    return totalInventory;  // Return only the total available quantity
};




async function calculateTotalSales(startDate, restrauntId) {
    const orders = await Bill.aggregate([
        { $match: { restrauntId: restrauntId, status: "COMPLETED", date: { $gte: startDate.toDate() } } },
        { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    return orders[0]?.total || 0;
}


async function getGraphData(timePeriod, restrauntId) {
    let startDate;
    let groupByFormat;

    if (timePeriod === 'day') {
        startDate = moment().startOf('day');
        groupByFormat = { $hour: "$date" };
    } else if (timePeriod === 'week') {
        startDate = moment().subtract(6, 'days').startOf('day');
        groupByFormat = { $dayOfMonth: "$date" };
    } else if (timePeriod === 'month') {
        startDate = moment().subtract(29, 'days').startOf('day');
        groupByFormat = { $dayOfMonth: "$date" };
    }

    const graphData = await Bill.aggregate([
        { $match: { restrauntId: restrauntId, status: "COMPLETED", date: { $gte: startDate.toDate() } } },
        {
            $group: {
                _id: groupByFormat,
                totalSales: { $sum: "$total" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    const dataLength = timePeriod === 'day' ? 24 : (timePeriod === 'week' ? 7 : 30);
    const salesArray = Array(dataLength).fill(0);
    graphData.forEach(item => {
        const index = item._id - 1; // Subtract 1 to align with array indexing
        if (index >= 0 && index < dataLength) {
            salesArray[index] = item.totalSales;
        }
    });

    return salesArray;
}
