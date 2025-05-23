const Teacher = require("../models/Teacher")
const userController = require("./userController")
const mongoose = require("mongoose")

const createNewTeacher = async (req, res) => {
    const user = await userController.createNewUser(req, res)
    if(!user)
        return
    req.body.role = "Teacher"
    req.body.userId = user._id
    console.log(req.body.role)
    await userController.updateUser(req, res)
    
    const { bank, acccount, holder } = req.body
    const account = { bank, acccount, holder }
    const teacher = await Teacher.create({ account, userId: user._id })
    if (teacher)
        return res.status(201).json(teacher)
    userController.deleteUser(req,res)
    return res.status(400).send('teacher not created')
}

const getAllTeachers = async (req, res) => {
    const teachers = await Teacher.find().populate({
        path: "userId",
        select: "-password -__v -userName", 
    }).lean()
    if (!teachers?.length)
        return res.status(404).send("dont found teachers")
    res.json(teachers)
}
const getTeacherById = async (req, res) => {
    const { id } = req.params
    const teacher = await Teacher.findById(id).populate({
        path: "userId",
        select: "-password -__v -userName" 
    }).lean()
    if (!teacher) {
        return res.status(404).send("This teacher not found")
    }
    res.json(teacher)
}
const getTeacherByUserId = async (req, res) => {
    const { userId } = req.params; 
    try {
        const teacher = await Teacher.findOne({ userId: userId }).populate({
            path: "userId",
            select: "-password -__v -userName", 
        }).lean();

        if (!teacher) {
            return res.status(404).send("This teacher not found");
        }

        res.json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

const updateTeacher = async (req, res) => {
    const {id, bank, accountHolder,accountNumber, name } = req.body
   
    if (!id) {
        return res.status(400).send("The id is required")
    }
    const teacher = await Teacher.findById(id).populate({
        path: "userId",
        select: "-password -__v -userName", 
    }).exec()
    if (!teacher) {
        return res.status(404).send("The teacher is undefined")
    }
    const x=userController.updateUser(req, res)
    teacher.account = { bank, acccount:accountNumber, holder:accountHolder }
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
    userController.deleteUser(req, res)
    const result = await teacher.deleteOne()
    return res.status(204)

}

module.exports = { createNewTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher,getTeacherByUserId }