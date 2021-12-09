const Cart = require ("../models/cart")
const User = require("../models/authmodel")

exports.addItemToCart = (req,res)=>{
    const cart = new Cart({
        // user : req.User._id,
        cartItems : req.body.cartItems
    });

    cart.save((error,cart)=>{
        if(error) return res.status(400).json({error});
        if (cart){
            return res.status(201).json({cart})    
        }
    })

}