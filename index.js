const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //thirty days
        keys: [keys.cookieKey],
    })    
);

//tell passport it should use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT);

console.log("app listening on PORT ", PORT);