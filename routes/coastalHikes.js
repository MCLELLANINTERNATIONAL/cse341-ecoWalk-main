const express = require('express');
const router = express.Router();

const coastalHikesController = require('../controllers/coastalHikes');
const { saveCoastalHikes } = require('../middleware/validate');

router.get('/', coastalHikesController.getAll);

router.get('/:id', coastalHikesController.getSingle);

router.post('/', saveCoastalHikes, coastalHikesController.createCoastalHike);

router.put('/:id', saveCoastalHikes, coastalHikesController.updateCoastalHike);

router.delete('/:id', coastalHikesController.deleteCoastalHike);

module.exports = router;