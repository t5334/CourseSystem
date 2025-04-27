const Teacher = require("../models/Teacher")
const userController = require("./userController")
const mongoose=require("mongoose")

const createNewTeacher = async (req, res) => {
    const user = await userController.createNewUser(req, res)
    req.body=req.body+user._id+{role:"Teacher"}
    userController.updateUser(req,res)
    console.log(user);
    const { bank, acccount,name } = req.body
    const account={bank,acccount,name}
    const teacher = await Teacher.create({account,userId:user._id})
    if (teacher)
        return  res.json(teacher).status(201)
    return res.status(400).send('teacher not created')
}

const getAllTeachers = async (req, res) => {
    const teachers = await Teacher.find().populate("userId").lean()
    if (!teachers?.length)
        return res.status(404).send("dont found teachers")
    res.json(teachers)
}
const getTeacherById = async (req, res) => {
    const { id } = req.params
    const teacher = await Teacher.findById(id).populate("userId").lean()
    if (!teacher) {
        return res.status(404).send("This teacher not found")
    }
    res.json(teacher)
}

const updateTeacher = async (req, res) => {
    const { id, bank, acccount,name } = req.body
    if(!id){
        return res.status(400).send("The id is required")
    }
    const teacher = await Teacher.findById(id).exec()
    if (!teacher) {
        return res.status(404).send("The teacher is undefined")
    } 
    userController.updateUser(req, res)
    teacher.account = {bank,acccount,name}
    const updatedTeacher = await teacher.save()
    return res.status(200).json(updatedTeacher)
}

const deleteTeacher = async (req, res) => {
    const { id } = req.params
    const teacher = await Teacher.findById(id).exec()
    if (!teacher) {
        return res.status(400).send("the teacher not found")
    }
    req.params.userId = teacher.userId
    userController.deleteUser(req,res)
    const result = await teacher.deleteOne()
    return res.status(204)

}

module.exports = { createNewTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher }