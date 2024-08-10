const { DataTypes } = require("sequelize");
const sequelize = require("../data/db"); // database

const Category = sequelize.define("category", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // createdAt ve updatedAt eklenmez
});

// async function sync() {
//   try {
//     await Category.sync({ force: true }); // 'force: true' olarak düzeltilmiş
//     console.log("Category tablosu başarıyla senkronize edildi.");
//   } catch (error) {
//     console.error("Kategori tablosu senkronize edilirken bir hata oluştu:", error);
//   }
// }

// sync();

module.exports = Category;
