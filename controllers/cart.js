const Cart = require ("../models/cart")
const User = require("../models/authmodel");
const { ConnectionStates } = require("mongoose");
// const {Userid} = require("../middleware")
const addItemToCart =async (req, res, next) => {
   
    try {
        const USERid = req.token_data._id
        console.log("hello", USERid)
        const New = await Cart.findById({ _id:USERid })
        if (!New) {
            let newCart = new Product({
                user: USERid,
                cartItems : req.body.cartItems
            })

            const ann = newCart.save()
            res.send("Cart added successfully")
            console.log(USERid + '  has updated a new product')
        }
        else {
            next()
            res.send("Cart with this token already exist")
        }

    }
    
catch (err) {
        res.send("An error Occured :" + err)
        console.log(err)
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


module.exports = {getCartById,
addItemToCart}