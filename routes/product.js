const express = require('express')
const router = express.Router()

const productcontroller = require("../controllers/productcontroller")
const {authenticateToken} = require("../jwt/jwt_operations")

router.get('/',authenticateToken,productcontroller.Productslist)

// router
// .route('/')
// .get((req, res) => {
//     res.json({data: 'dtat'})
//     // productcontroller.Productslist
// }) 

router.get('/prod',productcontroller.ProductById)
router.post('/addproduct',authenticateToken,productcontroller.AddProduct)
router.post('/deleteproduct/',authenticateToken,productcontroller.DeleteProduct)
router.post('/updateproduct',productcontroller.UpdateProductById)
router.get('/produ',authenticateToken,productcontroller.GetProductById)
module.exports = router