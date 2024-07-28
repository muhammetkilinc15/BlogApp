// mysql ile veri tabanı baglantısı yapıldı
const mysql= require("mysql2");

// veri tabanı bilgileri config.js içinde saklandı
const config = require("../config.js")



let connection = mysql.createConnection(config.db);

connection.connect(function(err){
    if(err){
        return console.log(err);
    }
    
    console.log("Everything is okey")
});

module.exports = connection.promise();

// promise , asyns-await => promise nedir 