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
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // we already have a record with the given profile id
        return done(null, existingUser);
      }

      // we don't have a user record with this ID, make a new record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
