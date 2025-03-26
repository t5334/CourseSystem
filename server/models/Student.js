const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    yearbook:{//שנתון
        type:Number,
        min:1,
        max:8
    },
    numClass:{//מספר כיתה
        type:Number
    }
    
},{
    timestamps:true
}
)
module.exports=mongoose.model('Student',studentSchema)