const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    yearbook:{//שנתון
        type:String,
        enum: ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"]
    },
    numClass:{//מספר כיתה
        type:Number
    }
    
},{
    timestamps:true
}
)
module.exports=mongoose.model('Student',studentSchema)