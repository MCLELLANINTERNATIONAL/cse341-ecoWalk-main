const express = require('express');
const router = express.Router();

const trailsController = require('../controllers/trails');
const validation = require('../middleware/validate');

router.get('/', trailsController.getAll);

router.get('/:id', trailsController.getSingle);

router.post('/', validation.saveTrail, trailsController.createTrail);

router.put('/:id', validation.saveTrail, trailsController.updateTrail);

router.delete('/:id', trailController.deleteContact);

module.exports = router;