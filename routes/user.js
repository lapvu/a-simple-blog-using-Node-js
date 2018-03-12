const router = require('express').Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter')
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const request = require('request');
const isLoggedIn = require('../police/isAuthenticated');
const validator_signup = require('../validator/signup');
const validator_add = require('../validator/add_new');
const Post = require('../models/post');
const handling_user = require('../handling_errors/handling_user');

router.get('/signup', (req, res) => {
    if (req.user) {
        res.redirect('/user/1')
    } else {
        res.render('pages/signup', {
            errors: false,
            data: false,
            title: 'signup'
        });
    }
})

router.post('/signup', validator_signup, (req, res) => {
    const { name, email, username, password, confirm_password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const data = matchedData(req);
        res.render('pages/signup', {
            data: data,
            errors: errors.mapped()
        })
    } else {
        const newUser = new User({
            'name': name,
            'email': email,
            "username": username,
            'password': hash = bcrypt.hashSync(password, 8)
        })
        newUser.save();
        res.redirect('/user/login')
    }
})
router.get('/login', (req, res) => {
    if (req.user) {
        res.redirect('/user/1')
    }
    res.render('pages/login', {
        message: req.flash('login_message'),
        title: 'signup'
    })

});
router.post('/login',
    passport.authenticate('login', {
        successRedirect: '/user/1',
        failureRedirect: '/user/login',
        failureFlash: true
    })
);
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})
router.get('/add-new', isLoggedIn, (req, res) => {
    res.render('pages/add_new', {
        title: 'add new',
        user: req.user,
        errors: false,
        data: false
    })
})
router.get('/:id', isLoggedIn, handling_user, (req, res, next) => {
    const page = parseInt((req.params.id - 1) * 6);
    Post.count({ authorId: req.user.id }).exec((err, count) => {
        if (err) console.log(err);
        Post.find({ authorId: req.user.id }).limit(6).skip(page).sort({ _id: -1 }).exec((err, data) => {
            if (err) console.log(err);
            res.render('pages/user', {
                title: 'dashboard',
                user: req.user,
                data: data,
                count: count,
                pages: req.params.id
            });
        });
    })
});

router.post('/add-new', isLoggedIn, validator_add, (req, res) => {
    const { title, content } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const data = matchedData(req);
        res.render('pages/add_new', {
            data: data,
            errors: errors.mapped(),
            title: 'add new',
            user: req.user
        })
    } else {
        new Post({
            title: title,
            body: content,
            authorId: req.user._id
        }).save();
        res.redirect('/user/1')
    }
})
router.get('/edit/:id', isLoggedIn, (req, res) => {
    Post.findOne({ _id: req.params.id }).exec((err, data) => {
        if (err) console.log(err);
        res.render('pages/edit', {
            title: 'edit',
            user: req.user,
            data: data
        })
    })
})
router.post('/edit/:id', isLoggedIn, (req, res) => {
    const { title, content } = req.body;
    Post.update({ _id: req.params.id, authorId: req.user.id }, { $set: { title: title, content: content } }).exec((err, data) => {
        if (err) console.log(err);
        res.redirect('/user/1');
    })
})

router.get('/delete/:id', isLoggedIn, (req, res) => {
    Post.remove({ _id: req.params.id, authorId: req.user.id }).exec((err) => {
        if (err) console.log(err);
        res.redirect('/user/1')
    })
})

module.exports = router;