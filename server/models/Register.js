const mongoose = require("mongoose")
const paymentSchema = require("./Payment")
// const paymentSchema =require("./Payment")
const registerSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required:true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required:true
    },
    payments:  [paymentSchema]
    
    ,
    discount: {//הנחה
        type: Number,
        default:0
    },
    remarks: {//הערות
        type: String
    }

}, {
    timestamps: true
}
)
module.exports = mongoose.model('Register', registerSchema)