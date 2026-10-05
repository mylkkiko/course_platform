const asyncHandler = require('../utils/AsyncHandler');
const authService = require('../services/auth.service');

const register = asyncHandler(async(req, res) => {
    const { fullName, email, password } = req.body;
    const user = await authService.register({ fullName, email, password });
    res.status(201).json({ success: true, data: user });
});

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });
    res.status(200).json({ success: true, data: user });
});

const me = (req, res) => {
    res.status(200).json({ data: req.user });
}

module.exports = { register, login, me };