const AUTH_ERRORS = require('../constants/errors/auth.errors');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/AsyncHandler');
const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

const authenticate = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        throw AppError.from(AUTH_ERRORS.TOKEN_MISSING);
    }
    const token = header.split(' ')[1];
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if(!user) {
        throw AppError.from(AUTH_ERRORS.TOKEN_INVALID);
    }
    req.user = user;
    next();
})

module.exports = { authenticate };