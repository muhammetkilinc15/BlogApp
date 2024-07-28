const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/user'); // user.js dosyanızı dahil edin

// Görünüm motorunu ayarlayın
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Orta katmanlar ve yönlendiriciler
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRouter); // userRouter'ı kullanın




// user router ekledik
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js")
app.use("/libs", express.static('node_modules')); // Bootstrap kullanmak
app.use("/static", express.static("public")); // Public klasörü


app.use("/admin",adminRoutes); // diyerek /admin uzantılı ile baslattık
app.use(userRoutes);





// Sunucuyu başlatın
app.listen(3000, () => {
  console.log('Listening on port 3000');
});



