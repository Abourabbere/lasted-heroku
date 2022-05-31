const Router = require('express').Router()
const CartController = require('../controllers/cart.controller')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')


//Cart CRUD
Router.post('/', CartController.addCart)
Router.get('/', verifyTokenAndAdmin, CartController.getAllCart)
Router.get('/:userId', verifyTokenAndAuthorization, CartController.getUserCart)
Router.put('/:id', verifyTokenAndAuthorization, CartController.updatedCart)
Router.delete('/:id', verifyTokenAndAuthorization, CartController.deleteCart)

module.exports = Router