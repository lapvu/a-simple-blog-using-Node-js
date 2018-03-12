const router = require('express').Router();
const Post = require('../models/post')
router.post('/', (req, res) => {
    const text = req.body.text;
    Post.find({ title: { $regex: text } }).limit(5).sort({ "_id": -1 }).exec(function (err, data) {
        if (err) res.json(err)
        else res.send(data)
    })
})

module.exports = router;