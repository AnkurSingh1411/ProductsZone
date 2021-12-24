const User = require ("../models/authmodel")
const moment = require ('moment-timezone')

const Subscription = async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.token_data._id)
    if (user){

    var subscribed = new User({
        date :new Date(),
        expirydate :new Date (moment().add(1,"year").format('YYYY-MM-DD')),
        access : true
    })
    a= await subscribed.save()
    res.json({
        message : "data has been saved",
        data : a
    })  
}
}
module.exports = {Subscription}