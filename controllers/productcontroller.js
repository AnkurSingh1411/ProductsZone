const Product = require('../models/productmodel')
require ("../routes/product")
const User = require("../models/authmodel")
const Valid = require ("../controllers/validitycontroller")
// This Api lists all the products


const Productslist = async(req,res,next)=>{
    await Product.find(function (err,data){
        if (err){
            res.send(err)
        }
        if (data){
            res.send("no data found")
        }
        res.send(data)
    })
}
// This Api is for adding a new product

const AddUserProduct =async (req, res, next) => {
    console.log(req.file)
    finduser =await  User.findById(req.token_data._id)
    const reports ={
        isoDate: {
          $gte: `${finduser.expirydate}`,
          $lt: `${finduser.date}`
        }}
    console.log(typeof(reports.isoDate))  
    if (reports){   
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
}



// This Api Updates a product by its Id 

const UpdateProductById = async (req, res, next) => {
    const reports ={
        isoDate: {
          $gte: `${finduser.expirydate}`,
          $lt: `${finduser.date}`
        }}
    if (reports){
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
}}

// This api is use to get a single product by its id 

const GetProductById = async (req, res, next) => {
    const reports ={
        isoDate: {
          $gte: `${finduser.expirydate}`,
          $lt: `${finduser.date}`
        }}
    if (reports){
    try {
        const ProdById = await Product.findById(req.params.id)
        console.log(ProdById)
        return res.json(ProdById)
    }
    catch (err) {
        res.json('An error occured :' + err)
    }
}
}
//this Api is used to delete a product from database

const DeleteProduct = async (req, res, next) => {
    console.log(req.params.id)
    const reports ={
        isoDate: {
          $gte: `${finduser.expirydate}`,
          $lt: `${finduser.date}`
        }}
    if (reports){
    try {
        await Product.remove({ _id: req.params.id })
        res.send("Product has been removed from the database")
    }
    catch (err) {
        res.json("ops " + err)
    }
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

// Inventory Management (countingproducts)

const RemainingProducts = async (req,res)=>{
    try{
    const datas = await Product.find()
    let length = datas.length
    if (length===0){
        res.json("No remaining products")
    }if (length===1){
        res.json({message : "There is only " + length + " remaining product",
    remaining_data:datas})
    }
    res.json({message : "There are "+length+" remaining products available",
remaining_data : datas})
    
}
catch (err) {
    res.json({
        message: "looks like something went wrong",
        error : err
    })
}}

module.exports = {
    Productslist,
    AddUserProduct,
    UpdateProductById,
    DeleteProduct,
    GetProductById,
    DeleteAllProducts,
    RemainingProducts
}
