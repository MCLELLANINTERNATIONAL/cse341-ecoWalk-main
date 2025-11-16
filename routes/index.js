const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags = ['Hello World']
    res.send('Hello World!'); });

router.use('/contacts', require('./coasdtalHikes'));
router.use('/trails', require('./trails'));

module.exports = router;