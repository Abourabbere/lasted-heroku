const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

//jwt token
const dureMax = 3 * 60 * 60 * 24 * 1000
const createToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.TOKEN_SECRET, {
        expiresIn: dureMax
    })
}

//SignUp user
module.exports.signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {

        const user = await UserModel.create({ firstName, lastName, email, password })
        res.status(201).json({ user: user._id })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

//Login user
module.exports.logIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)
        const token = createToken(user._id, user.isAdmin)
        res.cookie('jwt', token, { httpOnly: true, maxAge: dureMax })
        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//Logout user
module.exports.logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}