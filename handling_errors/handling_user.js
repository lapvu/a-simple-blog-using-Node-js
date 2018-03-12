const User = require('../models/user');

module.exports = handling_user = (req, res, next) => {
    User.count().exec((err, data) => {
        const id = parseInt(req.params.id);
        const page = Math.floor(data / id);
        if (id <= 0 || id > page) return res.render('pages/404');
        return next();
    })
}   