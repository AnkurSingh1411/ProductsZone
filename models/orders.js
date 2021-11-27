const mongoose = require('mongoose')
const multer = require('multer')
const Schema = mongoose.Schema



const OrderSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product : {type: mongoose.Schema.Types.ObjectId, ref: "products",required : true},
    quantity : {type : Number , default : 1},
    
},{timestamps:true})
const order = mongoose.model('Orders',OrderSchema)
module.exports = order
