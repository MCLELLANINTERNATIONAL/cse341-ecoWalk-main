const express = require('express');
const router = express.Router();

const trailsController = require('../controllers/trails');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', trailsController.getAll);

router.get('/:id', trailsController.getSingle);

router.post('/', isAuthenticated, validation.saveTrails, trailsController.createTrail);

router.put('/:id', isAuthenticated, validation.saveTrails, trailsController.updateTrail);

router.delete('/:id', isAuthenticated, trailsController.deleteTrail);

module.exports = router;
