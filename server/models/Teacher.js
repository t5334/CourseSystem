const mongoose = require("mongoose")
const teacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    account: {
        bank: {
            type: Number
        },
        acccount: {
            type: Number
        },
        name: {
            type: String
        }
    },

    salary: {
        type: Number
    }

}, {
    timestamps: true
}
)
module.exports = mongoose.model('Teacher', teacherSchema)