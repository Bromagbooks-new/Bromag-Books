
const billMode = require("../model/bill_model");
const AppLevelErrorHandler = require("../errors/appLevelErrorHandler");
const { formatTodayDate, formatWeekDate } = require("../utils/formateDate.js");

class OrderServices {
    async getCardAnalytics(isRestaurant) {
        try {
            // console.log('isRestaurant, todayDate:', isRestaurant, todayDate)
            const todayDate = formatTodayDate(new Date());
            const oneWeekAgoDate = formatWeekDate(new Date());
            console.log('oneWeekAgoDate:', oneWeekAgoDate)

            const dailyBreakdown = await billMode.getBillBreakdownForDay(isRestaurant, todayDate);
            const weeklyBreakdown = await billMode.getBillBreakdownForWeek(isRestaurant, todayDate, oneWeekAgoDate);
            // const monthlyBreakdown = await billMode.getBillBreakdownForMonth(isRestaurant, todayDate);

            // console.log('dailyBreakdown:', dailyBreakdown)
            return { dailyBreakdown, weeklyBreakdown };
        } catch (error) {
            throw new AppLevelErrorHandler("Something went wrong! Please try again letter!", 500, false, error.message);
        }
    }
}

module.exports = new OrderServices;