const USER_ERRORS = {
    NOT_FOUND: { statusCode: 404, message: 'User not found' },
    EMAIL_EXISTS: { statusCode: 409, message: 'User with this email already exists' },
    INVALID_ROLE: { statusCode: 400, message: 'Invalid role' }, 
    CANNOT_CHANGE_OWN_ROLE: { statusCode: 400, message: 'You cannot change your own role' },
    CANNOT_DELETE_SELF: { statusCode: 400, message: 'You cannot delete your own account' },
}

module.exports = USER_ERRORS;