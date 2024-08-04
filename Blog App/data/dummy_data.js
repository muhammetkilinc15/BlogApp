const Category = require("../models/category")
const Blog = require("../models/blog")

async function populate() {
    const count = await Category.count();
    if(count==0){
        await Category.bulkCreate([
            {Name : "Web Geliştirme"},
            {Name : "Mobil Geliştirme"},
            {Name : "Programlama"},
        ]);

        await Blog.create({
            Title : "  Python ile Sıfırdan İleri Seviye Python Programlama Eğitimi",
            SubTitle: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
            Description : "",
            Image: " sdfsdf",
            mainPage: true,
            isApproved: true 
        })
    }
}

module.exports =  populate;