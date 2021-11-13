const usermodel = require("../models/authmodel")
const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
const {generateAccessToken}=require('../jwt/jwt_operations')

// Just for an example

exports.seedAdmin = ()=>{
    // check if there is an admin account
    let password = req.body.password
    usermodel.findOne({role : "admin"}, (err,admin)=>{
        if (err) throw err 
        if (admin) {
            return "admin account already exists"
        }
        usermodel.create({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            role : 'admin'

        },(err,user)=>{
            if (err) throw err 
            bcrypt.genSalt(10,(err,salt)=>{
                if (err) throw err
                bcrypt.hash(password,salt,(err,hash)=>{
                    if (err) throw err 
                    user.password = hash
                    user.save((err,savedUser)=>{
                        if (err) throw err 
                        return res.json("admin account created")
                    })
                })
            })
        })
    })
}


const register = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hashedpass){
        if (err){
            req.json({
                error : err
            })
        }

        console.log(req.body.password)
            let user = new usermodel({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : hashedpass,
        role : req.body.role
    })
    user.save()
    .then (user=>{
        res.json({
            message : "User Added Successfully!"
        })
    })
    .catch (error =>{
        res.json({
            message : error.message
        })
    })
})
}

const login = (req,res,next)=>{
    var email = req.body.email
    var password = req.body.password
    usermodel.findOne ({$or :[{email},{phone : email}]})
//    const user= usermodel.findone ({email : username})
.then (user=>{
        if (user){
            bcrypt.compare(password,user.password,function(err,result){
                if (err) {
                    res.json({
                        error : err
                    })
                }
                if (result){
                    // let token = jwt.sign({name : user.name},'verySecretValue',{expiresIn:'1h'})
         const token=generateAccessToken({_id:user._id}) 
        //  console.log(token);
                    res.json({
                        message:'Login Successful',
                        token
                    })
                }else {
                    res.json({
                        message:'Password does not matched'
                    })
                }
               

            })
        }else {
            res.json({
                message :"user not found",
            })
        }

    }).catch(err=>{
        console.log(err)
        res.json({
            message : "Error "
        })
    })
}

const findAll = async (req,res) => {
    const user = await usermodel.find({});
    res.json(user)
  };

module.exports = {
    register,
    login,
    findAll
}
