const User = require ("../models/authmodel")
const moment = require ('moment-timezone')

// const Subscription = async (req,res,next)=>{
//     const user = await User.findByIdAndUpdate(req.token_data._id)
//     if (user){

//     var subscribed = new User({
//         date :new Date(moment().tz('Asia/Kolkata').format('YYYY-MM-DD')) ,
//         expirydate :new Date (moment().add(1,"year").format('YYYY-MM-DD')),
//         access : true
//     })
   
//     a= await subscribed.save()
//     console.log(a)
//     res.json({
//         message : "data has been saved",
//         data : a
//     })  
    
// }
// }

const Subscription = async (req, res, next) => {
        try {
            // let user =  await User.findById(req.token_data._id)
            // const userid = user._id
            const userid = req.token_data._id


            let updateddata = {
                date : moment().tz('Asia/Kolkata').format('YYYY-MM-DD'),
                expirydate : moment().add(1,"year").format('YYYY-MM-DD')
            }
            const updata = await User.findOneAndUpdate(userid, { $set: updateddata })
            res.json({
                status : 200,
                message : "data has been updated",
                data : updata
            })
            console.log("data has been updated")
    
        }
        catch (err) {
            res.send('An error occured :' + err)
        }
    }
    // data = await User.updateMany({_id: req.token_data._id}
    //     , {$set: {date: moment().tz('Asia/Kolkata').format('YYYY-MM-DD'),expirydate: moment().add(1,"year").format('YYYY-MM-DD')}}).exec((err, data) => {
    //         if (err) {
    //         res.send(err) 
    //         console.log(err)                }                
    //         else {
    //         res.json({ "message": "User Updated Successfully" })                    
    //     console.log(data)}})} 
    

// const newdate =moment().tz('Asia/Kolkata').format('YYYY-MM-DD')
// const expirydate =moment().add(1,"year").format('YYYY-MM-DD')
// console.log(expirydate)
// c
module.exports = {Subscription}
// console.log(momen().tz("Asia/Kolkata").format())
// console.log(momen(new Date()).tz("Asia/Kolkata").format())