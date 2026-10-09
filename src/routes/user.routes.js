const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const ROLES = require('../constants/roles');

router.use(authenticate, authorize(ROLES.ADMIN));
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.patch('/:id/role', userController.changeRole);
router.delete('/:id', userController.remove);

module.exports = router;