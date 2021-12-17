const express = require('express')

const router = express.Router()

const passport = require('passport')

const facebookStrategy = require('passport-facebook').Strategy

// app.set("view engine","ejs")

// app.use(passport.initialize());
//     app.use(passport.session()); 

passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : "603496006962121",
    clientSecret    : "c63a6f6f8189ed75b5958b2c0c0e7341",
    callbackURL     : "http://localhost:3400/facebook/callback",
    profileFields   : ['id','displayName','name','gender','picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    console.log(profile)
    return done(null,profile)
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    return done(null,user)
});

router.get('/profile',(req,res) => {
    res.send("Sorry you are not able to see login inputs of facebook here . kyunki mera facebook developer account nahin ban pa raha hai . Email kuch issue kar raha hai")
})

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,user_photos' }));

router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

router.get('/fb',(req,res) => {
    res.render("facebook")
})


module.exports = router