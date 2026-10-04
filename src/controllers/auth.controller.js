const asyncHandler = require('../utils/AsyncHandler');
const authService = require('../services/auth.service');

const register = asyncHandler(async(req, res) => {
    const { fullName, email, password } = req.body;
    const user = await authService.register({ fullName, email, password });
    res.status(201).json({ success: true, data: user });
});

module.exports = { register };