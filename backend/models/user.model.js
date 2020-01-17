const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        trim: true
    }, password: {
        type: String,
        required: 'password is required',
        minlength: 6
    },/* salt:{
        type: String
    }, provider: {
        type: String,
        required: 'Provider is required'
    },*/ firstname: {
        type: String,
        required: 'Firstname is required',
        trim: true
    }, lastname: {
        type: String,
        required: 'Lastname is required',
        trim: true
    }, gender: String,
    age: Number,
    role: {
        type: String,
        enum: ["Admin", "Responder", "Researcher"],
        required: true,
    }, recentProjects: Array,
    recentOtherSurveys: Array
});

/*userSchema.pre('save', function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

userSchema.method.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
userSchema.method.authenticate = function(password){
    return this.password === this.hashPassword(password);
};*/

const User = mongoose.model('User', userSchema);

module.exports = User;