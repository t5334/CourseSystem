
const express=require("express")
const router=express.Router()
const Register=require("../models/Register")
const registerController=require("../controllers/registerController")
const teacherMW = require("../midlleware/teacherMW")
const managerMW = require("../midlleware/managerMW")
const verifyJWT = require("../midlleware/verifyJWT")

router.use(verifyJWT)

router.post("/",registerController.createNewRegister)
router.get("/debt",registerController.getRegisterByDebt)
router.get("/course/:courseId",registerController.getRegisterByCourse)//teacherMW
router.get("/student/:id",registerController.getRegisterByStudent)
router.get("/phone/:id",registerController.getRegistersByPhone)
router.get("/:id",registerController.getRegisterById)
router.get("/",managerMW,registerController.getAllRegisters)
router.put("/",registerController.updateRegister)
router.delete("/:id",managerMW,registerController.deleteRegister)

module.exports=router