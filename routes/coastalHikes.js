const express = require('express');
const router = express.Router();

const coastalHikesController = require('../controllers/coastalHikes');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', coastalHikesController.getAll);

router.get('/:id', coastalHikesController.getSingle);

router.post('/', isAuthenticated, validation.saveCoastalHikes, coastalHikesController.createCoastalHike);

router.put('/:id', isAuthenticated, validation.saveCoastalHikes, coastalHikesController.updateCoastalHike);

router.delete('/:id', isAuthenticated, coastalHikesController.deleteCoastalHike);

module.exports = router;
