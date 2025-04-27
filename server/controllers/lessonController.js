const Lesson = require("../models/Lesson")
const mongoose = require("mongoose")

const createNewLesson = async (req, res) => {
    console.log(user);
    const { courseId, time, additionalExpenses } = req.body
    if (!courseId) {
        res.status(400).send("courseId is required")
    }
    const lesson = await Lesson.create({ courseId, time, additionalExpenses })
    if (lesson)
        return res.status(201).send(lesson)
    return res.status(400).send('lesson not created')
}

const getLessonByTeacher = async (req, res) => {
    const { teacherId } = req.params;

    if (!teacherId) {
        return res.status(400).send("teacherId is required");
    }

    const lessons = await Lesson.find({ courseId: teacherId }).populate("courseId").lean();

    if (!lessons.length) {
        return res.status(404).send("No lessons found for this teacher");
    }

    return res.json(lessons);

};

const getAllLessons = async (req, res) => {
    const lessons = await Lesson.find().populate("courseId").lean()
    if (!lessons?.length)
        return res.status(400).send("dont found lessons")
    res.json(lessons)
}
const getLessonById = async (req, res) => {
    const { id } = req.params
    const lesson = await Lesson.findById(id).populate("courseId").lean()
    if (!lesson) {
        return res.status(400).send("This lesson no found")
    }
    res.json(lesson)
}
const getLessonByCourse = async (req, res) => {
    const { courseId } = req.params
    const lesson = await Lesson.find({ courseId }).populate("courseId").lean()
    if (!lesson) {
        return res.status(400).send("This lesson no found")
    }
    res.json(lesson)
}
const updateLesson = async (req, res) => {
    const { id, additionalExpenses, StudentId, pay } = req.body
    if (!id) {
        return res.status(400).send("The id is required")
    }
    const lesson = await Lesson.findById(id).exec()
    if (!lesson) {
        return res.status(400).send("The lesson is undefined")
    }
    lesson.additionalExpenses = additionalExpenses
    lesson.presence.push(StudentId)
    const updatedLesson = await lesson.save()
    return res.json(updatedLesson).status(200)
}

const deleteLesson = async (req, res) => {
    const { id } = req.params
    const lesson = await Lesson.findById(id).exec()
    if (!lesson) {
        return res.status(400).send("the lesson not found")
    }
    const result = await lesson.deleteOne()
    return res.status(204)

}

module.exports = { createNewLesson, getLessonByCourse, getAllLessons, getLessonById, updateLesson, deleteLesson,getLessonByTeacher }