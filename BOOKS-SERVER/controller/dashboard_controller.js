const mongoose = require('mongoose');
const Bill = require("../model/bill_model");
const moment = require('moment');



exports.getDashboardCard = async (req, res) => {

    try {
        const restrauntId = req.restaurant;
        const { date } = req.body;
        console.log('dateq1234567:', date);
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
        }
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

        res.json({
            status: "Dashboard Summary",
            message: "Dashboard Summary Fetched Successfully",
            totalOrder,
            totalSales
        });
    } catch (error) {
        console.error('Error fetching dashboard sales data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


}
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

            // Fill missing data points with 0
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

        // Fetch data for each period
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
