const jwt = require('jsonwebtoken');
const { jwtSecret, expiresIn } = require('../config/env');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        jwtSecret,
        { expiresIn: expiresIn }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
};

module.exports = { generateToken, verifyToken };