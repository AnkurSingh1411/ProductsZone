const cart = require ("../models/cart")
const User = require("../models/authmodel");
const { ConnectionStates } = require("mongoose");
// const {Userid} = require("../middleware")

const addItemToCart = async (req,res,next)=>{
    try {
        carttosave = new cart ({
            cartItems : req.body.cartItems
        })
        const saved_cart = carttosave.save()

    if (saved_cart){
        res.json({
            message : "cart has been saved"
})
    }
    }catch (err){
        res.json({
            message : "ops an error occoured",
            error : err
        })
    } 
}


// const addItemToCart = async(req,res)=>{
//    const cart = new Cart({
//         // user : req.user._id,
//         cartItems : req.body.cartItems
//     });
    

//     await cart.save((error,cart)=>{
//         if(error) return res.status(400).json({error});
//         if (cart){
//             return res.status(201).json({cart})    
//         }
//     })

// }


const getCartById = async(req,res,next)=>{
    try{
    const carts = await Cart.findById({_id : req.body.id})
    console.log(carts)
    res.send(carts)
    }
    catch (err){
        res.status(401).json({
            message : "ops error found",
            error : err
        })

    }

}

module.exports = {
    addItemToCart,
    getCartById    
}