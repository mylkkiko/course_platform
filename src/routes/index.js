const router = require('express').Router();
const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const courseRoutes = require('../routes/course.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);

module.exports = router;