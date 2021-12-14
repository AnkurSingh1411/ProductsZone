const { userid } = require('./controllers/cart');
const User = require('./models/authmodel') 


// Middleware for the permission of a role wheather its admin or a Vendor

const authpermission = (permissions) =>{
    return async (req,res,next) => {
        const userrole = await User.findById(req.token_data._id);
        if (permissions.includes(userrole.role)){
            next()
        }else{
            return res.status(401).json("Sorry! you don't have permissions")
        }
    }

}
console.log("the current role is ",authpermission.userrole)


const authVendor = async (req, res, next) => {
    try {
      const user = await User.findOne({
        _id: req.user.id,
      });
      if (user.role === "user" || user.role === "admin") {
        return res.status(400).json({ msg: "Vendor Recources Access Denied." });
      }
      next();
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  };




const adminMiddleware = (req,res,next)=>{
    console.log(req.user.role)
    if (req.user.role!=='admin'){
        return res.status(400).json({message : "access denied"})
    }
    next()
}

module.exports= 
    {authpermission,
    adminMiddleware,
    authVendor,
}
