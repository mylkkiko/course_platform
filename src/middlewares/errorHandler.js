const AUTH_ERRORS = require('../constants/errors/auth.errors');
const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
    const error = new AppError('Route not found', 404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';

    if(err.isOperational) {
        statusCode = err.statusCode;
        message = err.message;
    } else if(err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409;
        message = err.errors.map(e => e.message).join(', ');
    } else if(err.name === 'SequelizeValidationError') {
        statusCode = 400;
        message = err.errors.map(e => e.message).join(', ');
    } else if(err.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 400;
        message = 'insert or update on table violates foreign key constraint';
    } else if(err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = AUTH_ERRORS.TOKEN_EXPIRED.message;
    } else if(err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = AUTH_ERRORS.TOKEN_INVALID.message;
    } else if(err.type === 'entity.parse.failed') {
        statusCode = 400;
        message = 'Invalid JSON in request body';
    } else {
        console.error(err);
    }
    res.status(statusCode).json({success: false, statusCode, message });
};


module.exports = { notFound, errorHandler };