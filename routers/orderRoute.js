const express = require('express')
const orderRoute = express.Router()
const orderController = require('../controllers/orderController')
const { isAdmin } = require('../middleware/authMiddle')

orderRoute.get('/', isAdmin, orderController.getOrders)
orderRoute.post('/', isAdmin, orderController.createOrder)

module.exports = orderRoute