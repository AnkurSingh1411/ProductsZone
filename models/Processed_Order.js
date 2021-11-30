const mongoose = require('mongoose')
const Schema = mongoose.Schema



const ProcessSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product : {type: mongoose.Schema.Types.ObjectId, ref: "products",required : true},
    quantity : {type : Number , default : 1},
    
},{timestamps:true})
const order = mongoose.model('Processed',ProcessSchema)

module.exports = order
