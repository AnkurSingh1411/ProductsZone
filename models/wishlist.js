const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let wishlist = new Schema({
    title: {type: String, default: 'My Wish List'},
    product : {type: mongoose.Schema.Types.ObjectId, ref: "products",required : true}
});

module.exports = mongoose.model('Wishlist', wishlist);