const express = require("express")
const {addItemToCart, getCartById} = require  ("../controllers/cart")
const router = express.Router()


router.post ('/addtocart',addItemToCart)
router.get("/getCartById",getCartById)



module.exports = router