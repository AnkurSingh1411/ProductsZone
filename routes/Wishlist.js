const express = require("express")
const router = express.Router()
const Wishlist = require("../models/wishlist")
const mongoose = require ("mongoose")
const Product = require("../models/productmodel")


// Adding a new wishlist 


router.post('/',async (req, res) => {
    try{
      const wishlist = new Wishlist({
        title : req.body.title,
        product : req.body.productId
    })

        let WL = await wishlist.save()
        console.log(WL)
        res.status(200).json({
          message : "wishlist created",
          wishlist_data : wishlist
    })
    }catch (err){
      res.json({
        message : "ops an error occured",
        error : err
      })
    }

});


// getting all the wishlists

router.get("/",async(req,res)=>{
    try{
   const Wishlists  = await Wishlist.find({})
   res.status(200).json({
       message : " WishList Retrived",
       data : Wishlists
   })

    }

    catch(err){
        res.status(500).json({
            message : " error found",
            error : err
        })
    }
})

// Update a wishlist 

router.put('/product/add', (req, res) => {
    Product.findOne({_id: req.body.productId}, (err, product) => {
        if (err) {
            res.status(500).send({error: 'Error: could not add item to Wishlist'});
        } else {
            Wishlist.findOneAndUpdate({_id: req.body.wishlistId},
                {$addToSet: {products: product._id}},
                (err, wishlist) => {
                    if (err) {
                        res.status(500).send({error: 'Error: could not add item to Wishlist'});
                    } else {
                        res.send(wishlist)
                    }
                })
        }
    })

});

module.exports = router