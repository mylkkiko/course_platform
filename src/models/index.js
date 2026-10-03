const Course  = require('./course.model');
const Lesson = require('./lesson.model');
const User = require('./user.model');
const Enrollment = require('./enrollment.model');

User.hasMany(Course, { as: 'courses', foreignKey: 'instructorId', onDelete: 'CASCADE' });
Course.belongsTo(User, { as: 'instructor', foreignKey: 'instructorId' });

Course.hasMany(Lesson, { as: 'lessons', onDelete: 'CASCADE', foreignKey: 'courseId',  });
Lesson.belongsTo(Course, { as: 'course', foreignKey: 'courseId' });

User.belongsToMany(Course, { through: Enrollment, as: 'enrolledCourses', foreignKey: 'userId', otherKey: 'courseId' });
Course.belongsToMany(User, { through: Enrollment, as: 'students', foreignKey: 'courseId', otherKey: 'userId' });

User.hasMany(Enrollment, { as: 'enrollments', foreignKey: 'userId', onDelete: 'CASCADE' })
Course.hasMany(Enrollment, { as: 'enrollments', foreignKey: 'courseId', onDelete: 'CASCADE' })

Enrollment.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Enrollment.belongsTo(Course, { as: 'course', foreignKey: 'courseId' });


module.exports = { Course, Lesson, User, Enrollment };