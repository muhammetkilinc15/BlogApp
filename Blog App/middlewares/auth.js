// kullanıcı eğer şifre girmediyse add-blog gibi özelliklere erişemez
// Kullanıcı diyelim ki url ile girmeye çalıştı ancak login ekranına yönlendirme yapıldı

const { text } = require("express");

// daha sonrasında kullanıcı giriş yapınca önceden istediği sayfaya yönlendirmek gerek
module.exports =  (req,res,next)=>{
    if(!req.session.isAuth){
        return res.redirect("/account/login?returnUrl="+req.originalUrl)
    }
    next();
}