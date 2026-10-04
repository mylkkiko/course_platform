const AUTH_ERRORS = {
    INVALID_CREDENTIALS: { statusCode: 401, message: 'Invalid email or password' },
    TOKEN_MISSING: { statusCode: 401, message: 'Missing token' },
    TOKEN_INVALID: { statusCode: 401, message: 'Invalid token' },
    TOKEN_EXPIRED: { statusCode: 401, message: 'Expired token' },
    FORBIDDEN: { statusCode: 403, message: 'You do not have sufficient rights to perform this action' }
};

module.exports = AUTH_ERRORS;
