const passport =require("passport")
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
