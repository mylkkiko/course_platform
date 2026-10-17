const express = require('express');
const enrollmentController = require('../controllers/enrollment.controller');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const ROLES = require('../constants/roles');

router.get('/me', authenticate, authorize(ROLES.STUDENT), enrollmentController.getMy);
router.post('/', authenticate, authorize(ROLES.STUDENT), enrollmentController.enroll);
router.get('/', authenticate, authorize(ROLES.ADMIN), enrollmentController.getAll);
router.patch('/:id/progress', authenticate, authorize(ROLES.STUDENT), enrollmentController.updateProgress);
router.delete('/:id', authenticate, authorize(ROLES.ADMIN, ROLES.STUDENT), enrollmentController.cancel);

module.exports = router;
