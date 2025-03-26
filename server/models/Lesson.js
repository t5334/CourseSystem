const mongoose = require("mongoose")
const lessonSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required:true
    },
    presence: {//נוכחות
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Student'
    },
    time:{
            type: mongoose.Schema.Types.Date
    },
    additionalExpenses:{
        type:Number,
        default:0
    },
    payment:{
        type:Boolean,
        default:false
    }


}, {
    timestamps: true
}
)
module.exports = mongoose.model('Lesson', lessonSchema)