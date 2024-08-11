const User = require("../models/user");

const bcrypt  = require("bcrypt")


// **************************** Register işlemleri için get -post  ****************************
exports.get_register = async function (req,res){
    try{
        return res.render("auth/register",{
            title: "Register"
        })

    }catch(e){
        console.log(e);
    }
}
exports.post_register = async function (req, res) {
    const fullname = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password,10);
    try {
        const user = await User.findOne({where:{email:email}})
        if(user){
            req.session.message = {text:"Girdiğiniz email adresi başka kullanıcıya ait", class :"warning"}
            return res.redirect("login")
        }

        await User.create({
            fullName: fullname,
            email: email,
            password: hashedPassword
        });
    
        req.session.message ={text:"Yeni hesabınız ile giriş yapabilirsiniz", class :"success"}

        return res.redirect("login");
    } catch (e) {
        console.log(e);
    }
}

// **************************** Login işlemleri için get -post  ****************************
exports.get_login = async function(req, res) {
    const message = req.session.message;
    delete req.session.message;
    try {
        return res.render("auth/login", {
            title: "login",
            message : message
        });
    }
    catch(err) {
        console.log(err);
    }
}
exports.post_login = async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user) {
            return res.render("auth/login", {
                title: "login",
                message: {text:"email hatalı",class:"danger"}
            });
        }

        // parola kontrolü
        const match = await bcrypt.compare(password, user.password);

        if(match) {
            // login olduk.
            
            // cookie
            // res.cookie("isAuth",1)
            // session
            req.session.isAuth=true;
            req.session.fullName = user.fullName;
            const url = req.query.returnUrl || "/"
            return res.redirect(url);
        } 
        
        return res.render("auth/login", {
            title: "login", 
            message: {text:"parola hatalı",class:"danger"}
        });     
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_logout = async function(req,res){
    try {
        // res.clearCookie("isAuth") // cookie silerken

        await req.session.destroy()
        return res.redirect("/account/login");
    }
    catch(err) {
        console.log(err);
    }
}