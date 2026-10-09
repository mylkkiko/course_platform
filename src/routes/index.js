const router = require('express').Router();
const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;