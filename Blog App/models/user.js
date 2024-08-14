const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const User = sequelize.define("User",{
    fullName : {
        type : DataTypes.STRING,
        allowNull:  false,
    },
    email : {
        type: DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    resetToken : {
        type : DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExperation : {
        type : DataTypes.STRING,
        allowNull: true
    }
}, {timestamps : true});

module.exports = User;