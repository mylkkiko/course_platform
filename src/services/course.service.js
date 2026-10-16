const COURSE_ERRORS = require("../constants/errors/course.errors");
const ROLES = require("../constants/roles");
const { Course, Lesson, User } = require("../models");
const AppError = require("../utils/AppError");

const create = async (data, user) => {
    const { title, description, category, level, price, isPublished } = data;
    if (!title) {
        throw AppError.from(COURSE_ERRORS.TITLE_REQUIRED);
    }
    if (price < 0) {
        throw AppError.from(COURSE_ERRORS.INVALID_PRICE);
    }
    const course = await Course.create({ title, description, category, level, price, isPublished, instructorId: user.id });
    return course.toJSON();
}

const getAll = async ({ category, level }) => {
    const where = { isPublished: true };
    if (category) {
        where.category = category;
    }
    if (level) {
        where.level = level;
    }
    const data = await Course.findAll({
        include: [
            { model: Lesson, as: 'lessons', attributes: ['id'] },
            { model: User, as: 'instructor', attributes: ['id', 'fullName', 'email'] }
        ],
        where
    });

    return data.map((course) => {
        const { lessons, ...rest } = course.toJSON();
        return { ...rest, lessonsCount: lessons.length };
    });
}

const getMy = async (user) => {
    const userCourses = await Course.findAll({
        where: {
            instructorId: user.id
        },
        include: [
            { model: Lesson, as: 'lessons', attributes: ['id'] },
            { model: User, as: 'instructor', attributes: ['id', 'fullName', 'email'] }
        ]
    });
    return userCourses.map((course) => {
        const { lessons, ...rest } = course.toJSON();
        return { ...rest, lessonsCount: lessons.length };
    });
}

const getById = async (id, user) => {
    const course = await Course.findByPk(id, {
        include: [
            { model: User, as: 'instructor', attributes: ['id', 'fullName', 'email'] },
            { model: Lesson, as: 'lessons' }
        ],
        order: [[{ model: Lesson, as: 'lessons' }, 'order', 'ASC']]
    });
    if (!course) {
        throw AppError.from(COURSE_ERRORS.NOT_FOUND);
    }
    if (!course.isPublished) {
        const isOwner = user && course.instructorId === user.id;
        const isAdmin = user && user.role === ROLES.ADMIN;
        if (!isOwner && !isAdmin) {
            throw AppError.from(COURSE_ERRORS.NOT_FOUND);
        }
    }
    return course.toJSON();
}

const findOwnCourse = async (id, user) => {
    const course = await Course.findByPk(id);
    if (!course) {
        throw AppError.from(COURSE_ERRORS.NOT_FOUND);
    }
    const isOwner = course.instructorId === user.id;
    const isAdmin = user.role === ROLES.ADMIN;
    if (!isOwner && !isAdmin) {
        throw AppError.from(COURSE_ERRORS.NOT_OWNER);
    }
    return course;
}

const update = async (id, data, user) => {
    const course = await findOwnCourse(id, user);
    const { title, description, category, level, price, isPublished } = data;
    if (price < 0) {
        throw AppError.from(COURSE_ERRORS.INVALID_PRICE);
    }
    const updateCourse = await course.update({ title, description, category, level, price, isPublished });
    return updateCourse.toJSON();
}

const remove = async (id, user) => {
    const course = await findOwnCourse(id, user);
    await course.destroy();
}

const getStudents = async (id, user) => {
    await findOwnCourse(id, user);
    const course = await Course.findByPk(id, {
        include: [
            { model: User, as: 'students', attributes: ['id', 'fullName', 'email'], through: { attributes: ['status', 'progress'] } },
        ]
    });
    const std = course.toJSON();
    return std.students;
}

module.exports = { create, getAll, getMy, getById, update, remove, getStudents, findOwnCourse };