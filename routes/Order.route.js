const Router = require('express').Router()
const ProductController = require('../controllers/product.controller')
const { verifyTokenAndAdmin } = require('../middleware/verifyToken')


//Cart CRUD
Router.post('/', verifyTokenAndAdmin, ProductController.addProduct)
Router.get('/', ProductController.getAllProduct)
Router.get('/:id', ProductController.getProduct)
Router.put('/:id', verifyTokenAndAdmin, ProductController.UpdateProduct)
Router.delete('/:id', verifyTokenAndAdmin, ProductController.DeleteProduct)

module.exports = Router