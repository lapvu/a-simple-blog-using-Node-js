const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})
UserSchema.methods.validPassword = function (password, user) {
    return bcrypt.compareSync(password, user.password);
};

const User = module.exports = mongoose.model('user', UserSchema);

