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
        console.log(fullname, email, password);  
        await User.create({
            fullName: fullname,
            email: email,
            password: hashedPassword
        });

        return res.redirect("login");
    } catch (e) {
        console.log(e);
    }
}

// **************************** Login işlemleri için get -post  ****************************
exports.get_login = async function(req, res) {
    try {
        return res.render("auth/login", {
            title: "login"
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
                message: "email hatalı"
            });
        }

        // parola kontrolü
        const match = await bcrypt.compare(password, user.password);

        if(match) {
            // login olduk.
            
            // cookie
            // res.cookie("isAuth",1)
            // session
            req.session.isAuth=1;
            return res.redirect("/");
        } 
        
        return res.render("auth/login", {
            title: "login",
            message: "parola hatalı"
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