const mongoose = require ("mongoose")
const Order = require("../models/orders")
const Product = require("../models/productmodel")
const express = require("express")
const { get } = require(".")
const router = express.Router()
const User = require("../models/authmodel")
const auth = require("../jwt/jwt_operations")
const Processing = require("../models/Processed_Order")
const Wishlist = require('../models/wishlist')
const {authenticateToken} = require("../jwt/jwt_operations")
//An api to fetch all the orders

router.get("/",(req,res,next)=>{
    Order.find()
    .exec()
    .then(docs=>{
        res.status(200).json({
            count : docs.length,
            orders  : docs.map(doc=>{
                return{
                    _id : doc._id,
                    product : doc.product,
                    quantity : doc.quantity,
                    request : {
                        Type : 'GET',
                        url : "http://localhost:3400/order/" + doc._id
                    }
                }
            })
        });
    })

    .catch(err=>{
        res.status(500).json({
            error : err
        });
    });
});

// An api to create a new order

router.post ('/',authenticateToken,(req,res,next)=>{

    Product.findById(req.body.productId)
    .then(product=>{
        if (!product){
            return  res.status(404).json({
                message : "product not found"
            })
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            vendor : req.body.vendorId,
            product : req.body.productId
    
        })

order
  .save()
  .then(result =>{
  console.log(result);
            
            res.status(201).json({
                message : "Order Stored",
                createdOrder: {
                    _id : result._id,
                    product : result.product,
                    quantity : result.quantity,
                    vendor : result.vendor
                },
                
                    request : {
                    type : 'GET',
                    url : 'http://localhost:3400/order/' + result._id
                }
              
              
            })
        })
        
.catch(err =>{
        console.log(err)
        res.status(500).json({
        error : err
    })
})
        })
.catch(err =>{
        res.status(500).json({
            message : "Product not found",
            error : err
        })
    })
    
})


// An Api to get the order by its id 

router.get("/:orderId", (req, res, next) => {
    Order.findById(req.params.orderId)
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }

        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:3400/order"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });


// An api to delete the orders by the id


router.delete("/:orderId", (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:3400/orders",
            body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

// An Api by which vendor can find the order related to him 

router.get("/vendor/:orderId", (req, res, next) => {
    Order.find({vendorId:req.params.orderId})
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
      res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:3400/order"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

// Order Acceptance Api for Vendor

router.post("/process/:orderid",(req,res,next)=>{
  const ORder = Order.findById(req.params.orderId)
  if (!ORder){
  res.json({
    message : "Order Processing Failed"
  })

  }
  const OrderToProcess = new Processing({
    _id : mongoose.Types.ObjectId(),
    product : req.body.productId,
    quantity : req.body.quantity
})

const COUNT = Processing.find()
if (COUNT.length===null){
  res.json("order can not be processed, You need to add the desired order")
}

else{
  OrderToProcess.save()
  res.status(200).json("order has been processed")
}
})

module.exports= router
