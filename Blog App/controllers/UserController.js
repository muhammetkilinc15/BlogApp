const Blog = require("../models/blog");
const Category = require("../models/category");

exports.blog_by_category = async (req, res) => {
  const id = req.params.idCategory;
  try {
    const blogs = await Blog.findAll({
      where: {
       isApproved : true
      },
      include : {
        model : Category,
        where : {id : id}
      }
    });
    const categories = await Category.findAll();
    res.render("users/blogs", {
      title: "Tüm Kurslar",
      categories: categories,
      blogs: blogs,
      selectedCategory: id,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.blogs_details = async function (req, res) {
  const id = req.params.blogid;
  try {
    const blog = await Blog.findByPk(id);

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
};

exports.blog_list = async (req, res) => {
  try {
    // Blog ve kategori verilerini veritabanından çekin
    const blogs = await Blog.findAll();
    const categories = await Category.findAll();

    // Verileri şablona gönderin
    res.render("users/blogs", {
      title: "Tüm Bloglar", // Sayfa başlığı
      categories: categories, // Tüm kategoriler
      blogs: blogs, // Tüm bloglar
      selectedCategory: null, // Seçili kategori (yok)
    });
  } catch (err) {
    // Hata durumunda hata mesajını konsola yazdırın
    console.error(err);
    // Kullanıcıya hata sayfası veya mesaj gösterin
    res
      .status(500)
      .send("An error occurred while fetching blogs and categories.");
  }
};

exports.index = async function (req, res) {
  try {
    const blogs = await Blog.findAll({
      where: {
        mainPage: 1,
        isApproved: 1,
      },
    });
    const categories = await Category.findAll({
      raw: true,
    });
    res.render("users/index", {
      title: "Popüler Kurslar",
      categories: categories,
      blogs: blogs,
      selectedCategory: null,
    });
  } catch (err) {
    console.log(err);
  }
};
