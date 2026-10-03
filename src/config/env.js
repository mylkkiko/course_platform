require('dotenv').config({quiet: true});

module.exports = {
    port: process.env.PORT,
    db: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        name: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DEFAULT
    }
};