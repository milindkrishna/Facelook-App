const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto')

const User = require('../models/user');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: "74044267259-igh2p3jrj7lp0j9lda8bg2slt69qmmk8.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/user/auth/google/callback",
},

    function(accessToken,refreshToken,profile,done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err) {console.log('error in google strategy',err);
                    return;
            }
            console.log(profile);

            if(user){
                // if found set this user as req.user(signin that user)
                return done(null,user)
            }else{
                // if not found, create the user and set it as req.user(signin that user)
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err) {console.log('error in creating user google strategy-passport',err);
                    return;
                }
                    return done(null,user)
                })
            }
        })
    }

));

module.exports = passport;