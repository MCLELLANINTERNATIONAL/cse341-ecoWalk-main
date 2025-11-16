const express = require('express');
const router = express.Router();

const trailsController = require('../controllers/trails');
const validation = require('../middleware/validate');

router.get('/', trailsController.getAll);

router.get('/:id', trailsController.getSingle);

router.post('/', validation.saveTrails, trailsController.createTrail);

router.put('/:id', validation.saveTrails, trailsController.updateTrail);

router.delete('/:id', trailsController.deleteTrail);

module.exports = router;
