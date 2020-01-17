const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new LocalStrategy(function(email, password, done){
        User.findOne({ email: email }, function(err, user){
            if(err){ return done(err); }
            if(!user || !user.authenticate(password)){
                return done(null, false, {
                    message: 'Invalid email or password'
                });
            }
            return done(null, user);        
        });
    }));
};