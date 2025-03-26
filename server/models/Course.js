const mongoose = require("mongoose")
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    price: {
        type: Number
    },
    domain: {//תחום
        type: String
    },
    minClass: {
        type: Number,
        min: 1,
        max: 8
    },
    maxClass: {
        type: Number,
        min: 1,
        max: 8
    }


}, {
    timestamps: true
}
)
module.exports = mongoose.model('Course', courseSchema)