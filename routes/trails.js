const express = require('express');
const router = express.Router();

const trailsController = require('../controllers/trails');
const { saveTrails } = require('../middleware/validate');

router.get('/', trailsController.getAll);

router.get('/:id', trailsController.getSingle);

router.post('/', saveTrails, trailsController.createTrail);

router.put('/:id', saveTrails, trailsController.updateTrail);

router.delete('/:id', trailsController.deleteTrail);

module.exports = router;