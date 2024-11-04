
const OrderServices = require("../services/order.management.services.js");
const AppLevelErrorHandler = require("../errors/appLevelErrorHandler.js");
const Order = require("../model/order_model");
const AccessedEmployees = require("../model/access_model");
const moment = require('moment');
const moment1 = require('moment-timezone');
const bill_model = require("../model/bill_model.js");
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

exports.getTotalOnlineOrderData = async (req, res) => {
    try {
        const restaurantId = req.restaurant;

        console.log("Restaurant ID:", restaurantId);

        if (restaurantId) {
            const billData = await bill_model.find({
                restrauntId: restaurantId,
                aggregator: { $in: ['zomato', 'swiggy', 'bromag', 'magicpin', 'others'] },
            }).sort({ date: -1 });

            console.log("Total Bill Data:", billData);

            const formattedBillData = billData.map(bill => ({
                billDate: bill.date,
                time: bill.date.toISOString().split('T')[1].split('.')[0],
                billId: bill.billNo,
                billAmount: bill.total,
                modeOfPayment: bill.paymentMode,
                aggregator: bill.aggregator,
                items: bill.items.map(item => ({
                    itemId: item.itemId,
                    itemName: item.name,
                }))
            }));

            return res.status(200).json({ success: true, OnlineOrderData: formattedBillData });
        } else {
            return res.status(401).json({ success: false, message: "Session expired!" });
        }
    } catch (error) {
        console.error("Error fetching total online data:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching the total online data." });
    }
};

exports.getTotalDineInOrderData = async (req, res) => {
    try {
        const restaurantId = req.restaurant;

        console.log("Restaurant ID:", restaurantId);

        if (restaurantId) {
            const billData = await bill_model.find({
                restrauntId: restaurantId,
                mode: "dinein",
            }).sort({ date: -1 });

            console.log("Total Bill Data:", billData);

            const formattedBillData = billData.map(bill => ({
                billDate: bill.date,
                time: bill.date.toISOString().split('T')[1].split('.')[0],
                billId: bill.billNo,
                billAmount: bill.total,
                modeOfPayment: bill.paymentMode,
                tableNo: bill.tableNo,
                items: bill.items.map(item => ({
                    itemId: item.itemId,
                    itemName: item.name,
                }))
            }));

            return res.status(200).json({ success: true, DineInOrderData: formattedBillData });
        } else {
            return res.status(401).json({ success: false, message: "Session expired!" });
        }
    } catch (error) {
        console.error("Error fetching total DineIn data:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching the total DineIn data." });
    }
};

exports.getTotalTakeawayOrderData = async (req, res) => {
    try {
        const restaurantId = req.restaurant;

        console.log("Restaurant ID:", restaurantId);

        if (restaurantId) {
            const billData = await bill_model.find({
                restrauntId: restaurantId,
                mode: "takeaway",
            }).sort({ date: -1 });

            console.log("Total Takeaway Bill Data:", billData);

            const formattedBillData = billData.map(bill => ({
                billDate: bill.date,
                time: bill.date.toISOString().split('T')[1].split('.')[0],
                billId: bill.billNo,
                billAmount: bill.total,
                modeOfPayment: bill.paymentMode,
                mode: bill.mode,
                items: bill.items.map(item => ({
                    itemId: item.itemId,
                    itemName: item.name,
                }))
            }));

            return res.status(200).json({ success: true, TakeawayOrderData: formattedBillData });
        } else {
            return res.status(401).json({ success: false, message: "Session expired!" });
        }
    } catch (error) {
        console.error("Error fetching total Takeaway data:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching the total Takeaway data." });
    }
};
