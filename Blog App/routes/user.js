const express = require("express");
const router = express.Router();
const db = require("../data/db");

const data = {
    title: "Popüler Kurslar",
    categories: ["Web Geliştirme", "Programlama", "Mobil Uygulamalar", "Veri Analizi", "Ofis Uygulamaları"],
};


// Bir kursa ait detaya gittik
router.get("/blogs/:blogid", function (req, res) {
    res.render("users/blogs-detail", {
        blogid: req.params.blogid,
        blog :  req.params.blog
    });
});


// Tüm Kursları blogs sayfasında listeledik
router.get("/blogs", function (req, res) {
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


// Ana Sayfada Gerekli kursları listeledik
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
