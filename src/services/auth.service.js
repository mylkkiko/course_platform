const AUTH_ERRORS = require('../constants/errors/auth.errors');
const AppError = require('../utils/AppError');
const { User } = require('../models');
const USER_ERRORS = require('../constants/errors/user.errors');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

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

const login = async({email, password}) => {
    if(!email || !password) {
        throw AppError.from(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if(!user || !(await bcrypt.compare(password, user.password))) {
        throw AppError.from(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
    const token = generateToken(user);
    const safeUser = { id: user.id, fullName: user.fullName, email: user.email, role: user.role };
    return { token, user: safeUser };
}

module.exports = { register, login };