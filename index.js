const express = require('express');
const route = require('./routes/index');
const user = require('./routes/user');
const post = require('./routes/post');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require("body-parser");
const Post = require('./models/post');
const search = require('./routes/search');


app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: '********',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


//config database
require('./config/db');
require('./config/passport')(passport);


app.use('/', route);
app.use('/user', user);
app.use('/post', post);
app.use('/search', search);
app.use((req, res, next) => {
    res.render('pages/404')
})

app.listen('3000', () => {
    console.log('started')
})