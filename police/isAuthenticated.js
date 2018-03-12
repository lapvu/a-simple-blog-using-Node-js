module.exports = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.render('pages/404')
}