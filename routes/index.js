const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate')

// Swagger docs
router.use('/api-docs', require('./swagger'));

/*router.get('/', (req, res) => { 
  //#swagger.tags = ['Hello World']
  res.send('Hello World!');
});*/

// Collections
router.use('/coastalHikes', require('./coastalHikes')); 
router.use('/trails', require('./trails'));


// GitHub login – start auth flow
router.get('/login', passport.authenticate('github'), (req, res) => {});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect('/')
  })
})

router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: `Hi ${req.user.displayName || req.user.username}` })
})

module.exports = router