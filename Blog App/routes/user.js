const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/blogs/:blogid", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/users", "blogs-detail.html"));
});

router.get("/blogs", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/users", "blogs.html"));
});

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/users", "index.html"));
});

module.exports = router; // Dışarıya açtık
