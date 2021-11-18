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




const authRole  = (role)=>{
return (req,res,next)=>{
    if (req.user.role!==role){
        res.status(401)
        return res.send("not allowed!")
    }
    next()
}
}

module.exports= {
    authRole,
    authpermission
}