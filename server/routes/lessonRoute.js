const express=require("express")
const router=express.Router()
const Lesson=require("../models/Lesson")
const lessonController=require("../controllers/lessonController")
const teacherMW = require("../midlleware/teacherMW")
const managerMW = require("../midlleware/managerMW")
const verifyJWT = require("../midlleware/verifyJWT")

router.use(verifyJWT)
router.use(teacherMW)
router.post("/",lessonController.createNewLesson)
router.get("/:id",lessonController.getLessonById)
router.get("/course/:courseId",lessonController.getLessonByCourse)
router.get("/course/:teacherId",lessonController.getLessonByTeacher)
router.get("/",managerMW,lessonController.getAllLessons)
router.put("/",lessonController.updateLesson)
router.delete("/:id",managerMW,lessonController.deleteLesson)

module.exports=router