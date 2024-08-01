const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../data/db");



// admin klasörü altındaki blog-create.html sayfa yönlendirme
router.get("/blog/create",async function(req,res){
    try{
        const [category,] = await db.execute("select * from category");

        res.render("admin/blog-create",{
            title: "Add blog",
            categories : category
        })
    }catch(e){
        console.log(e);
    }


   
})


// :blogid dedik mi bir değişken olarak algılar.
router.get("/blogs/:blogid",function(req,res){
    res.render("admin/blog-edit")
})


router.get("/blogs",function(req,res){
    res.render("admin/blog-list")
})




module.exports = router; // Dışarıya açtık