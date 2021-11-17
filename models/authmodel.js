const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    name : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : String
    },
    password : {
        type : String
    },
    role : {
        type : String,
        enum : {ADMIN : "admin",VENDOR : "Vendor"}
       
    }
},{timestamps:true})

const User = mongoose.model('username',UserSchema)
module.exports = User

