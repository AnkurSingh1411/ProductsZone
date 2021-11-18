const mongoose = require('mongoose')
const multer = require('multer')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    name:{
        type : String,
        required: true
    },
    category : {
        type : String,

    },
    price : {
        type : Number,
        required : true
    },
    profile : {
        type : String
    },
    userId : {
        type : String
    },
  

},{timestamps:true})
const Product = mongoose.model('products',ProductSchema)
module.exports = Product
