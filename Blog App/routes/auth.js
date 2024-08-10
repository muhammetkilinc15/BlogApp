const express = require("express")
const router = express.Router();

const authController = require("../controllers/auth");

// Kayıt ol get - post metotları 
router.get("/register",authController.get_register)
router.post("/register",authController.post_register)


// Login işlemi için get - post
router.get("/login", authController.get_login);
router.post("/login", authController.post_login);



module.exports = router;