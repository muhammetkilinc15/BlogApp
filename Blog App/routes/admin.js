const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../data/db");

const imageUpload = require("../helpers/image-upload");

const adminController = require("../controllers/adminController");

//! ########################## Category Operations ##########################
// ************************************** Remove Category **************************************
router.get(
  "/categories/delete/:categoryId",
  adminController.get_category_delete
);

router.post(
  "/categories/delete/:categoryId",
  adminController.post_category_delete
);

// ************************************** Create Category **************************************

router.get("/category/create", adminController.get_category_create);

router.post("/category/create", adminController.post_category_create);

// ************************************** Edit Category **************************************
router.get("/categories/:categoryId", adminController.get_category_edit);

router.post("/categories/:categoryId", adminController.post_category_edit);

// ************************************** List Category **************************************
router.get("/categories", adminController.get_category_list);

//! ########################## Blog Operations ##########################

// ************************************** Remove Blog **************************************

router.get("/blog/delete/:blogid",adminController.get_blog_delete );

router.post("/blog/delete/:blogid",adminController.post_blog_delete );

// ************************************** Create New Blog **************************************
router.get("/blog/create",adminController.get_blog_create );

router.post("/blog/create",imageUpload.upload.single("Image"),adminController.post_blog_create
);

// ************************************** Edit Blog **************************************
router.get("/blogs/:blogid",adminController.get_blog_edit );

router.post("/blogs/:blogid",imageUpload.upload.single("Image"),adminController.post_blog_edit
);

// ************************************** Blog List **************************************
router.get("/blogs",adminController.get_blog_list );

module.exports = router; // Dışarıya açtık
