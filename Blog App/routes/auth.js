const express = require("express")
const router = express.Router();

const authController = require("../controllers/auth");
const csrf = require("../middlewares/csrf")


// Kayıt ol get - post metotları 
router.get("/register",csrf,authController.get_register)
router.post("/register",authController.post_register)


// Login işlemi için get - post
router.get("/login",csrf, authController.get_login);
router.post("/login", authController.post_login);

// Auth işlemleri

router.get("/logout",csrf,authController.get_logout)

module.exports = router;