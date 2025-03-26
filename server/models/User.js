const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Student", "Teacher", "Manager"],
        default: "Student"
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)