const {db} = require('./env');
const {Sequelize} = require('sequelize');
const { Client } = require('pg');

const ensureDatabaseExists = async() => {
    const client = new Client({...db, database: db.database});
    try {
        await client.connect();
        const result = await client.query('SELECT 1 FROM pg_database WHERE datname=$1', [db.name]);
        if(result.rows.length === 0) {
            console.log(`database ${db.name} does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${db.name}"`);
            console.log(`Database ${db.name} created`);
        }
    } finally{
        await client.end();
    }
}

const sequelize = new Sequelize(
    db.name,
    db.user,
    db.password, 
    {
        host: db.host,
        port: db.port,
        dialect: 'postgres',
        logging: console.log,
    },
);

module.exports = {ensureDatabaseExists, sequelize};