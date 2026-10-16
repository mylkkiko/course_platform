const asyncHandler = require('../utils/asyncHandler');
const lessonService = require('../services/lesson.service');

const getLessonsByCourse = asyncHandler(async(req, res) => {
    const id = req.params.courseId;
    const user = req.user;
    const lessons = await lessonService.getLessonsByCourse(id, user);
    res.status(200).json({ success: true, data: lessons });
});

const getLessonById = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const user = req.user;
    const lesson = await lessonService.getLessonById(id, user);
    res.status(200).json({ success: true, data: lesson });
});

const create = asyncHandler(async(req, res) => {
    const courseId = req.params.courseId;
    const data = req.body;
    const user = req.user;
    const lesson = await lessonService.create(courseId, data, user);
    res.status(201).json({ success: true, data: lesson });
});

const update = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const user = req.user;
    const updateLesson = await lessonService.update(id, data, user);
    res.status(200).json({ success: true, data: updateLesson });
});

const remove = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const user = req.user;
    await lessonService.remove(id, user);
    res.status(200).json({ success: true, data: null });
})

module.exports = { getLessonsByCourse, getLessonById, create, update, remove }