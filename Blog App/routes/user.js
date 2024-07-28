const express = require("express");
const router = express.Router();
const db = require("../data/db");


// Kategorilere ait kurslar getirildi
router.use("/blogs/category/:idCategory", async (req, res) => {
  const id = req.params.idCategory;
  try {
    const [blogs] = await db.execute("select * from blog where categoryId=?",[id]);
    const [categories] = await db.execute("select * from category");
    res.render("users/blogs", {
      title: "Tüm Kurslar",
      categories: categories,
      blogs: blogs,
      selectedCategory:id
    });
  } catch (err) {
    console.log(err);
  }

});

// Bir kursa ait detaya gittik
router.get("/blogs/:blogid", async function (req, res) {
  const id = req.params.blogid;
  try {
    const [blogs] = await db.execute("select * from blog where idblog=?", [id]);
    const blog = blogs[0];

    if (blog) {
      return res.render("users/blog-details", {
        title: blog.title,
        blog: blog,
      });
    }
    res.redirect("/error");
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
      selectedCategory:null
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
      selectedCategory:null
    });
  } catch (err) {
    console.log(err);
  }
});

// error route
router.get("/error", function (req, res) {
  res.render("../Views/Error/error", { title: "Error" });
});

module.exports = router; // Dışarıya açtık
