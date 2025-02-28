// Database settings 

const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "141021Bemu",
        database: "blogdb"
    },
    email: {
        username: "********************", // Doğru e-posta adresiniz
        password:"********************",, // Eğer 2FA etkinse, bu alana uygulama şifresi girilmeli
        from: "********************", // Gönderici e-posta adresi
    }
};

module.exports = config;
