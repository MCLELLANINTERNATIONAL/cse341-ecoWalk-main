const express = require('express');
const router = express.Router();

const coastalHikesController = require('../controllers/costalHikes');
const validation = require('../middleware/validate');

router.get('/', coastalHikesController.getAll);

router.get('/:id', coastalHikesController.getSingle);

router.post('/', validation.saveCoastalHikes, coastalHikesController.createCoastalHike);

router.put('/:id', validation.saveCoastalHikes, coastalHikesController.updateCoastalHike);

router.delete('/:id', coastalHikesController.deleteCoastalHike);

module.exports = router;
