const asyncHandler = require('../utils/AsyncHandler.js');
const userService = require('../services/user.service');

const getAll = asyncHandler(async (req, res) => {
    const role = req.query.role;
    const users = await userService.getAll({ role });
    res.status(200).json({ success: true, data: users });
});

const getById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await userService.getById(id);
    res.status(200).json({ success: true, data: user });
});

const changeRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const role = req.body.role;
    const user = req.user;
    const updateUser = await userService.changeRole(id, role, user);
    res.status(200).json({ success: true, data: updateUser });
});

const remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    await userService.remove(id, user);
    res.status(200).json({ success: true, data: null });
})

module.exports = { getAll, getById, changeRole, remove };