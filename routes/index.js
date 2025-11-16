const router = require('express').Router();

// Swagger UI at /api-docs
router.use('/api-docs', require('./swagger'));

// Root route
router.get('/', (req, res) => { 
  //#swagger.tags = ['Hello World']
  res.send('Hello World!');
});

// Collections
router.use('/coastalHikes', require('./coastalHikes')); // 
router.use('/trails', require('./trails'));

module.exports = router;