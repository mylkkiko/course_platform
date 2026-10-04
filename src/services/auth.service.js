const AUTH_ERRORS = require('../constants/errors/auth.errors');
const AppError = require('../utils/AppError');
const { User } = require('../models');
const USER_ERRORS = require('../constants/errors/user.errors');
const bcrypt = require('bcrypt');

const register = async({fullName, email, password}) => {
    if(!password || password.length < 6) {
        throw AppError.from(USER_ERRORS.PASSWORD_TOO_SHORT);
    }
    const existing = await User.findOne({ where: { email } });
    if(existing) {
        throw AppError.from(USER_ERRORS.EMAIL_EXISTS);
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hash });
    const { password: _, ...safeUser } = user.toJSON();
    return safeUser;
}

module.exports = { register };