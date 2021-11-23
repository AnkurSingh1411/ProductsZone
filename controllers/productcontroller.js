const Product = require('../models/productmodel')
require ("../routes/product")


// This Api lists all the products

const Productslist = async (req, res, next) => {

    try {
        const jk = await Product.find()
        console.log(jk)
        return res.json(jk)
    }
    catch (err) {
        res.json('An error occured :' + err)
    }
}


// This Api is for adding a new product

const AddUserProduct =async (req, res, next) => {
    console.log(req.file)
    try {
        const prodid = req.token_data._id
        console.log("hello", prodid)
        const New = await Product.findById({ _id: prodid })
        if (!New) {
            let newproduct = new Product({
                userId: prodid,
                name: req.body.name,
                category: req.body.category,
                price: req.body.price
            })

            const ann = newproduct.save()
            res.send("product added successfully")
            console.log(prodid + '  has updated a new product')
        }
        else {
            next()
            res.send("product with this token already exist")
        }

    }
    catch (err) {
        res.send("An error Occured :" + err)
    }
}



// This Api Updates a product by its Id 

const UpdateProductById = async (req, res, next) => {
    try {
        let productid = req.params.id

        let updateddata = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        }
        const updata = await Product.findOneAndUpdate(productid, { $set: updateddata })
        res.json({
            status : 200,
            message : "product has been updated"
        })
        console.log("data has been updated")

    }
    catch (err) {
        res.send('An error occured :' + err)
    }

}

// This api is use to get a single product by its id 

const GetProductById = async (req, res, next) => {

    try {
        const ProdById = await Product.findById(req.params.id)
        console.log(ProdById)
        return res.json(ProdById)
    }
    catch (err) {
        res.json('An error occured :' + err)
    }
}

//this Api is used to delete a product from database

const DeleteProduct = async (req, res, next) => {
    console.log(req.params.id)
    try {
        await Product.remove({ _id: req.params.id })
        res.send("Product has been removed from the database")
    }
    catch (err) {
        res.json("ops " + err)
    }
}

// this api is used to delete all the products from the database

const DeleteAllProducts = async(req,res,next)=>{
    try{
        await Product.remove()
        res.status(200).json("All the products has been removed")
    }catch (err) {
        res.json({
            error : err
        })

    }
}

module.exports = {
    Productslist,
    AddUserProduct,
    UpdateProductById,
    DeleteProduct,
    GetProductById,
    DeleteAllProducts
}
