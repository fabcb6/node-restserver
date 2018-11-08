const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} is not a valid role'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The User name is requiered']
    },
    email: {
        type: String,
        required: [true, 'The User email is requiered'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The User password is requiered']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, 'The User name is requiered'],
        default: 'USER_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean, 
        default: true
    },
    google: {
        type: Boolean, 
        default: false
    }
})

userSchema.methods.toJSON = function() {
    let _user = this;
    let _userObj = _user.toObject();
    delete _userObj.password;           // exclude the password

    return _userObj;
}

userSchema.plugin(mongooseUniqueValidator, '{PATH} must to be unique.');

module.exports = mongoose.model('User', userSchema);
