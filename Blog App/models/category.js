const { DataTypes } = require("sequelize");
const sequelize = require("../data/db"); // database
const { name } = require("ejs");

const Category = sequelize.define("category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // created and updated eklenmez
  }
);

async function sync() {
  await Category.sync({ alter: true });
}
sync();
module.exports = Category;
