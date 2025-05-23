const Student = require("../models/Student")
const userController = require("./userController")
const mongoose=require("mongoose")

const createNewStudent = async (req, res) => {

    const user = await userController.createNewUser(req, res)
    const { numClass, yearbook } = req.body
    const student = await Student.create({ numClass, yearbook,userId:user._id})
    if (student)
        return  res.json(student).status(201)
    return res.status(400).send('student not created')
}

const getAllStudent = async (req, res) => {
    const students = await Student.find().populate({
        path: "userId",
        select: "-password -__v -userName", 
    }).lean()
    if (!students?.length)
        return res.status(400).send("dont found students")
    res.json(students)
}
const getStudentById = async (req, res) => {
    const { id } = req.params
    const student = await Student.findById(id).populate({
        path: "userId",
        select: "-password -__v -userName", 
    }).lean()

if (!student) {
        return res.status(400).send("This student not found")
    }
    res.json(student)
}
const getStudentByUserId = async (req, res) => {
    const { userId } = req.params; 
console.log(userId);
    try {
        const student = await Student.findOne({ userId: userId }).populate({
            path: "userId",
            select: "-password -__v -userName", 
        }).lean();
console.log("userId:   "+userId);
console.log(student);
        if (!student) {
            return res.status(404).send("This student not found");
        }

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};
const updateStudent = async (req, res) => {
    const { id, numClass, yearbook } = req.body
    if(!id){
        return res.status(400).send("The id is required")
    }
    const student = await Student.findById(id).exec()
    if (!student) {
        return res.status(400).send("The student is undefined")
    } 
    userController.updateUser(req, res)
    student.numClass = numClass
    student.yearbook = yearbook
    const updatedStudent = (await student.save())
    const populatedStudent = await Student.findById(updatedStudent._id)
    .populate('userId') 
    .exec();
    return res.json(populatedStudent).status(200)
}

const deleteStudent = async (req, res) => {
    const { id } = req.params
    const student = await Student.findById(id).exec()
    if (!student) {
        return res.status(400).send("the student not found")
    }
    req.params.userId = student.userId
    userController.deleteUser(req,res)
    const result = await student.deleteOne()
    return res.send(204)

}

module.exports = { getStudentByUserId,createNewStudent, getAllStudent, getStudentById, updateStudent, deleteStudent }