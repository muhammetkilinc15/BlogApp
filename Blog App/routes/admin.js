const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../data/db");

const imageUpload = require("../helpers/image-upload");

const fs = require("fs"); // Deleted file

const Blog = require("../models/blog");
const Category = require("../models/category");
const { where } = require("sequelize");

//! ########################## Category Operations ##########################
// ************************************** Remove Category **************************************
router.get("/categories/delete/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    // `await` anahtar kelimesini kullanarak veriyi çekiyoruz
    const category = await Category.findByPk(categoryId);

    // `category` değişkeni null olabilir, bu yüzden bir kontrol ekledik
    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("admin/category-remove", {
      title: "Delete Category",
      category: category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/categories/delete/:categoryId", async (req, res) => {
  const categoryId = req.body.id;
  try {
    const deleted = await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    if (deleted) {
      return res.redirect("/admin/categories?action=delete");
    } else {
      return res.status(404).send("Category not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
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
    await Category.create({ Name: name });
    return res.redirect("/admin/categories?action=create");
  } catch (err) {
    console.log(err);
  }
});

// ************************************** Edit Category **************************************
router.get("/categories/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findByPk(categoryId);
    if (category) {
      return res.render("admin/category-edit", {
        title: "Edit Category",
        category: category,
      });
    } else {
      return res.status(404).send('Category not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


router.post("/categories/:categoryId", async (req, res) => {
  try {
    const categoryId = req.body.id; // `req.params.categoryId` yerine `req.body.id` 
    const Name = req.body.Name;

    // `update` metodunu doğru şekilde kullanmalısınız
    const updated = await Category.update(
      { Name: Name },
      { where: { id: categoryId } }
    );

    if (updated) {
      return res.redirect("/admin/categories?action=edit");
    } else {
      return res.status(404).send('Category not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


// ************************************** List Category **************************************
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
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
    const blog = await Blog.findByPk(blogid);
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
    const blogid = req.body.id;
    const deleted = await Blog.destroy({
      where:{
        id : blogid
      }
    })
    if (deleted) {
      return res.redirect("/admin/blogs?action=delete");
    } else {
      return res.status(404).send("Blog not found");
    }
   
  } catch (err) {
    console.log(err);
  }
});

// ************************************** Create New Blog **************************************
router.get("/blog/create", async function (req, res) {
  try {
    const categories = await Category.findAll();

    res.render("admin/blog-create", {
      title: "Add blog",
      categories: categories,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post(
  "/blog/create",
  imageUpload.upload.single("Image"),
  async function (req, res) {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const description = req.body.Description;
    const image = req.file.filename;
    const category = req.body.category;
    const mainPage = req.body.mainPage == "on" ? 1 : 0;
    const isApproved = req.body.isApproved == "on" ? 1 : 0;
    console.log(category);
    try {
      await Blog.create({
        Title: title,
        SubTitle: subtitle,
        Description: description,
        Image: image,
        mainPage: mainPage,
        isApproved: isApproved,
        categoryId: category,
      });

      res.redirect("/admin/blogs?action=create");
    } catch (err) {
      console.log(err);
    }
  }
);

// ************************************** Edit Blog **************************************
router.get("/blogs/:blogid", async (req, res) => {
  try {
    const blogid = req.params.blogid;
    const blog = await Blog.findByPk(blogid);
    const categories = await Category.findAll();
    console.log(blog.categoryId)
    if (blog && categories) {
      return res.render("admin/blog-edit", {
        title: blog.title,
        blog: blog,
        categories: categories,
      });
    }
    return res.redirect("admin/blog-edit");
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/blogs/:blogid",
  imageUpload.upload.single("Image"),
  async (req, res) => {
    const blogId = req.body.id;
    const title = req.body.Title;
    const subtitle = req.body.SubTitle;
    const description = req.body.Description;
    let image = req.body.Image; // Varsayılan olarak eski resim
    const categoryId = req.body.category;
    const mainPage = req.body.mainPage == "on" ? 1 : 0;
    const isApproved = req.body.isApproved == "on" ? 1 : 0;

    // Yeni resim yüklenmişse, image'ı güncelle
    if (req.file) {
      image = req.file.filename;

      // Eski resmi sil
      fs.unlink("./public/images/" + req.body.Image, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    try {
      // Blog'u güncelleme
      await Blog.update(
        {
          Title: title,
          Description: description,
          Image: image,
          categoryId: categoryId,
          mainPage: mainPage,
          isApproved: isApproved,
          SubTitle: subtitle,
        },
        { where: { id: blogId } }
      );

      // Güncelleme başarılıysa yönlendirme yap
      return res.redirect("/admin/blogs?action=edit");
    } catch (err) {
      console.log(err);
      // Hata durumunda bir hata sayfasına veya bir mesajla kullanıcıyı bilgilendirin
      res.status(500).send("An error occurred while updating the blog.");
    }
  }
);

// ************************************** Blog List **************************************
router.get("/blogs", async function (req, res) {
  try {
    const blogs = await Blog.findAll();
    res.render("admin/blog-list", {
      title: "Blog-List",
      blogs: blogs,
      action: req.query.action,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router; // Dışarıya açtık
