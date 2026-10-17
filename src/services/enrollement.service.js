const COURSE_ERRORS = require('../constants/errors/course.errors');
const ENROLLMENT_ERRORS = require('../constants/errors/enrollment.errors');
const { Course, Enrollment, User } = require('../models');
const AppError = require('../utils/AppError');

const enroll = async(courseId, user) => {
    const course = await Course.findByPk(courseId);
    if(!course) {
        throw AppError.from(COURSE_ERRORS.NOT_FOUND);
    }
    if(!course.isPublished) {
        throw AppError.from(COURSE_ERRORS.NOT_PUBLISHED);
    }
    const isOwner = course.instructorId === user.id;
    if(isOwner) {
        throw AppError.from(ENROLLMENT_ERRORS.OWN_COURSE);
    }
    const enrollment = await Enrollment.findOne({ where: {courseId: course.id, userId: user.id} });
    if(enrollment) {
        if(enrollment.status === 'active' || enrollment.status === 'completed') {
            throw AppError.from(ENROLLMENT_ERRORS.ALREADY_ENROLLED);
        }
        // Прогресс не обнуляем, так как студент может начать с того места курс, с какого он отменил в прошлый раз
        // Поэтому обновляем только статус
        const updateEnrollment = await enrollment.update({ status: 'active' });
        return updateEnrollment.toJSON();
    } else {
        const newEnrollment = await Enrollment.create({ userId: user.id, courseId: course.id });
        return newEnrollment.toJSON();
    }
}

const getMy = async(user) => {
    const enrollments = await Enrollment.findAll({
        where: {
            userId: user.id
        },
        include: [{
            model: Course, as: 'course',
            include: [{ model: User, as: 'instructor', attributes: ['id', 'fullName', 'email'], }]
        }]
    });
    return enrollments;
}

// const updateProgress = async(id, progress, user) => {
//     const enrollment = await Enrollment.findByPk(id);
//     if(!enrollment) {
//         throw AppError.from(ENROLLMENT_ERRORS.NOT_FOUND);
//     }
//     const isOwner = enrollment.userId === user.id;
//     if(!isOwner) {
//         throw AppError.from(ENROLLMENT_ERRORS.NOT_OWNER);
//     }
//     if(enrollment.status === 'cancelled') {
//         throw AppError.from(ENROLLMENT_ERRORS.CANCELLED);
//     }
//     if(progress < 0 || progress > 100) {
//         throw AppError.from(ENROLLMENT_ERRORS.INVALID_PROGRESS);
//     }
//     if(!Number.isInteger(progress)) {
//         throw AppError.from(ENROLLMENT_ERRORS.INVALID_PROGRESS);
//     }
//     if(progress === 100) {
//         const updateEnrollment = await Enrollment.update({ status: 'completed' });
//         return updateEnrollment.toJSON();
//     }

// }

module.exports = { enroll, getMy }