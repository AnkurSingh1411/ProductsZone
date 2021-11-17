const usermodel = require("../models/authmodel")
const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
const {generateAccessToken}=require('../jwt/jwt_operations')



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
        role : req.body.role,
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
        console.log(user.role);
                    res.json({
                        message:'Login Successful',
                        data:user,
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

const funct1=(req)=>{
    return usermodel.findOne({_id:req.body._id})
}

module.exports = {
    funct1,
    register,
    login,
    findAll,
    
}
