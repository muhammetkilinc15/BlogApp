const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth")
const csrf = require("../middlewares/csrf") // csrf için 

const adminController = require("../controllers/admin");

// ************************************** Blog Routes Settings **************************************
router.get("/blog/delete/:blogid",isAuth,csrf, adminController.get_blog_delete);
router.post("/blog/delete/:blogid", isAuth,adminController.post_blog_delete);

router.get("/blog/create",isAuth,csrf, adminController.get_blog_create);
router.post("/blog/create",isAuth, imageUpload.upload.single("resim"), adminController.post_blog_create);

router.get("/blogs/:blogid",isAuth, csrf,adminController.get_blog_edit);

router.post("/blogs/:blogid", isAuth,imageUpload.upload.single("resim"), adminController.post_blog_edit);
router.get("/blogs",isAuth,adminController.get_blogs);

// ************************************** Category Routes Settings **************************************
router.get("/category/delete/:categoryid",isAuth,csrf, adminController.get_category_delete);
router.post("/category/delete/:categoryid", isAuth,adminController.post_category_delete);

router.post("/categories/remove",isAuth, adminController.get_category_remove);

router.get("/category/create",isAuth,csrf, adminController.get_category_create);
router.post("/category/create",isAuth, adminController.post_category_create);

router.get("/categories/:categoryid",isAuth,csrf, adminController.get_category_edit);
router.post("/categories/:categoryid",isAuth, adminController.post_category_edit);

router.get("/categories",isAuth, adminController.get_categories);




module.exports = router;