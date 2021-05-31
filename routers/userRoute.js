const express = require('express')
const userRoute = express.Router()
const userController = require('../controllers/userController')

 userRoute.post('/register',userController.registerUser )
 userRoute.post('/auth', userController.authUser)

module.exports = userRoute