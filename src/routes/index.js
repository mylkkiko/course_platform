const router = require('express').Router();
const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const courseRoutes = require('../routes/course.routes');
const lessonRoutes = require('../routes/lesson.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/lessons', lessonRoutes);

module.exports = router;