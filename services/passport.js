const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// the user arg below is whatever user got pulled out of the db
// from passport.use below, either a new one or an existing one
// this function takes user and turns it into and id that is
// then stuffed into a cookie
passport.serializeUser((user, done) => {
    done(null, user.id); //user.id is the id from MongoDB; this is how mongoose reference it
});


// turns an id into a mongoose user model instance
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

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
