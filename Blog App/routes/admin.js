const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../data/db");

const imageUpload = require("../helpers/image-upload")

const fs = require("fs"); // Deleted file 

                    //! ########################## Category Operations ##########################
// ************************************** Remove Category **************************************

router.get("/categories/delete/:categoryId", async (req, res) => {
  const categorId = req.params.categoryId;
  try {
    const [categories] = await db.execute(
      "select * from category where idCategory=?",
      [categorId]
    );
    const category = categories[0];

    res.render("admin/category-remove", {
      title: "Delete Category",
      category: category,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/categories/delete/:categoryId", async (req, res) => {
  try {
    const categoryId = req.body.idCategory;
    await db.execute("Delete from category where idCategory=?", [categoryId]);
    return res.redirect("/admin/categories?action=delete");
  } catch (err) {
    console.log(err);
  }
});

// ************************************** Create Category **************************************

router.get("/category/create", async function (req, res) {
  try {
    res.render("admin/category-create", {
      title: "Add category",
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/category/create", async function (req, res) {
  const name = req.body.Name;
  try {
    await db.execute("insert into category (Name) values(?)", [name]);
    return res.redirect("/admin/categories?action=create");
  } catch (err) {
    console.log(err);
  }
});

// ************************************** Edit Category **************************************
router.get("/categories/:categoryId", async (req, res) => {
  try {
    const categorId = req.params.categoryId;
    const [categroies] = await db.execute("select * from category where idCategory=?", [
      categorId,
    ]);
    const category = categroies[0];
    if (category) {
      return res.render("admin/category-edit", {
        title: "Edit Category",
        category: category,
      });
    }
  } catch (err) {
    console.log(err);
  }
});


router.post("/categories/:categoryId",async (req,res)=>{
    try{
        const categorId = req.body.categoryId;
        const Name = req.body.Name;
        await db.execute("Update category set Name=? where idCategory=?",[Name,categorId]);
        return res.redirect("/admin/categories?action=edit")


    }catch(err){
        console.log(err);
    }

})

// ************************************** List Category **************************************
router.get("/categories", async (req, res) => {
  try {
    const [categories] = await db.execute("select * from category");
    res.render("admin/category-list", {
      title: "category-list",
      categories: categories,
      action: req.query.action,
    });
  } catch (err) {
    console.log(err);
  }
});

                      //! ########################## Blog Operations ##########################

// ************************************** Remove Blog **************************************

router.get("/blog/delete/:blogid", async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const [blogs] = await db.execute("select * from blog where idblog=?", [
      blogid,
    ]);
    const blog = blogs[0];

    res.render("admin/blog-remove", {
      title: "Delete Blog",
      blog: blog,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/blog/delete/:blogid", async (req, res) => {
  try {
    const blogid = req.body.idblog;
    await db.execute("Delete from blog where idblog=?", [blogid]);
    return res.redirect("/admin/blogs?action=delete");
  } catch (err) {
    console.log(err);
  }
});

// ************************************** Create New Blog **************************************
router.get("/blog/create", async function (req, res) {
  try {
    const [category] = await db.execute("select * from category");

    res.render("admin/blog-create", {
      title: "Add blog",
      categories: category,
    });
  } catch (e) {
    console.log(e);
  }
});


router.post("/blog/create", imageUpload.upload.single("Image"),async function (req, res) {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const description = req.body.Description;
  const image = req.file.filename;
  const category = req.body.category;
  const mainPage = req.body.mainPage == "on" ? 1 : 0;
  const isApproved = req.body.isApproved == "on" ? 1 : 0;
  try {
    await db.execute(
      "insert into blog (Title,Description,Image,mainPage,isApproved,categoryId,SubTitle) values(?,?,?,?,?,?)",
      [title, description, image, mainPage, isApproved, category,subtitle]
    );
    res.redirect("/admin/blogs?action=create");
  } catch (err) {
    console.log(err);
  }
});

// ************************************** Edit Blog **************************************
router.get("/blogs/:blogid", async (req, res) => {
  try {
    const blogid = req.params.blogid;
    const [blogs] = await db.execute("select * from blog where idblog=?", [
      blogid,
    ]);
    const [categories] = await db.execute("select * from category");
    const blog = blogs[0];

    if (blog) {
      return res.render("admin/blog-edit", {
        title: blog.title,
        blog: blog,
        categories: categories,
      });
    }
    res.redirect("admin/blog-edit");
  } catch (err) {
    console.log(err);
  }
});

router.post("/blogs/:blogid",imageUpload.upload.single("Image") , async (req, res) => {
  const idblog = req.body.idblog;
  const title = req.body.Title;
  const subtitle = req.body.SubTitle;
  const description = req.body.Description;
  let image = req.body.Image;
  const category = req.body.category;
  const mainPage = req.body.mainPage == "on" ? 1 : 0;
  const isApproved = req.body.isApproved == "on" ? 1 : 0;
  // if user select a picture, change the your picture path
    if(req.file){
      image = req.file.filename
      fs.unlink("./public/images/" + req.body.Image, err=>{
        console.log(err);
      })
    }

  try {
    await db.execute(
      "update blog set Title=?,Description=?,Image=?,categoryId=?,mainPage=?,isApproved=?,SubTitle=? where idblog=?",
      [title, description, image, category, mainPage, isApproved, subtitle,idblog]
    );
    return res.redirect("/admin/blogs?action=edit");
  } catch (err) {
    console.log(err);
  }
});

// ************************************** Blog List **************************************
router.get("/blogs", async function (req, res) {
  try {
    const [blogs] = await db.execute("select * from blog");
    res.render("admin/blog-list", {
      title: "Blog-List",
      blogs: blogs,
      action: req.query.action
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router; // Dışarıya açtık
