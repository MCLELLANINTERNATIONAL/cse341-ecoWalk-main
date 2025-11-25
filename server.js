const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongodb = require('./data/database');
const passport = require('./config/passport');
const session = require('express-session');
const cors = require('cors');

dotenv.config();

// Register global uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});  

const port = process.env.PORT || 3005;
const app = express();

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }))
  // This is the basic express session({..}) initialization.
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, z-key, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, OPTIONS, DELETE'
    );
    next();
  })
  .use(cors({ 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
  }))
  .use('/', require('./routes/index'));

// Root route – use req.user (Passport)
app.get('/', (req, res) => {
  const user = req.session.user || req.user;

  if (user) {
    return res.send(`Logged in as ${user.displayName || user.username}`);
  }

  return res.send("Logged Out");
});

// GitHub OAuth login route
app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + (port));})
  }
});
