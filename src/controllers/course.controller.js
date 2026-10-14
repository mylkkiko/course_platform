const asyncHandler = require('../utils/asyncHandler');
const courseService = require('../services/course.service');

const create = asyncHandler(async (req, res) => {
    const data = req.body;
    const user = req.user;
    const course = await courseService.create(data, user);
    res.status(201).json({ success: true, data: course });
});

const getAll = asyncHandler(async (req, res) => {
    const { category, level } = req.query;
    const courses = await courseService.getAll({ category, level });
    res.status(200).json({ success: true, data: courses });
});

const getMy = asyncHandler(async (req, res) => {
    const user = req.user;
    const userCourse = await courseService.getMy(user);
    res.status(200).json({ success: true, data: userCourse });
});

const getById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const course = await courseService.getById(id, user);
    res.status(200).json({ success: true, data: course });
});

const update = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const user = req.user;
    const updateCourse = await courseService.update(id, data, user);
    res.status(200).json({ success: true, data: updateCourse });
});

const remove = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    await courseService.remove(id, user);
    res.status(200).json({ success: true, data: null });
});

const getStudents = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const students = await courseService.getStudents(id, user);
    res.status(200).json({ success: true, data: students });
});

module.exports = { create, getAll, getMy, getById, update, remove, getStudents };