const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => { 
  //#swagger.tags = ['Hello World']
  res.send('Hello World!');
});

// Collections
router.use('/coastalHikes', require('./coastalHikes')); // 
router.use('/trails', require('./trails'));

module.exports = router;