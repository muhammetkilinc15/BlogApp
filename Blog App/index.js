const express = require("express");

const app = express();

app.set("view engine", "ejs");

// body-parser
app.use(express.urlencoded({ extended: false }));

const path = require("path");


// Yönlendirme işlemlerinin yapıldığı yer
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");




app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/account/",authRoutes)
app.use(userRoutes); 

const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user")


// Veri tabanı ilişkileri burada ayarlanıyor
// One to many
Blog.belongsTo(User,{
    foreignKey : {
        allowNull : true
    }
});
User.hasMany(Blog);


Blog.belongsToMany(Category, { through: "blogCategories"});
Category.belongsToMany(Blog, { through: "blogCategories"});

(async () => {
    await sequelize.sync({ force: true });
    await dummyData();
})();

app.listen(5000, function() {
    console.log("listening on port 5000");
});