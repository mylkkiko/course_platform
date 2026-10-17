const asyncHandler = require('../utils/asyncHandler');
const enrollmentService = require('../services/enrollment.service');

const enroll = asyncHandler(async(req, res) => {
    const courseId = req.body.courseId;
    const user = req.user;
    const enrollment = await enrollmentService.enroll(courseId, user);
    res.status(201).json({ success: true, data: enrollment });
});

const getMy = asyncHandler(async(req, res) => {
    const user = req.user;
    const userEnrollments = await enrollmentService.getMy(user);
    res.status(200).json({ success: true, data: userEnrollments });
});

const updateProgress = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const progress = req.body.progress;
    const user = req.user;
    const updateEnrollment = await enrollmentService.updateProgress(id, progress, user);
    res.status(200).json({ success: true, data: updateEnrollment });
});

const cancel = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const user = req.user;
    await enrollmentService.cancel(id, user);
    res.status(200).json({ success: true, data: null });
});

const getAll = asyncHandler(async(req, res) => {
    const enrollments = await enrollmentService.getAll();
    res.status(200).json({ success: true, data: enrollments });
});

module.exports = { enroll, getMy, updateProgress, cancel, getAll };