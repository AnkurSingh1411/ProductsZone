require('./app')
function setUser(req,res,next){
    const userId = req.body.userId
    if (userId){
        req.user = user.find(user=>user.id===userId)

    }
    next()
}

function  authUser(req,res,next){
    if (req.user==null){
        res.status(403)
        res.json("you need to sign in to open this page")
    }
}

module.exports = {
    authUser
}