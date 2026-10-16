const express = require('express');
const lessonController = require('../controllers/lesson.controller');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const ROLES = require('../constants/roles');

router.get('/:id', authenticate, lessonController.getLessonById);
router.put('/:id', authenticate, authorize(ROLES.INSTRUCTOR, ROLES.ADMIN), lessonController.update);
router.delete('/:id', authenticate, authorize(ROLES.INSTRUCTOR, ROLES.ADMIN), lessonController.remove);

module.exports = router;
