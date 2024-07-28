const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../data/db");

const data = {
    title: "Popüler Kurslar",
    categories: ["Web Geliştirme", "Programlama", "Mobil Uygulamalar", "Veri Analizi", "Ofis Uygulamaları"],
};

router.get("/blogs/:blogid", function (req, res) {
    // blogs-detail.ejs dosyasını render ederken gerekli verileri de ekleyin
    res.render("users/blogs-detail", {
        blogid: req.params.blogid
    });
});

router.get("/blogs", function (req, res) {
    // blogs.ejs dosyasını render ederken gerekli verileri de ekleyin
    db.execute("select * from blog")
        .then(result => {
            res.render("users/blogs", {
                title: "Tüm Kurslar",
                categories: data.categories,
                blogs: result[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/", function (req, res) {
    db.execute("select * from blog")
        .then(result => {
            res.render("users/index", {             
                title: "Popüler Kurslar",
                categories: data.categories,
                blogs: result[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router; // Dışarıya açtık
