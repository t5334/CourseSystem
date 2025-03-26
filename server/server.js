require("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")

const app=express()
const PORT=process.env.PORT||7000
connectDB()

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/auth",require("./routes/authRoute"))
app.use("/api/students",require("./routes/studentRoute"))
app.use("/api/users",require("./routes/userRoute"))
app.use("/api/register",require("./routes/registerRoute"))
app.use("/api/course",require("./routes/courseRoute"))
app.use("/api/teachers",require("./routes/teacherRoute"))
app.use("/api/lesson",require("./routes/lessonRoute"))

mongoose.connection.once('open',()=>{
    console.log("connected to db");
    app.listen(PORT,()=>{
        console.log(`server runinng on port ${PORT}`);
    })
})
mongoose.connection.on('error',(err)=>{
    console.log(err);
})


