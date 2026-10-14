const express = require('express');
const courseController = require('../controllers/course.controller');
const router = express.Router();
const { authenticate, authorize, optionalAuthenticate } = require('../middlewares/auth.middleware');
const ROLES = require('../constants/roles');

router.get('/', courseController.getAll);
router.get('/my', authenticate, authorize(ROLES.INSTRUCTOR), courseController.getMy);
router.get('/:id', optionalAuthenticate, courseController.getById);
router.post('/', authenticate, authorize(ROLES.INSTRUCTOR, ROLES.ADMIN), courseController.create);
router.put('/:id', authenticate, authorize(ROLES.INSTRUCTOR, ROLES.ADMIN), courseController.update);
router.delete('/:id', authenticate, authorize(ROLES.INSTRUCTOR, ROLES.ADMIN), courseController.remove);
router.get('/:id/students', authenticate, authorize(ROLES.INSTRUCTOR, ROLES.ADMIN), courseController.getStudents);

module.exports = router;