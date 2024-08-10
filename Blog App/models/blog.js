const {DataTypes} = require("sequelize")
const sequelize = require("../data/db"); // database 
const { FORCE } = require("sequelize/lib/index-hints");


const Blog = sequelize.define('blog',{
    Title : {
        type : DataTypes.STRING,
        allowNull: false
    },
    SubTitle : {
        type : DataTypes.STRING,
        allowNull: false
    },
    Description : {
        type : DataTypes.TEXT,
        allowNull: true
    },
    Image : {
        type : DataTypes.STRING,
        allowNull: false
    },
    mainPage : {
        type : DataTypes.BOOLEAN,
        allowNull: false
    },
    isApproved : {
        type : DataTypes.BOOLEAN,
        allowNull: false
    }
})


// async function sync() {
//     await Blog.sync({force: true })  
// }
// sync();

module.exports = Blog;

