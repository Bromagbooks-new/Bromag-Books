const moment = require('moment');
const bill_model = require("../model/bill_model.js");

exports.dominantManagementHomePage = async (req, res) => {
    try {
        const restaurantId = req.restaurant;

        // Set up date ranges for today, this week, and this month
        const startOfToday = moment().startOf('day').toDate();
        const endOfToday = moment().endOf('day').toDate();
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();

        // Helper function to get breakdown based on date range
        const getBreakdown = async (startDate, endDate) => {
            return await bill_model.aggregate([
                {
                    $match: {
                        date: { $gte: startDate, $lte: endDate },
                        status: 'COMPLETED',
                        restrauntId: restaurantId
                    }
                },
                { $unwind: '$items' },
                {
                    $group: {
                        _id: '$items.itemType',
                        totalOrders: { $sum: '$items.quantity' }
                    }
                },
                {
                    $project: {
                        veg: { $cond: [{ $eq: ['$_id', 'veg'] }, '$totalOrders', 0] },
                        nonVeg: { $cond: [{ $eq: ['$_id', 'non-veg'] }, '$totalOrders', 0] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        veg: { $sum: '$veg' },
                        nonVeg: { $sum: '$nonVeg' },
                        total: { $sum: { $add: ['$veg', '$nonVeg'] } }
                    }
                },
                { $project: { _id: 0, veg: 1, nonVeg: 1, total: 1 } }
            ]);
        };

        // Fetch data for today, this week, and this month
        const dailyBreakdown = await getBreakdown(startOfToday, endOfToday);
        const weeklyBreakdown = await getBreakdown(startOfWeek, endOfWeek);
        const monthlyBreakdown = await getBreakdown(startOfMonth, endOfMonth);

        // Bar graph data for each time period
        const barGraphData = {
            today: {
                veg: dailyBreakdown[0]?.veg || 0,
                nonVeg: dailyBreakdown[0]?.nonVeg || 0
            },
            thisWeek: {
                veg: weeklyBreakdown[0]?.veg || 0,
                nonVeg: weeklyBreakdown[0]?.nonVeg || 0
            },
            thisMonth: {
                veg: monthlyBreakdown[0]?.veg || 0,
                nonVeg: monthlyBreakdown[0]?.nonVeg || 0
            }
        };

        res.json({
            dailyBreakdown: dailyBreakdown[0] || { veg: 0, nonVeg: 0, total: 0 },
            weeklyBreakdown: weeklyBreakdown[0] || { veg: 0, nonVeg: 0, total: 0 },
            monthlyBreakdown: monthlyBreakdown[0] || { veg: 0, nonVeg: 0, total: 0 },
            barGraphData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
