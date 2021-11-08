const authPage = (permissions)=>{
    return (req,res,next)=>{
        const UserRole = req.body.name
        // const UserRole = req.b
        if (permissions.includes(UserRole)){
            next()
        }else{
            return res.status(401).json("You don't have permissions") }
        }    
}
module.exports= authPage
