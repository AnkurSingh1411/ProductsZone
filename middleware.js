const User = require('./models/authmodel')
const Usermodel = require('./models/authmodel')


const authPage = (permissions) =>{
    return (req,res,next) => {
        const userrole = req.body.role
        if (permissions.includes(userrole)){
            next()
        }else{
            return res.status(401).json("Sorry! you don't have permissions")
        }
    }

}

const authProducts = (req,res,next) =>{
    const ProdId = req.params.id
    if (Usermodel._id.includes(ProdId)){
        next()
    }else{
        return res.status(401).json("you are not allowed to fetch the data")
    }
    
}

module.exports = {
    authPage,
    authProducts
}