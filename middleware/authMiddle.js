const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

async function isAdmin(req, res, next) {
    // Här kollar vi om en user är inloggad.  
    if (!req.cookies['auth-token']) {
        return res.sendStatus(403)
    } 
    const token = await req.cookies['auth-token']
    
    try {
        // Här verifierar vi att token stämmer överens tillsammans med vår dotenv.
        const payload = jwt.verify(token, process.env.SINUS_SECRET)
        //Man kan skriva sen req.user.role = 'admin' i controllers
        req.user = payload
       
        next()
    } catch (error) {
        res.sendStatus(403)
    } 
}

module.exports = { isAdmin  }