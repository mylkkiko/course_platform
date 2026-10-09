const ROLES = require('../constants/roles');
const { User, Course } = require('../models');
const AppError = require('../utils/AppError');
const USER_ERRORS = require('../constants/errors/user.errors');

const getAll = async({ role }) => {
    const where = {};
    if(role) {
        if(!Object.values(ROLES).includes(role)) { 
            throw AppError.from(USER_ERRORS.INVALID_ROLE);
        }
        where.role = role;
    }
    const data = await User.findAll({ where });
    return data;
}

const getById = async(id) => {
    const user = await User.findByPk(id);
    if(!user) {
        throw AppError.from(USER_ERRORS.NOT_FOUND);
    }
    if(user.role === ROLES.INSTRUCTOR) {
        const data = await User.findOne({
            where: {
                id: id
            },
            include: [{model: Course, as: 'courses'}]
        });
        return data;
    }
    if(user.role === ROLES.STUDENT) {
        const data = await User.findOne({
            where: {
                id: id
            },
            include: [{
                model: Course, 
                as: 'enrolledCourses',
                through: { attributes: ['status', 'progress'] }
            }]
        });
        return data;
    }
    return user;
}

const changeRole = async(id, role, currentUser) => {
    if(!Object.values(ROLES).includes(role)) {
        throw AppError.from(USER_ERRORS.INVALID_ROLE);
    }
    if(Number(id) === currentUser.id) {
        throw AppError.from(USER_ERRORS.CANNOT_CHANGE_OWN_ROLE);
    }
    const user = await User.findByPk(id);
    if(!user) {
        throw AppError.from(USER_ERRORS.NOT_FOUND);
    }
    await user.update({ role });
    return user;
}

const remove = async(id, currentUser) => {
    if(Number(id) === currentUser.id) {
        throw AppError.from(USER_ERRORS.CANNOT_DELETE_SELF);
    }
    const user = await User.findByPk(id);
    if(!user) {
        throw AppError.from(USER_ERRORS.NOT_FOUND);
    }
    await user.destroy();
}

module.exports = { getAll, getById, changeRole, remove };