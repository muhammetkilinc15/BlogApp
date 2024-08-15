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

// Şifre Sıfırlama işlemleri
router.get("/reset-password", csrf,authController.get_reset);
router.post("/reset-password", authController.post_reset);

// Yeni Şifre Girme Ekranı
router.get("/new-password/:token", csrf ,authController.get_newpassword);
router.post("/new-password", authController.post_newpassword);

router.get("/logout",csrf,authController.get_logout)

module.exports = router;