const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/user'); // user.js dosyanızı dahil edin

// formlardan gelen veriler için gerekli
app.use(express.urlencoded({extended:false}));


// Görünüm motorunu ayarlayın
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Orta katmanlar ve yönlendiriciler
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRouter); // userRouter'ı kullanın


// user router ekledik
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js");
app.use("/libs", express.static('node_modules')); // Bootstrap kullanmak
app.use("/static", express.static("public")); // Public klasörü


app.use("/admin",adminRoutes); // diyerek /admin uzantılı ile baslattık
app.use(userRoutes);
//app.use(adminRoutes)


const sequelize = require("./data/db.js")
const dumyData = require("./data/dummy_data.js")
const Blog = require('./models/blog');
const Category = require('./models/category');
const BlogCategory = require("./models/BlogCategory.js");
const { FORCE } = require('sequelize/lib/index-hints');

// İlişkiler

// One-to-Many ilişki tanımlamaları

      // Category.hasMany(Blog, {
      //   foreignKey: {
      //       allowNull: false
      //   }
      // });
      // Blog.belongsTo(Category, {
      //   foreignKey: {
      //       allowNull: false
      //   }
      // });

// Many-to-Many ilişki tanımlamaları
 Blog.belongsToMany(Category, { through: BlogCategory });
 Category.belongsToMany(Blog, { through: BlogCategory });


// Veritabanı senkronizasyonu
(async () => {
    await sequelize.sync({ force: true });
    try{
      // await dummyData();
    }catch(e){
      console.log(e)
    }
      
})();






// Sunucuyu başlatın
app.listen(3000, () => {
  console.log('Listening on port 3000');
});



