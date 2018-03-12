const Post = require('../models/post');

module.exports = views = (req, res, next) => {
    Post.findById(req.params.id).exec((err, data) => {
        if (err) console.log(err);
        Post.findByIdAndUpdate(req.params.id, { $set: { views: data.views + 1 } }).exec((err) => {
            if (err) console.log(err);
            next();
        })
    })
}

