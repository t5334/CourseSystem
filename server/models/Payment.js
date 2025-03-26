const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({

    amount: {
        type: Number
    },
    way: {
        type: String,
        enum: ["Check", "Cash", "credit", "Standing order"]
    },
    date: {
        type: mongoose.Schema.Types.Date
    }


}, {
    timestamps: true
}
)
module.exports =  paymentSchema
