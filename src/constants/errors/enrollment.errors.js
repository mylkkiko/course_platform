const ENROLLMENT_ERRORS = {
    NOT_FOUND: { statusCode: 404, message: 'Enrollment not found' },
    ALREADY_ENROLLED: { statusCode: 409, message: 'The enrollment already exists' },
    OWN_COURSE: { statusCode: 400, message: 'You cannot enroll in your own course' },
    INVALID_PROGRESS: { statusCode: 400, message: 'Progress must be between 0 and 100' },
    CANCELLED: { statusCode: 400, message: 'Cancelled enrollment cannot be updated' },
    NOT_OWNER: { statusCode: 403, message: 'You can only manage your own enrollments' },
}

module.exports = ENROLLMENT_ERRORS;