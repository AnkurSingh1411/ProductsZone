const express = require("express")
const router = express.Router()
const bodyparser = require('body-parser')

var Publishable_Key = 'pk_test_51K2YRkSFQFrVK8ZoblFveNij7JYn8gZYQrc6li5pY6mTcJ8YHWwSk4XQylhpMmDKUgF4TowBvN9NKS2YYxcXShmp00qCH5vqLX'
var Secret_Key = 'sk_test_51K2YRkSFQFrVK8ZoseEQe3PUDdf6vZHoTq54PNLQAwangkBbroWAOhj2MMDjMGTkwRfBe3XxbB2N0IP8Rmp6Nq4S004tHu51GV'

const stripe = require('stripe')(Secret_Key)
// view engine setup

router.get('/', function(req, res){ 
  res.render('Home', { 
  key: Publishable_Key 
  }) 
  
})
router.post('/payment', function(req, res){ 

  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: 'Ankur Singh', 
      address: { 
          line1: 'TC 56 mig colony', 
          postal_code: '110092', 
          city: 'Indore', 
          state: 'Madhya-Pradesh', 
          country: 'India', 
      } 
  }) 
  .then((customer) => { 
    return stripe.charges.create({ 
          amount: 7000,    // Charing Rs 25 
          description: 'Web Development Product', 
          currency: 'USD', 
          customer: customer.id 
      }); 
  }) 
  .then((charge) => { 
      res.send("Success") // If no error occurs 
  }) 
  .catch((err) => { 
      res.send(err)    // If some error occurs 
      console.log(err)
  }); 
})


module.exports = router