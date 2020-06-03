'use strict'
const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const { User } = require('./../../models')
const config = require('./../../config')

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim().toLowerCase(),
        password: password
    }
    User.checkLogin(userData.email, userData.password).then(result => {
        const token = jwt.sign({ sub: result.id }, config.JWT_SECRET,{expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24)})
        return done(null, token, { name: result.name, role: result.role,logRole: result.logRole})
    }).catch(err => {
        return done(err)
    })
})
