const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            User.findOne({ 'username': username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, req.flash('login_message', 'Incorrect username or password'));
                }
                if (!user.validPassword(password, user)) {
                    return done(null, false, req.flash('login_message', 'Incorrect username or password'));
                }
                return done(null, user);
            });
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
