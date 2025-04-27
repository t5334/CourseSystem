const express=require("express")
const router=express.Router()
const Teacher=require("../models/Teacher")
const teacherController=require("../controllers/teacherController")
const managerMW = require("../midlleware/managerMW")
const verifyJWT = require("../midlleware/verifyJWT")

router.use(verifyJWT)
router.post("/",managerMW,teacherController.createNewTeacher)
router.get("/:id",teacherController.getTeacherById)
router.get("/",managerMW,teacherController.getAllTeachers)//
router.put("/",managerMW,teacherController.updateTeacher)
router.delete("/:id",managerMW,teacherController.deleteTeacher)

module.exports=router