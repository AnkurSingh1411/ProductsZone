const User = require('./models/authmodel') 


// Middleware for the permission of a role wheather its admin or a Vendor

const authpermission = (permissions) =>{
    return async (req,res,next) => {
        const userrole = await User.findById(req.token_data._id);
        // console.log("the role is"+ userrole)
        if (permissions.includes(userrole.role)){
            next()
        }else{
            return res.status(401).json("Sorry! you don't have permissions")
        }
    }

}


const adminMiddleware = (req,res,next)=>{
    console.log(req.user.role)
    if (req.user.role!=='admin'){
        return res.status(400).json({message : "access denied"})
    }
    next()
}

module.exports= {
    authpermission,
    adminMiddleware
}