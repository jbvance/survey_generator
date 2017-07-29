const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    //user already exists with given profile id
                    // call done - first arg is err, second arg is user record
                    done(null, existingUser);
                } else {
                    //No user id, create one now
                    new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
                }
            })
    })
);
