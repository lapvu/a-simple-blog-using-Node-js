const { check } = require('express-validator/check');
const validator_signup = [
    check('name', 'must be a name long').isLength({ min: 5, max: 20 }),
    check('email', 'must be an email').isEmail().custom((value) => {
        return User.findOne({ 'email': value }).then(data => {
            if (data) throw new Error('this email is already in use');
            return true;
        })
    }),
    check('username', 'must be an username').custom(value => {
        return User.findOne({ 'username': value }).then(data => {
            if (data) throw new Error('this username is already in use');
            return true
        })
    }),
    check('password', 'passwords must be at least 5 chars long').isLength({ min: 5, max: 15 }),
    check('confirm_password').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('password dose not match')
        } else {
            return true
        }
    }),
    check('g-recaptcha-response').custom((value, { req }) => {
        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            throw new Error('please select captcha')
        }
        var secretKey = "6Ldtf0oUAAAAAPpz9pSJl2oUDXORr0SL0WHIlVyK";
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        return request(verificationUrl, function (error, response, body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if (body.success !== undefined && !body.success) {
                throw new Error('captcha not ok')
            }
            return true
        });
    })
]

module.exports = validator_signup;