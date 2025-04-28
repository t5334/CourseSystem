const express=require("express")
const router=express.Router()
const Student=require("../models/Student")
const studentController=require("../controllers/studentController")
const managerMW = require("../midlleware/managerMW")
const verifyJWT = require("../midlleware/verifyJWT")

//router.use(verifyJWT)
router.post("/",studentController.createNewStudent)
router.get("/:id",studentController.getStudentById)
router.get("/",managerMW,studentController.getAllStudent)
router.put("/",studentController.updateStudent)
router.delete("/:id",managerMW,studentController.deleteStudent)

module.exports=router