const express = require("express");
const router = express.Router();
const path = require("path");

// admin klasörü altındaki blog-create.html sayfa yönlendirme
router.get("/blog/create",function(req,res){
    res.sendFile(path.join(__dirname,"../views/admin/","blog-create.html"))
})


// :blogid dedik mi bir değişken olarak algılar.
router.get("/blogs/:blogid",function(req,res){
    res.sendFile(path.join(__dirname,"../views/admin/","blog-edit.html"))
})


router.get("/blogs",function(req,res){
    res.sendFile(path.join(__dirname,"../views/admin/","blog-list.html"))
})




module.exports = router; // Dışarıya açtık