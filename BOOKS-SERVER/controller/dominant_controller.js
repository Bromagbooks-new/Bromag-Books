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

exports.getTotalVegOrderData = async (req, res) => {
    try {
        const restaurantId = req.restaurant;

        console.log("Restaurant ID:", restaurantId);

        if (restaurantId) {
            const billData = await bill_model.find({
                restrauntId: restaurantId,
                status: "COMPLETED"  // Ensuring only completed orders are retrieved
            }).sort({ date: -1 });

            console.log("Total Takeaway Veg Bill Data:", billData);

            // Format and filter only veg items
            const formattedBillData = billData.map(bill => {
                const vegItems = bill.items
                    .filter(item => item.itemType === "veg") // Filter for veg items
                    .map(item => ({
                        itemId: item.itemId,
                        itemName: item.name,
                        quantity: item.quantity,
                        actualPrice: item.actualPrice,
                        discountPrice: item.discountPrice
                    }));

                // Return data only if there are veg items in this bill
                return vegItems.length > 0 ? {
                    billDate: bill.date.toISOString().split('T')[0],
                    time: bill.date.toISOString().split('T')[1].split('.')[0],
                    billId: bill.billNo,
                    billAmount: bill.total,
                    modeOfPayment: bill.paymentMode,
                    mode: bill.mode,
                    items: vegItems
                } : null;
            }).filter(bill => bill !== null);

            return res.status(200).json({ success: true, VegOrderData: formattedBillData });
        } else {
            return res.status(401).json({ success: false, message: "Session expired!" });
        }
    } catch (error) {
        console.error("Error fetching total Takeaway Veg data:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching the total Takeaway Veg data." });
    }
};


exports.getTotalNonVegOrderData = async (req, res) => {
    try {
        const restaurantId = req.restaurant;

        console.log("Restaurant ID:", restaurantId);

        if (restaurantId) {
            const billData = await bill_model.find({
                restrauntId: restaurantId,
                status: "COMPLETED"
            }).sort({ date: -1 });

            console.log("Total Takeaway Non-Veg Bill Data:", billData);

            const formattedBillData = billData.map(bill => {
                const nonVegItems = bill.items
                    .filter(item => item.itemType === "non-veg")
                    .map(item => ({
                        itemId: item.itemId,
                        itemName: item.name,
                        quantity: item.quantity,
                        actualPrice: item.actualPrice,
                        discountPrice: item.discountPrice
                    }));

                return nonVegItems.length > 0 ? {
                    billDate: bill.date.toISOString().split('T')[0],
                    time: bill.date.toISOString().split('T')[1].split('.')[0],
                    billId: bill.billNo,
                    billAmount: bill.total,
                    modeOfPayment: bill.paymentMode,
                    mode: bill.mode,
                    items: nonVegItems
                } : null;
            }).filter(bill => bill !== null);

            return res.status(200).json({ success: true, NonVegOrderData: formattedBillData });
        } else {
            return res.status(401).json({ success: false, message: "Session expired!" });
        }
    } catch (error) {
        console.error("Error fetching total Takeaway Non-Veg data:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching the total Takeaway Non-Veg data." });
    }
};
