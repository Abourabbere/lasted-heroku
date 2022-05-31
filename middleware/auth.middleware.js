const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedtoken) => {
            if (err) {
                res.locals.user = null
                res.cookie('jwt', '', { maxAge: 1 })
                next()
            } else {
                let user = await UserModel.findById(decodedtoken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) console.log(err);
            next();
        })
    } else {
        console.log('tu n\'a pas de token');
    }
}