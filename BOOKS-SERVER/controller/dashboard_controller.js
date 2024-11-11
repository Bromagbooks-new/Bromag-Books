const mongoose = require('mongoose');
const Bill = require("../model/bill_model");
const moment = require('moment');
const Inventory = require('../model/inventory_model')


async function calculateTotalSales(startDate, endDate, restrauntId) {
    const orders = await Bill.aggregate([
        {
            $match: {
                restrauntId: restrauntId,
                status: "COMPLETED",
                date: { $gte: startDate.toDate(), $lt: endDate.toDate() }
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$total" }
            }
        }
    ]);
    return orders[0]?.total || 0;
}
async function calculateTotalInventory(startDate, endDate, restrauntId) {
    const inventory = await Inventory.aggregate([
        {
            $match: {
                restrauntId: restrauntId,
                date: { $gte: startDate.toDate(), $lt: endDate.toDate() }
            }
        },
        {
            $group: {
                _id: null,
                totalAvailableQuantity: { $sum: "$availableQuantity" },
            },
        },
        {
            $project: {
                _id: 0,
                totalAvailableQuantity: 1,
            },
        },
    ]);

    return inventory[0]?.totalAvailableQuantity || 0;
};


async function getTotalVegNonVegCount(restrauntId, startDate, endDate) {
    const items = await Bill.aggregate([
        {
            $match: {
                restrauntId: restrauntId,
                date: { $gte: startDate.toDate(), $lt: endDate.toDate() }
            }
        },
        {
            $group: {
                _id: null,
                totalItems: { $sum: 1 }
            }
        }
    ]);
    return items[0]?.totalItems || 0;
}

exports.getDashboardCard = async (req, res) => {
    try {
        const restrauntId = req.restaurant;
        const { date } = req.body;
        console.log('date:', date);

        // Define date ranges
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'day').startOf('day');
        const startOfThisWeek = moment().startOf('week');
        const startOfLastWeek = moment().subtract(1, 'week').startOf('week');
        const startOfThisMonth = moment().startOf('month');
        const startOfLastMonth = moment().subtract(1, 'month').startOf('month');

        // Total Sales calculations
        const todaySales = await calculateTotalSales(today, moment(), restrauntId);
        const yesterdaySales = await calculateTotalSales(yesterday, today, restrauntId);
        const thisWeekSales = await calculateTotalSales(startOfThisWeek, moment(), restrauntId);
        const lastWeekSales = await calculateTotalSales(startOfLastWeek, startOfThisWeek, restrauntId);
        const thisMonthSales = await calculateTotalSales(startOfThisMonth, moment(), restrauntId);
        const lastMonthSales = await calculateTotalSales(startOfLastMonth, startOfThisMonth, restrauntId);

        // Percentage changes for sales
        const todaySalesChange = ((todaySales - yesterdaySales) / (yesterdaySales || 1)) * 100;
        const weekSalesChange = ((thisWeekSales - lastWeekSales) / (lastWeekSales || 1)) * 100;
        const monthSalesChange = ((thisMonthSales - lastMonthSales) / (lastMonthSales || 1)) * 100;

        const totalSales = {
            today: parseFloat(todaySales.toFixed(2)),
            yesterday: parseFloat(yesterdaySales.toFixed(2)),
            week: parseFloat(thisWeekSales.toFixed(2)),
            month: parseFloat(thisMonthSales.toFixed(2)),
            todayChangePercentage: parseFloat(todaySalesChange.toFixed(2)),
            weekChangePercentage: parseFloat(weekSalesChange.toFixed(2)),
            monthChangePercentage: parseFloat(monthSalesChange.toFixed(2))
        };

        // Orders calculations
        const todayOrders = (await Bill.getStats(restrauntId, today, "day")).totalBills;
        const yesterdayOrders = (await Bill.getStats(restrauntId, yesterday, "day")).totalBills;
        const thisWeekOrders = (await Bill.getStats(restrauntId, startOfThisWeek, "week")).totalBills;
        const lastWeekOrders = (await Bill.getStats(restrauntId, startOfLastWeek, "week")).totalBills;
        const thisMonthOrders = (await Bill.getStats(restrauntId, startOfThisMonth, "month")).totalBills;
        const lastMonthOrders = (await Bill.getStats(restrauntId, startOfLastMonth, "month")).totalBills;

        const todayOrderChange = ((todayOrders - yesterdayOrders) / (yesterdayOrders || 1)) * 100;
        const weekOrderChange = ((thisWeekOrders - lastWeekOrders) / (lastWeekOrders || 1)) * 100;
        const monthOrderChange = ((thisMonthOrders - lastMonthOrders) / (lastMonthOrders || 1)) * 100;

        const totalOrder = {
            today: parseFloat(todayOrders.toFixed(2)),
            week: parseFloat(thisWeekOrders.toFixed(2)),
            month: parseFloat(thisMonthOrders.toFixed(2)),
            todayChangePercentage: parseFloat(todayOrderChange.toFixed(2)),
            weekChangePercentage: parseFloat(weekOrderChange.toFixed(2)),
            monthChangePercentage: parseFloat(monthOrderChange.toFixed(2))
        };

        // Inventory calculations
        const todayInventory = await calculateTotalInventory(today, moment(), restrauntId);
        const yesterdayInventory = await calculateTotalInventory(yesterday, today, restrauntId);
        const thisWeekInventory = await calculateTotalInventory(startOfThisWeek, moment(), restrauntId);
        const lastWeekInventory = await calculateTotalInventory(startOfLastWeek, startOfThisWeek, restrauntId);
        const thisMonthInventory = await calculateTotalInventory(startOfThisMonth, moment(), restrauntId);
        const lastMonthInventory = await calculateTotalInventory(startOfLastMonth, startOfThisMonth, restrauntId);

        const todayInventoryChange = ((todayInventory - yesterdayInventory) / (yesterdayInventory || 1)) * 100;
        const weekInventoryChange = ((thisWeekInventory - lastWeekInventory) / (lastWeekInventory || 1)) * 100;
        const monthInventoryChange = ((thisMonthInventory - lastMonthInventory) / (lastMonthInventory || 1)) * 100;

        const totalInventory = {
            today: parseFloat(todayInventory.toFixed(2)),
            week: parseFloat(thisWeekInventory.toFixed(2)),
            month: parseFloat(thisMonthInventory.toFixed(2)),
            todayChangePercentage: parseFloat(todayInventoryChange.toFixed(2)),
            weekChangePercentage: parseFloat(weekInventoryChange.toFixed(2)),
            monthChangePercentage: parseFloat(monthInventoryChange.toFixed(2))
        };

        // Dominant item counts
        const totalItemsToday = await getTotalVegNonVegCount(restrauntId, today, moment());
        const totalItemsYesterday = await getTotalVegNonVegCount(restrauntId, yesterday, today);
        const totalItemsThisWeek = await getTotalVegNonVegCount(restrauntId, startOfThisWeek, moment());
        const totalItemsLastWeek = await getTotalVegNonVegCount(restrauntId, startOfLastWeek, startOfThisWeek);
        const totalItemsThisMonth = await getTotalVegNonVegCount(restrauntId, startOfThisMonth, moment());
        const totalItemsLastMonth = await getTotalVegNonVegCount(restrauntId, startOfLastMonth, startOfThisMonth);

        const todayDominantChange = ((totalItemsToday - totalItemsYesterday) / (totalItemsYesterday || 1)) * 100;
        const weekDominantChange = ((totalItemsThisWeek - totalItemsLastWeek) / (totalItemsLastWeek || 1)) * 100;
        const monthDominantChange = ((totalItemsThisMonth - totalItemsLastMonth) / (totalItemsLastMonth || 1)) * 100;

        const totalDominant = {
            today: parseFloat(totalItemsToday.toFixed(2)),
            week: parseFloat(totalItemsThisWeek.toFixed(2)),
            month: parseFloat(totalItemsThisMonth.toFixed(2)),
            todayChangePercentage: parseFloat(todayDominantChange.toFixed(2)),
            weekChangePercentage: parseFloat(weekDominantChange.toFixed(2)),
            monthChangePercentage: parseFloat(monthDominantChange.toFixed(2))
        };

        res.json({
            status: "Dashboard Summary",
            message: "Dashboard Summary Fetched Successfully",
            totalOrder,
            totalSales,
            totalInventory,
            totalDominant
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
