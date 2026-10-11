const { sequelize, ensureDatabaseExists } = require('./config/database');
const bcrypt = require('bcrypt');
const ROLES = require('./constants/roles');
const { User, Course, Lesson,  } = require('./models');

const start = async() => {
    try {
        await ensureDatabaseExists();
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log('Database connected');
        const hash = await bcrypt.hash('123456', 10);
        const firstUsers = await User.bulkCreate([
            {
                fullName: "First admin",
                email: "admin@test.com",
                role: ROLES.ADMIN,
                password: hash
            },
            {
                fullName: "First student",
                email: "student@test.com",
                role: ROLES.STUDENT,
                password: hash
            },
            {
                fullName: "First instructor",
                email: "instructor@test.com",
                role: ROLES.INSTRUCTOR,
                password: hash
            },
        ], { validate: true });

        const instructor = firstUsers.find((user) => user.role === ROLES.INSTRUCTOR);

        const firstCourses = await Course.bulkCreate([
            {
                title: "Node.js Basics",
                description: "Learn the fundamentals of Node.js and build your first server.",
                category: "Programming",
                level: "beginner",
                price: 0,
                isPublished: true,
                instructorId: instructor.id
            },
            {
                title: "REST API with Express",
                description: "Design and build a REST API with Express, Sequelize and JWT.",
                category: "Programming",
                level: "intermediate",
                price: 49.99,
                isPublished: true,
                instructorId: instructor.id
            },
            {
                title: "UI Design Fundamentals",
                description: "Core principles of layout, color and typography for interfaces.",
                category: "Design",
                level: "beginner",
                price: 29.99,
                isPublished: false,
                instructorId: instructor.id
            }
        ], { validate: true });

        const [nodeCourse, expressCourse, designCourse] = firstCourses;

        const firstLessons = await Lesson.bulkCreate([
            {
                title: "What is Node.js",
                content: "Overview of Node.js, its runtime and where it is used.",
                videoUrl: "https://example.com/videos/node-intro",
                duration: 10,
                order: 1,
                courseId: nodeCourse.id, 
            },
            {
                title: "Modules and npm",
                content: "How to split code into modules and install packages with npm.",
                videoUrl: "https://example.com/videos/node-modules",
                duration: 15,
                order: 2,
                courseId: nodeCourse.id, 
            },
            {
                title: "Your First Server",
                content: "Create a simple HTTP server and handle a request.",
                duration: 20,
                order: 3,
                courseId: nodeCourse.id,
            },
            {
                title: "Routing in Express",
                content: "Define routes, read params, query and body.",
                videoUrl: "https://example.com/videos/express-routing",
                duration: 15,
                order: 1,
                courseId: expressCourse.id, 
            },
            {
                title: "Middleware",
                content: "How middleware works and how to write your own.",
                videoUrl: "https://example.com/videos/express-middleware",
                duration: 20,
                order: 2,
                courseId: expressCourse.id, 
            },
            {
                title: "Authentication with JWT",
                content: "Register, login and protect routes with tokens.",
                duration: 25,
                order: 3,
                courseId: expressCourse.id, 
            },
            {
                title: "Layout and Spacing",
                content: "Grids, alignment and whitespace in interface design.",
                videoUrl: "https://example.com/videos/ui-layout",
                duration: 12,
                order: 1,
                courseId: designCourse.id, 
            },
            {
                title: "Color and Typography",
                content: "Choosing a palette and readable fonts.",
                duration: 18,
                order: 2,
                courseId: designCourse.id, 
            },
        ], { validate: true });

        firstUsers.forEach((user) => {
            console.log(user.email);
            console.log('123456');
        });

        await sequelize.close();
        process.exit(0);
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

start();