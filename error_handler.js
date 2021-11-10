const multer = require('multer')

require('./routes/product')

function errhandler(err,req,res,next){
    if (err instanceof multer.MulterError){
        res.json({
            success : 0,
            message : err.message
        })
    }
}

module.exports = errhandler