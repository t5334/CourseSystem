const express=require("express")
const router=express.Router()
const Course=require("../models/Course")
const courseController=require("../controllers/courseController")
const verifyJWT = require("../midlleware/verifyJWT")
const managerMW = require("../midlleware/managerMW")

router.use(verifyJWT)

router.post("/",managerMW,courseController.createNewCourse)
router.get("/techer/:teacherId",courseController.getCourseByTecher)
router.get("/:id",courseController.getCourseById)
router.get("/",courseController.getAllCourse)
router.put("/",managerMW,courseController.updateCourse)
router.delete("/:id",managerMW,courseController.deleteCourse)

module.exports=router