const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({

    amount: {
        type: Number
    },
    way: {
        type: String,
        enum: ["Check", "Cash", 'Credit Card', "Standing order",'bankTransfer']
    },
    date: {
        type: mongoose.Schema.Types.Date
    }


}, {
    timestamps: true
}
)
module.exports =  paymentSchema
