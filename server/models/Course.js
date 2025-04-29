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
        type:  mongoose.Schema.Types.String,
        enum: ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"]
    },
    maxClass: {
        type:  mongoose.Schema.Types.String,
        enum: ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"]
    }


}, {
    timestamps: true
}
)
module.exports = mongoose.model('Course', courseSchema)