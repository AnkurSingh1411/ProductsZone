const express = require('express');
const router = express.Router();



const Cart = require('../models/cart');
const Product = require('../models/productmodel');
var Price=[]
router.get('/add-to-cart/:id', function (req, res) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.json(err);
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        const cartdata = req.session.cart
        const Totalprice = cartdata.totalPrice
        Price.push(Totalprice)
        res.json({message : 'added to cart successfully',cart : req.session.cart});
        
    }) 
});

const PRICE=function (req, res) {
    const cart = new Cart(req.session.cart ? req.session.cart : {});
        const cartdata = req.session.cart
        return cartdata.totalPrice
}



router.get('/reduce/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});


router.get('/remove/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart :{});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.status(200).json({
        message : "The item has been removed from the cart"
    })
});

router.get('/cart', function (req, res, next) {
    if(!req.session.cart) {
        return res.render('/cart', {products: null});
    }
    const cart = new Cart(req.session.cart);
    return res.json( {products: cart.generateArray(), totalPrice: cart.totalPrice});
});


console.log(Cart.totalPrice)

module.exports = router,PRICE;