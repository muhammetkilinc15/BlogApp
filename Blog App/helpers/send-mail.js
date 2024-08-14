const nodemailer = require("nodemailer"); // 'nodemailer' olarak düzelttim
const config = require("../config");

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // Outlook için doğru SMTP sunucusu
    port: 587, // TLS bağlantısı için doğru port
    secure: false, // TLS/STARTTLS için false
    auth: {
        user: config.email.username, // Tam e-posta adresiniz
        pass: config.email.password  // Uygulama şifresi (2FA etkinse) veya standart şifre
    },
    tls: {
        rejectUnauthorized: false // Sertifika doğrulama
    }
});

module.exports = transporter;
