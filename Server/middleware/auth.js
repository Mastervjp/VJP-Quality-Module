'use strict'
const jwt = require('jsonwebtoken')
const { User } = require('./../models')
const config = require('./../config')

module.exports = (req, res, next) => {

    if (!req.headers.authorization && !req.query.authToken) {
        return res.status(401).end()
    }

    const token = req.query.authToken || req.headers.authorization.split(' ')[1]

    return jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).end()
        }
        const userId = decoded.sub
        req.userId = userId
        req.userID = userId
        return User.findOne({ where: { id: userId } }).then(user => {
            if (!user) {
                return res.status(401).end()
            }
            req.user = user
            return next()
        }).catch(next)
    })
}
