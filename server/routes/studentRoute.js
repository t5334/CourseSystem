const express=require("express")
const router=express.Router()
const Student=require("../models/Student")
const studentController=require("../controllers/studentController")
const managerMW = require("../midlleware/managerMW")
const verifyJWT = require("../midlleware/verifyJWT")
const teacherMW = require("../midlleware/teacherMW")

router.post("/",studentController.createNewStudent)
router.get("/user/:userId",verifyJWT,studentController.getStudentByUserId)
router.get("/:id",verifyJWT,studentController.getStudentById)
router.get("/",verifyJWT,teacherMW,studentController.getAllStudent)
router.put("/",verifyJWT,studentController.updateStudent)
router.delete("/:id",verifyJWT,managerMW,studentController.deleteStudent)

module.exports=router