const express = require("express");
const router = express.Router();
const db = require("../data/db");

// Bir kursa ait detaya gittik
router.get("/blogs/:blogid", async function (req, res) {
  const id = req.params.blogid;
  try {
    const [blog] = await db.execute("select * from blog where idblog=?", [id]);
    res.render("users/blog-details", {
      title: blog[0].title,
      blog : blog[0]
    });
  } catch (err) {
    console.log(err);
  }
});

// Tüm Kursları blogs sayfasında listeledik. async ve await ile kullandık
router.get("/blogs", async function (req, res) {
  try {
    const [blogs] = await db.execute("select * from blog where isApproved=1");
    const [categories] = await db.execute("select * from category");
    res.render("users/blogs", {
      title: "Tüm Kurslar",
      categories: categories,
      blogs: blogs,
    });
  } catch (err) {
    console.log(err);
  }
});

// Ana Sayfada Gerekli kursları listeledik
router.get("/", async function (req, res) {
  try {
    const [blogs] = await db.execute(
      "select * from blog where isApproved=1 and mainPage=1"
    );
    const [categories] = await db.execute("select * from category");
    res.render("users/index", {
      title: "Popüler Kurslar",
      categories: categories,
      blogs: blogs,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router; // Dışarıya açtık
