const express = require('express')
const router = express.Router()
const { runInContext } = require('vm');
const productcontroller = require("../controllers/productcontroller")
const {authenticateToken} = require("../jwt/jwt_operations")
const multer = require('multer')
const path = require("path");
const errhandler = require('../error_handler');
const {authRole,authpermission,authUser} = require('../middleware')
const {ROLE,users}= require('../data')


// router.get('/prod',productcontroller.ProductById)

// Storage engine
const storage = multer.diskStorage({
    destination:"upload/images",
    filename : (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage : storage,
    // limits : {fileSize:10}
    })

router.post('/upload',upload.single('profile'),(req,res)=>{
    console.log(req.file)
    try{
    res.json({
        success:1,
     profile_url : `"http://localhost:3400/profile/${req.file.filename}"`
    })
}catch{
    errhandler
}
})


router.get('/',authenticateToken,authpermission('Vendor'),productcontroller.Productslist)
router.post('/addproduct',authenticateToken,authpermission('Vendor'),productcontroller.AddUserProduct)
router.post('/deleteproduct/',authenticateToken,authpermission('Vendor','Admin'),productcontroller.DeleteProduct)
router.post('/updateproduct',authenticateToken,authpermission('Vendor'),productcontroller.UpdateProductById)
router.get('/produ',authenticateToken,productcontroller.GetUserProduct)
router.get('/prodbyid/:id',productcontroller.GetProductById)
module.exports = router
