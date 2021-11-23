const express = require ('express')
const router = express.Router()
const passportroute=require('../passport_setup')
const Authcontoller = require ("../controllers/authcontroller")
// const cookieSession = require('cookie-session');
const passport = require('passport')
const usermodel = require("../models/authmodel");
const { route } = require('./product');


// const {verifyToken} = require("../jwt/jwt_operations")
router.post('/register',Authcontoller.register)
router.post('/login',Authcontoller.login)
router.get('/users',Authcontoller.findAll)
router.get("/vendors",Authcontoller.Allvendors)

// Oauth things ======
const GoogleStrategy = require('passport-google-oauth2').Strategy;
// require('dotenv').config()

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"787390846614-ugu8k2s1fu772vnbsik3qdbokmo1e19m.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"/auth/google/callback",
        passReqToCallback : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        //if user already exixts in the database    
        return done(null, {});
    }

));

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