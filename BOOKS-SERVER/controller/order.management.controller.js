
const OrderServices = require("../services/order.management.services.js");
const AppLevelErrorHandler = require("../errors/appLevelErrorHandler.js");

exports.getCardAnalyticsController = async (req, res, next) => {
    try {
        const isRestaurant = req.restaurant;

        const analyticsResult = await OrderServices.getCardAnalytics(isRestaurant);

        res.status(200).send({
            success: true,
            analyticsResult: analyticsResult
        })
    } catch (error) {
        // throw new AppLevelErrorHandler("Invalid input!", 400, false, "Additional details about the error");
        // throw new Error("Database connection failed");
        next(new AppLevelErrorHandler("Something went wrong! Please try again letter", 500, false, error));
    }
}


exports.orderManagementDashboard = async (req, res) => {
    try {
        const { restaurantId } = req.restaurant; // Extract restaurantId from request params

        // Set date for today, beginning of week, and beginning of month
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Define functions to aggregate orders by restaurant ID
        const getStats = async (dateFilter) => {
            const stats = await Order.aggregate([
                {
                    $match: {
                        date: { $gte: dateFilter },
                        restaurantId: restaurantId // Filter by restaurantId
                    }
                },
                {
                    $group: {
                        _id: "$mode",
                        count: { $sum: 1 },
                    },
                },
            ]);

            const totalOrders = stats.reduce((acc, item) => acc + item.count, 0);

            return {
                totalOrders,
                orderTypeBreakdown: stats.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, { online: 0, takeaway: 0, dinein: 0 }),
            };
        };

        // Fetch statistics for different periods
        const dailyStats = await getStats(today);
        const weeklyStats = await getStats(startOfWeek);
        const monthlyStats = await getStats(startOfMonth);

        // Response structure
        res.json({
            status: 200,
            stats: {
                dailyStats,
                weeklyStats,
                monthlyStats,
            },
        });
    } catch (error) {
        console.error("Error fetching order stats:", error);
        res.status(500).json({ error: 'Failed to retrieve order statistics' });
    }
};