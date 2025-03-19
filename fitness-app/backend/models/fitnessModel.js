const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Fitness = sequelize.define('Fitness', {
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
    steps: { type: DataTypes.INTEGER, allowNull: false },
    waterDrink: { type: DataTypes.FLOAT, allowNull: false },
    otherDiet: { type: DataTypes.STRING }
}, { timestamps: true });

Fitness.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Fitness, { foreignKey: 'userId' });

module.exports = Fitness;
