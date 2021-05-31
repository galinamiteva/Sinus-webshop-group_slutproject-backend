const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
   
   //Kollar om user exists 
    if (!await User.exists({ email: req.body.email })) {


        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            if (err) res.json(err)
            else {
                // Skapar en ny user.-!!! hos Postman man måste ta borta adress för att bli street: req.body.street ..osv
                const newUser = new User({
                    
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    // Vi kör en ternary som alltid sätter role till customer förutsatt att man inte är admin. Admins reggas i vår DB.
                    role: (req.body.role === 'admin') ? 'admin' : 'customer', 
                    adress: {
                        street: req.body.adress.street,
                        zip: req.body.adress.zip,
                        city: req.body.adress.city
                    },
                    orderHistory: []
                    
                })
                // Sparar användaren.
                try {
                    await newUser.save()
                        //skapar Tokens Payload 
                    const payload = {
                        id: newUser._id,
                        iss: 'coop',
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),                           
                        role: newUser.role,                          
                    }

                    // Signa och skicka token samt user.
                    const token = await jwt.sign(payload, process.env.SINUS_SECRET)
                    res.cookie('auth-token', token)                                            
                    //Enligt instruktionen EndPointResponse
                    const userEndPointResponse = await User.findOne({ email:  req.body.email }, { password: 0, orderHistory: 0, __v: 0, _id: 0 });
                    res.json({
                        token: token,
                        user: userEndPointResponse
                    })                       
                }
                catch (err) {
                    console.log(err)
                    return res.status(500).json({
                        error: 'User not added to database',
                        msg: err
                    })
                }
            }
        })         
    }else {
        // Om emajlen finns
        return res.status(409).json({ error: 'Email already exists' })
    }
}  
  
     


async function authUser(req, res) {
   
    
 // Hämta data för den användare som loggat in.
 const user = await User.findOne({email:req.body.email})

 // En if sats som kollar om den hittat en användare.
 if (user) {

    // Kontrollera och jämföra om lösenordet stämmer överens. 
    bcrypt.compare(req.body.password, user.password, function async(err, result) {  
        if (err) res.json({err, msg:'Dina uppgifter stämde inte'})

        // Om lösenorden stämmer överens skapar vi en user payload.
        if  (result)   {             
            const payload = {
                _id: user.id,
                iss: 'coop',
                exp: Math.floor(Date.now() / 1000) + (60 * 60), 
                role: user.role
            }


                // I så fall, signa och skicka token.
            jwt.sign(payload, process.env.SINUS_SECRET, async function (err, token){
                
                try{
                res.cookie('auth-token', token)
            
                //Enligt instruktionen EndPointResponse
                const userEndPointResponse =  await User.findOne({ email:req.body.email }, { password: 0, orderHistory: 0, __v: 0, _id: 0 });
                
                res.json({
                    token: token,
                    user: userEndPointResponse
                })
                }catch(err){
                    res.send('Wrong')
                }                 
            })
        } else { 
            res.send("Dina credentials stämde inte")
        }
    })        
    } else res.json({ msg: "Kan't find user" });
}


module.exports = { registerUser, authUser } 