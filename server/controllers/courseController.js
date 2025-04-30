const Course = require("../models/Course")
const mongoose=require("mongoose")

const createNewCourse = async (req, res) => {
    const { name, description,teacherId,price,domain,minClass,maxClass} = req.body
if(!name){
    res.status(400).send("Name is required")
}
    const course = await Course.create({name, description,teacherId,price,domain,minClass,maxClass})
    
    if (course) {
        const populatedCourse = await Course.findById(course._id).populate({
            path: "teacherId",
            populate: {
                path: "userId",
                select: "-password -__v -userName", 
            }
        })
        if (!populatedCourse) {
            return res.status(400).send("course not found")
        }
        return res.status(201).send(populatedCourse);
    }
    return res.status(400).send('course not created')
}

const getAllCourse = async (req, res) => {
    const courses = await Course.find().populate({
        path: "teacherId",
        populate:({
            path: "userId",
            select: "-password -__v -userName", 
        })
    }).lean()
    if (!courses?.length)
        return res.status(400).send("dont found courses")
    res.json(courses)
}
const getCourseById = async (req, res) => {
    const { id } = req.params
    const course = await Course.findById(id).populate({
        path: "teacherId",
        populate:({
            path: "userId",
            select: "-password -__v -userName", 
        })
    }).lean()
    if (!course) {
        return res.status(400).send("This course no found")
    }
    res.json(course)
}
const getCourseByTecher=async(req,res)=>{
    const { teacherId } = req.params
    const course = await Course.find({teacherId}).populate("teacherId").lean()
    if (!course) {
        return res.status(400).send("This course no found")
    }
    res.json(course)
}

const updateCourse = async (req, res) => {
    const { id,name, description,teacherId,price,domain,minClass,maxClass} = req.body
    if(!id||!name){
        return res.status(400).send("The id and name are required")
    }
    const course = await Course.findById(id).exec()
    if (!course) {
        return res.status(400).send("The course is undefined")
    } 
    course.name=name
    course.description=description
    course.teacherId=teacherId
    course.price=price
    course.domain=domain
    course.minClass=minClass
    course.maxClass=maxClass
    const updatedCourse = await course.save()
    return res.json(updatedCourse).status(200)
}

const deleteCourse = async (req, res) => {
    const { id } = req.params
    const course = await Course.findById(id).exec()
    if (!course) {
        return res.status(400).send("the course not found")
    }
    const result = await course.deleteOne()
    return res.status(204)

}

module.exports = { createNewCourse,getCourseByTecher, getAllCourse, getCourseById, updateCourse, deleteCourse }