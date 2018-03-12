const Post = require('../models/post');

module.exports = post_error = (req, res, next) => {
    Post.findById(req.params.id).exec((err, data) => {
        if (!data) {
            res.render('pages/404');
        } else {
            next();
        }
    })
}