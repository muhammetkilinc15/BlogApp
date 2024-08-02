// mysql ile veri tabanı baglantısı yapıldı
const mysql= require("mysql2");

// veri tabanı bilgileri config.js içinde saklandı
const config = require("../config")
const Sequelize  = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: 'localhost',
    dialect: 'mysql'
})

async function connect(){
    try{
        await sequelize.authenticate();
        console.log("Connected database with sequilize")
    }catch(err){
        console.log(err);
    }
}
connect();
module.exports  = sequelize;

// let connection = mysql.createConnection(config.db);

// connection.connect(function(err){
//     if(err){
//         return console.log(err);
//     }
//     console.log("The program connectted the database")
// });

// module.exports = connection.promise();

// promise , asyns-await => promise nedir 