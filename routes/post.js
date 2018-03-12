const router = require('express').Router();
const Post = require('../models/post');
const post_error = require('../handling_errors/handling_post');
const views = require('../handling_errors/mid_views');

router.get('/:id', post_error, views, (req, res, next) => {
    Post.findById(req.params.id).exec((err, data) => {
        if (err) console.log(err);
        res.render('pages/post', {
            title: data.title,
            data: data,
            user: req.user
        })
    })
})


module.exports = router;