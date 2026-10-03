const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    fullName: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: { len: [2, 100] } 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate: {
            isEmail: true
        }
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'instructor', 'student'),
        defaultValue: 'student',
        allowNull: false
    }
},  {
    tableName: 'users',
    timestamps: true, 
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    },
    scopes: { 
        withPassword: {} 
    } 
})

module.exports = User;