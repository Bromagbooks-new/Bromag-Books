
const OrderServices = require("../services/order.management.services.js");
const AppLevelErrorHandler = require("../errors/appLevelErrorHandler.js");

exports.getCardAnalyticsController = async (req, res, next) => {
    try {
        const isRestaurant = req.restaurant;

        const analyticsResult = await OrderServices.getCardAnalytics(isRestaurant);

        res.status(200).send({
            success : true,
            analyticsResult : analyticsResult
        })
    } catch(error) {
        // throw new AppLevelErrorHandler("Invalid input!", 400, false, "Additional details about the error");
        // throw new Error("Database connection failed");
        next(new AppLevelErrorHandler("Something went wrong! Please try again letter", 500, false, error));
    }
}