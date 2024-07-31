

const Bill = require('../model/bill_model');



exports.generateBill = async (req, res)=> {

    try {

        const {customerName, customerEmail, customerPhone, aggregator, orderId} = req.body;

        

    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
    }

}