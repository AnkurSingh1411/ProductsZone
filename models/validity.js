const mongoose = require ("mongoose")

const ValiditySchema = new mongoose.Schema({
date : { type : Date
},
access : {
    type : Boolean
}
},{timestamps : true})


module.exports = mongoose.model("dates",ValiditySchema);