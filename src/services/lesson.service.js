const COURSE_ERRORS = require("../constants/errors/course.errors");
const LESSON_ERRORS = require("../constants/errors/lesson.errors");
const ROLES = require("../constants/roles");
const { Lesson, Course, Enrollment } = require("../models");
const AppError = require("../utils/AppError");
const { Op } = require('sequelize');
const { findOwnCourse } = require('../services/course.service');

const checkAccess = async (course, user) => {
    const isOwner = course.instructorId === user.id;
    const isAdmin = user.role === ROLES.ADMIN;
    if(!isOwner && !isAdmin) {
        const student = await Enrollment.findOne({ 
            where: {
                userId: user.id,
                courseId: course.id,
                status: {
                    [Op.in]: ['active', 'completed']
                }
            }
        });
        if(!student) {
            throw AppError.from(LESSON_ERRORS.NOT_ENROLLED);
        }
    }
}

const getLessonsByCourse = async(courseId, user) => {
    const course = await Course.findByPk(courseId);
    if(!course) {
        throw AppError.from(COURSE_ERRORS.NOT_FOUND);
    }
    await checkAccess(course, user);
    const lessons = await Lesson.findAll({ where: { courseId: course.id }, order: [['order', 'ASC']] });
    return lessons;
}

const getLessonById = async(id, user) => {
    const lesson = await Lesson.findByPk(id);
    if(!lesson) {
        throw AppError.from(LESSON_ERRORS.NOT_FOUND);
    }
    const lessonCourse = await Course.findByPk(lesson.courseId);
    await checkAccess(lessonCourse, user);
    return lesson;
}

const create = async(courseId, data, user) => {
    const { title, content, videoUrl, duration, order } = data;
    const course = await findOwnCourse(courseId, user);
    if(duration <= 0) {
        throw AppError.from(LESSON_ERRORS.INVALID_DURATION);
    }
    const lessonFind = await Lesson.findOne({ where: { courseId: course.id, order: order } });
    if(lessonFind) {
        throw AppError.from(LESSON_ERRORS.ORDER_EXISTS);
    }
    const lesson = await Lesson.create({ title, content, videoUrl, duration, order, courseId: courseId });
    return lesson.toJSON();
}

const update = async(id, data, user) => {
    const lesson = await Lesson.findByPk(id);
    if(!lesson) {
        throw AppError.from(LESSON_ERRORS.NOT_FOUND);
    }
    const { title, content, videoUrl, duration, order } = data;
    const course = await findOwnCourse(lesson.courseId, user);
    if(duration <= 0) {
        throw AppError.from(LESSON_ERRORS.INVALID_DURATION);
    }
    if(order && order !== lesson.order) {
        const lessonFind = await Lesson.findOne({ where: { courseId: course.id, order: order } });
        if(lessonFind) {
            throw AppError.from(LESSON_ERRORS.ORDER_EXISTS);
        }
    }
    const updateLesson = await lesson.update({ title, content, videoUrl, duration, order });
    return updateLesson.toJSON();
}

const remove = async(id, user) => {
    const lesson = await Lesson.findByPk(id);
    if(!lesson) {
        throw AppError.from(LESSON_ERRORS.NOT_FOUND);
    }
    await findOwnCourse(lesson.courseId, user);
    await lesson.destroy();
}

module.exports = { getLessonsByCourse, getLessonById, create, update, remove };