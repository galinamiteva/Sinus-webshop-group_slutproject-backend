const Order = require('../models/orderSchema');
const User = require('../models/userSchema');
const Product = require('../models/productSchema');


async function getOrders(req, res) {
  
  try {        
    //Admin kan se alla orders
    if (req.user.role === 'admin') {
      const orders = await Order.find({}).populate([
        {
            path: 'items',
            model: 'Product'
        }
    ])
    res.send(orders)

    } else if (req.user.role === 'customer') {
     

      const user = await User.findOne({_id:req.user._id}).populate('orderHistory');
      res.json(user.orderHistory);

    }
        

  } catch (err) {
        
    console.error(err);
    res.sendStatus(400)
        
  }
}


async function createOrder(req, res) { 
 
  // items är en array där produkt id lagras från de produkter användaren beställer.
  let items = req.body.items;
  //Vi kollar om role-statusen  
  if (req.user.role === 'customer') {  
   
    //Hämtar bara items from alla items, som är valda av usern  
      const products = await Product.find({ _id: { $in: items } });

      // Skapar en variabel där vi lagrar det totala priset på ordervärdet. Vi loopar sedan igenom req.body.items 
      let orderValue = 0;
      req.body.items.forEach(productID =>{
          //Vi använder index , eftersom ibland är några gånger samma produkt med lika ID 
          const index = products.findIndex(product => product._id.toString() === productID); 
          // Hämtar ut priset och lagrar i variabeln price. 
          const price = products[index].price 
          // Summerar priset.
          orderValue += price;
      })
      // Skapar en ny order och räkna ihop summan av produkterna. 
      const newOrder =  new Order({
          timeStamp: Date.now(),
          status: 'inProcess',
          items: items,
          orderValue: orderValue
      })
      // Sparar en ny order. 
       newOrder.save((err) => {
          if (err) {
              res.json(err)
          }
      })

     

      // Här letar vi efter en användare och uppdaterar dess orderHistory. 
      const user = await User.findOneAndUpdate(
        {_id:req.user._id},
        { $push: {orderHistory: newOrder._id}},
        {useFindAndModify: false}
    );
         
      
      // Hittas user så skickas ordern med. (frontend)
      if (user) res.json(newOrder);
      
      // Som admin kan vi inte beställa.
  }  else if (req.user.role === 'admin') {
                  res.status(401).json(err);
              }  else {
              res.json(err)
              }
             
      
  

}


module.exports = { getOrders, createOrder }