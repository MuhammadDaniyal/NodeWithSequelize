const { DataTypes } = require('sequelize');
const sequelize = require('../../db/index')

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        // This way, the current date/time will be used to populate this column (at the moment of insertion)
        defaultValue: DataTypes.NOW
        // allowNull defaults to true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
    tableName: "users",

    // creadtedAt, updatedAt
    timestamps: true,

    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updated_At'
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User