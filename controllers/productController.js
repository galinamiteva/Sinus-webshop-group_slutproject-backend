
const mongoose = require('mongoose')
const router = require('express').Router()
const Product = require('../models/productSchema')


async function getAllProducts(req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(err){
        
        res.status(404).json({message:'No products here'});        
    }
}


async function createProduct(req, res){
  if(req.user.role === 'admin')
        try {
            
            const newProduct = await new Product ({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                price: req.body.price,
                shortDesc: req.body.shortDesc,
                longDesc: req.body.longDesc,
                imgFile: req.body.imgFile
            })          
                // Om produkten skapats skickas den till frontenden.
                newProduct.save((err) => {
                    if (err) {
                        res.send(err)
                    } else {                        
                        res.send('The new product has been saved')
                    }
                })
        } catch(err){
            console.error(err)
            res.sendStatus(401)   
        }
    else {
        res.send('Du är inte admin')
    }   
}



async function singleProduct(req, res){
    try {       
        const productItem = await Product.find({ _id: req.params.id })
        res.status(200).json(productItem);

    } catch(err){
        res.sendStatus(403).send('No product found')
    }
}



async function updateProduct(req,res){
     // Förutsatt att man är inloggad som admin kan vi uppdatera informationen om en produkt. 
    if(req.user.role === 'admin'){    
        try {
            //Nina Jivetorp funktion!!
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body },{ runValidators: true, new: true })                  
                
            if (!updatedProduct) return res.status(404).send("No product found")

            res.json(updatedProduct)
        } catch (err) {
            res.status(400).send(err)
        }
    }// Kan inte uppdatera information om en produkt om du inte är inloggad som admin.
    else res.send('You are not an admin')
}



async function deleteProduct ( req, res ){
    if(req.user.role === "admin"){
        
        try{            
            
            const deletedProduct = await Product.findByIdAndRemove({_id: req.params.id}, {useFindAndModify:false} );
            res.status(202).json(deletedProduct);
        
        }catch(err){
            res.sendStatus(401)
        }
    } else res.send('You are not an admin')
}

module.exports = {getAllProducts, createProduct, singleProduct, updateProduct, deleteProduct }