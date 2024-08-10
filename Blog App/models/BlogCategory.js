const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const Blog = require("./blog");
const Category = require("./category");

const BlogCategory = sequelize.define("blogCategory", {}, {
  timestamps: false,
});

Blog.belongsToMany(Category, { through: BlogCategory });
Category.belongsToMany(Blog, { through: BlogCategory });

module.exports = BlogCategory;

