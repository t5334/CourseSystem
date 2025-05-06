const express=require("express")
const router=express.Router()
const Teacher=require("../models/Teacher")
const teacherController=require("../controllers/teacherController")
const managerMW = require("../midlleware/managerMW")
const verifyJWT = require("../midlleware/verifyJWT")
const teacherMW = require("../midlleware/teacherMW")

router.post("/",teacherController.createNewTeacher)
router.use(verifyJWT)
router.get("/:id",teacherController.getTeacherById)
router.get("/",teacherController.getAllTeachers)
router.put("/",teacherMW,teacherController.updateTeacher)
router.delete("/:id",managerMW,teacherController.deleteTeacher)

module.exports=router