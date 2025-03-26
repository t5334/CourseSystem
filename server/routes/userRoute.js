const express=require("express")
const router=express.Router()
const User=require("../models/User")
const userController=require("../controllers/userController")
const verifyJWT = require("../midlleware/verifyJWT")

router.use(verifyJWT)

router.get("/:userId",userController.getUserById)
router.get("/",userController.getAllUsers)
router.put("/",userController.updateUser)
router.delete("/:userId",userController.deleteUser)
router.put("/",userController.updatePassword)

module.exports=router