const router = require('express').Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    Post.find().limit(6).sort({ _id: -1 }).exec((err, post) => {
        if (err) console.log(err);
        res.render('pages/index', {
            title: 'home page',
            user: req.user,
            post: post
        });
    })
})
router.post('/api/post', (req, res) => {
    const { perclick } = req.body;
    const skippost = perclick * 6
    Post.find().skip(skippost).sort({ _id: -1 }).limit(6).exec((err, data) => {
        if (err) console.log(err);
        res.send(data);
    })
})

module.exports = router;