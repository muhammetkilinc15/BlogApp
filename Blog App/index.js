// express
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser")
const session = require("express-session");
const sequelizeStore  = require("connect-session-sequelize")(session.Store);
const csurf = require("csurf")

// routers
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// node modules 
const path = require("path");


// custom modules 
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const locals = require("./middlewares/locals")
// template enginee
app.set("view engine", "ejs");


// models 
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");
const Role = require("./models/role");


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret : "hello world",
    resave: false, // değişiklik yapınca session güncellenir
    saveUninitialized : false ,
    cookie:{
        maxAge : 1000 * 60 * 60 * 24
    },
    store : new sequelizeStore({
        db : sequelize
    })  
}));

app.use(locals);
app.use(csurf()) // her yerde kullanmak istemediğimiz içn



app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/account/",authRoutes)
app.use(userRoutes); 



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


User.belongsToMany(Role, { through: "userRoles" });
Role.belongsToMany(User, { through: "userRoles" });





// (async () => {
//     await sequelize.sync({ force: true });
//     await dummyData();
// })();

app.listen(5000, function() {
    console.log("listening on port 5000");
});