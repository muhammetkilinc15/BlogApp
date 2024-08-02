const {DataTypes} = require("sequelize")
const sequelize = require("../data/db") // database 


const Blog = sequelize.define('blog',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
    },
    categoryId :{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


async function sync() {
    await Blog.sync({alter: true })  
}
sync();
module.exports = Blog;
