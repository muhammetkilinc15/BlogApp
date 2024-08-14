const User = require("../models/user");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/send-mail");
const config = require("../config");
const crypto = require("crypto");
const { where } = require("sequelize");
const { text } = require("express");

// **************************** Register işlemleri için get -post  ****************************
exports.get_register = async function (req, res) {
  try {
    return res.render("auth/register", {
      title: "Register",
    });
  } catch (e) {
    console.log(e);
  }
};
exports.post_register = async function (req, res) {
  const fullname = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      req.session.message = {
        text: "Girdiğiniz email adresi başka kullanıcıya ait",
        class: "warning",
      };
      return res.redirect("login");
    }

    const newUser = await User.create({
      fullName: fullname,
      email: email,
      password: hashedPassword,
    });

    emailService.sendMail({
      from: config.email.from,
      to: newUser.email,
      subject: "Hesabınız Oluşturuldu",
      text: "Hesabınız başarılı şekilde oluşturuldu",
    });

    req.session.message = {
      text: "Yeni hesabınız ile giriş yapabilirsiniz",
      class: "success",
    };

    return res.redirect("login");
  } catch (e) {
    console.log(e);
  }
};

// **************************** Login işlemleri için get -post  ****************************
exports.get_login = async function (req, res) {
  const message = req.session.message;
  delete req.session.message;
  try {
    return res.render("auth/login", {
      title: "login",
      message: message,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.post_login = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.render("auth/login", {
        title: "login",
        message: { text: "email hatalı", class: "danger" },
      });
    }

    // parola kontrolü
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // login olduk.

      // cookie
      // res.cookie("isAuth",1)
      // session
      req.session.isAuth = true;
      req.session.fullName = user.fullName;
      const url = req.query.returnUrl || "/";
      return res.redirect(url);
    }

    return res.render("auth/login", {
      title: "login",
      message: { text: "parola hatalı", class: "danger" },
    });
  } catch (err) {
    console.log(err);
  }
};
// **************************** Çıkış işlemleri için get -post  ****************************
exports.get_logout = async function (req, res) {
  try {
    // res.clearCookie("isAuth") // cookie silerken

    await req.session.destroy();
    return res.redirect("/account/login");
  } catch (err) {
    console.log(err);
  }
};

// **************************** Şifre Sıfırlama işlemleri için get -post  ****************************
exports.get_reset = async (req, res) => {
  const message = req.session.message;
  delete req.session.message;
  try {
    // res.clearCookie("isAuth") // cookie silerken
    return res.render("auth/reset-password", {
      title: "reset-password",
      message: message,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.post_reset = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ where: { email: email }}); 
        if(!user) {
            req.session.message = { text: "Email adresine sahip kullanıcı bulunamadı", class: "danger"};
            return res.redirect("reset-password");
        }
        var token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + (1000 * 60 * 60);
        await user.save();

        emailService.sendMail({
            from: config.email.from,
            to: email,
            subject: "Reset Password",
            html: `
                <p>Parolanızı güncellemek için aşağıdaki linke tıklayınız.</p>
                <p>
                    <a href="http://127.0.0.1:3000/account/reset-password/${token}">Parola Sıfırla<a/>
                </p>
            `
        });

        req.session.message = { text: "parolanızı sıfırlamak için eposta adresinizi kontrol ediniz.", class: "success"};
        res.redirect("login");
    }
    catch(err) {
        console.log(err);
    }
};
