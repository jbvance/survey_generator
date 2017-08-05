const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //thirty days
    keys: [keys.cookieKey]
  })
);

//tell passport it should use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Only run this in production. In dev, create-react-app
// server handles the react routing stuff
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  // If any get request comes in for a route, file, or anything,
  // and we don't have a route already set up for it, look inside the
  // referenced folder below and try to find it. If it's there, respond with that file
  app.use(express.static('client/build'));

  // Express will serve up index.html file if it
  // doesn't recognize the route from anything listed above in the file
  // this is the catchall in case no other route was recognized
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('app listening on PORT ', PORT);
