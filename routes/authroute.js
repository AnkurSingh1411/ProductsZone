const express = require ('express')
const router = express.Router()
// const passportroute=require('../passport_setup')
const Authcontoller = require ("../controllers/authcontroller")
// const cookieSession = require('cookie-session');
const passport = require('passport')
const usermodel = require("../models/authmodel");
const { route } = require('./product');

// const {verifyToken} = require("../jwt/jwt_operations")
router.post('/register',Authcontoller.register)
router.post('/login',Authcontoller.login)
router.get('/users',Authcontoller.findAll)

// Oauth things ======

router.get("/",(req,res)=>{
    res.send("You are not logged in")

})


router.get("/failed", (req, res) => {
    res.send("Failed")
})

router.get("/success", (req, res) => {
    // res.send(`Welcome ${req.user.email}`)
    res.send("You are now logged in")
})

router.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);
module.exports = router