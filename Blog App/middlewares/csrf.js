// csrf.js (middleware)
module.exports = function (req, res, next) {
    res.locals.crfToken = req.csrfToken(); // CSRF token'ı response'a ekle
    next();
};
