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

// Yeni blog eklenince bu rouuter a gelecek
router.post("/blog/create",async function(req,res){
   const title = req.body.title;
   const description = req.body.Description;
   const image = req.body.Image;
   const category = req.body.category;
   const mainPage = req.body.mainPage=="0n" ?  1:0;
   const isApproved = req.body.isApproved=="0n" ?  1:0; 
   try
   {
    await db.execute("insert into blog (Title,Description,Image,mainPage,isApproved,categoryId) values(?,?,?,?,?,?)",[title,description,image,mainPage,isApproved,category])  
    res.redirect("/");
}catch(err){
    console.log(err)
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