const express = require("express");
const path = require("path");

const app = express();

// user router ekledik
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js")
app.use("/libs", express.static('node_modules')); // Bootstrap kullanmak
app.use("/static", express.static("public")); // Public klasörü


app.use("/admin",adminRoutes); // diyerek /admin uzantılı ile baslattık
app.use(userRoutes);


app.listen(3000, function() {
    console.log("Listening on port 3000");
});
