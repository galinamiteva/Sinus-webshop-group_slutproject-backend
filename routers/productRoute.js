const express = require('express')
const productRoute = express.Router()
const productController = require('../controllers/productController')
const { isAdmin } = require('../middleware/authMiddle')

 productRoute.get('/', productController.getAllProducts)
productRoute.get('/:id', productController.singleProduct)
productRoute.post('/',  isAdmin, productController.createProduct)
productRoute.patch('/:id', isAdmin, productController.updateProduct)
productRoute.delete('/:id', isAdmin, productController.deleteProduct) 





module.exports = productRoute