const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");
const isAdmin = require("../middlewares/is-admin")

const csrf = require("../middlewares/csrf") // csrf için 

const adminController = require("../controllers/admin");
const isModerator = require("../middlewares/is-moderator");

// ************************************** Blog Routes Settings **************************************
router.get("/blog/delete/:blogid",isModerator,csrf, adminController.get_blog_delete);
router.post("/blog/delete/:blogid", isModerator,adminController.post_blog_delete);

router.get("/blog/create",isModerator,csrf, adminController.get_blog_create);
router.post("/blog/create",isModerator, imageUpload.upload.single("resim"), adminController.post_blog_create);

router.get("/blogs/:blogid",isModerator, csrf,adminController.get_blog_edit);

router.post("/blogs/:blogid", isModerator,imageUpload.upload.single("resim"), adminController.post_blog_edit);
router.get("/blogs",isModerator,adminController.get_blogs);

// ************************************** Category Routes Settings **************************************
router.get("/category/delete/:categoryid",isAdmin,csrf, adminController.get_category_delete);
router.post("/category/delete/:categoryid", isAdmin,adminController.post_category_delete);

router.post("/categories/remove",isAdmin, adminController.get_category_remove);

router.get("/category/create",isAdmin,csrf, adminController.get_category_create);
router.post("/category/create",isAdmin, adminController.post_category_create);

router.get("/categories/:categoryid",isAdmin,csrf, adminController.get_category_edit);
router.post("/categories/:categoryid",isAdmin, adminController.post_category_edit);

router.get("/categories",isAdmin, adminController.get_categories);

// ************************************** UserRoles Routes Settings **************************************

router.get("/roles/:roleid", isAdmin, csrf, adminController.get_role_edit);
router.post("/roles", isAdmin, adminController.post_role_edit);

router.post("/roles/remove",isAdmin,csrf, adminController.roles_remove);
router.get("/roles/",isAdmin,csrf, adminController.get_roles);


router.get("/users",isAdmin,adminController.get_user)
router.get("/users/:userid",isAdmin,csrf,adminController.get_user_edit)
router.post("/users/:userid",isAdmin,csrf,adminController.post_user_edit)
module.exports = router;