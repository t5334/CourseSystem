const Course = require("../models/Course")
const mongoose=require("mongoose")

const createNewCourse = async (req, res) => {
    const { name, description,teacherId,price,category,minClass,maxClass} = req.body
if(!name){
    res.status(400).send("Name is required")
}
    const course = await Course.create({name, description,teacherId,price,category,minClass,maxClass})
    
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

// const getAllCourse = async (req, res) => {
//     const courses = await Course.find().populate({
//         path: "teacherId",
//         populate:({
//             path: "userId",
//             select: "-password -__v -userName", 
//         })
//     }).lean()
//     if (!courses?.length)
//         return res.status(400).send("dont found courses")
//     res.json(courses)
// }
const getAllCourse = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice, minClass, maxClass } = req.query;

        const classMap = {
            א: 1,
            ב: 2,
            ג: 3,
            ד: 4,
            ה: 5,
            ו: 6,
            ז: 7,
            ח: 8,
        };

        const query = {};

        if (name) {
            query.name = { $regex: name, $options: "i" }; // Case-insensitive partial match
        }

        if (category) {
            query.category ={ $regex: category, $options: "i" } ; // Exact match for category
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice); // Greater than or equal to minPrice
            if (maxPrice) query.price.$lte = parseInt(maxPrice); // Less than or equal to maxPrice
        }

        if (minClass || maxClass) {
            query.classCount = {}; // Ensure `classCount` is initialized as an object

            if (minClass) {
                const minClassKey = Object.keys(classMap).find(key => classMap[key] === parseInt(minClass));
                query.classCount.$gte = minClassKey; // Greater than or equal to `minClass` (letter)
            }

            if (maxClass) {
                const maxClassKey = Object.keys(classMap).find(key => classMap[key] === parseInt(maxClass));
                query.classCount.$lte = maxClassKey; // Less than or equal to `maxClass` (letter)
            }
        }

        const courses = await Course.find(query).populate({
            path: "teacherId",
            populate: {
                path: "userId",
                select: "-password -__v -userName",
            },
        }).lean();

        if (!courses?.length) {
            return res.status(404).send("No courses found");
        }

        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};
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
    console.log(teacherId);
    const course = await Course.find({teacherId}).populate("teacherId").lean()
    if (!course?.length) {
        return res.status(400).send("This course no found")
    }
    res.json(course)
}

const updateCourse = async (req, res) => {
    const { id,name, description,teacherId,price,category,minClass,maxClass} = req.body
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
    course.category=category
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

