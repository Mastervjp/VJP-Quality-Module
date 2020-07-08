'use strict'
const PassportLocalStrategy = require('passport-local').Strategy;
const { User } = require('./../../models');

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, callback) => {
    const userData = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
        name: req.body.name.trim(),
        role:req.body.role.trim(),
        logRole:req.body.logRole.trim(),
    }

   
    User.create(userData).then(result => {
        callback({success : true, data: result})
    }).catch(function(err) {
        callback({ success : false, data : err, message : err.message})
    })
})