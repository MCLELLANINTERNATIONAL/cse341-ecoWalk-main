const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => { 
  //#swagger.tags = ['Hello World']
  res.send('Hello World!');
});

// Collections
router.use('/coastalHikes', require('./coastalHikes')); // 
router.use('/trails', require('./trails'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/lougout', function (req, res, next){
  req.logout(function(err){
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;