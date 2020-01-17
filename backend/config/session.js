const express = require('express');
const session = require('express-session');
const passport = require('passport');

module.exports = function () {
    var app = express();
    app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}
