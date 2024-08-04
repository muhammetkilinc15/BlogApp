const express = require("express");
const router = express.Router();
const db = require("../data/db");

const userController = require("../controllers/UserController");


// ************************************** Get Course with by Category **************************************
router.use("/blogs/category/:idCategory", userController.blog_by_category);

// ************************************** Go to Course Detail with its id **************************************
router.get("/blogs/:blogid", userController.blogs_details);

// ************************************** All Course Listed **************************************
router.get("/blogs", userController.blog_list);

// ************************************** Listed Couse for Main Page **************************************
router.get("/", userController.index);

// ************************************** Error Page **************************************
router.get("/error", function (req, res) {
  res.render("../Views/Error/error", 
    { title: "Error" }
  );
});

module.exports = router; // Dışarıya açtık
