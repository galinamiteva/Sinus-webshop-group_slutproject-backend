const express = require('express')
const app = express()
const mongoose = require('mongoose')


//import routes

const productRoute = require('./routers/productRoute')
const userRoute = require ('./routers/userRoute')
const orderRoute = require('./routers/orderRoute')
const logout = require('./routers/logout');  


// Olika middlewares för att vår applikation skall funka förutom rad 14 (vår dotenv) där vi lagrar vår secret. 
require('dotenv').config()
app.use( express.static('public') )
app.use(express.json())
const cookieParser = require('cookie-parser')

// Läsa från req.body
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// Koppla upp mot databas
const url = 'mongodb://localhost:27017';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'SINUS-DB' })

// Ett "handtag" till vår uppkoppling
const db = mongoose.connection

// Felhantering
db.on('error', (err) => {
    console.error(err)
})

// Starta upp en db-koppling
db.once('open', () => {
    console.log('Startat en uppkoppling mot db.')
})




// use routes
app.use('/api', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/products', productRoute)



//Route for att rensa cookie efter autorization. Skrev bara i url:en och inte genom buton logout!Det är inte på instruktionen!!!
app.use('/logout', logout)




module.exports = app