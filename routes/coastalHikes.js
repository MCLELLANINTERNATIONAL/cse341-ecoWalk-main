const express = require('express');
const router = express.Router();

const coastalHikesController = require('../controllers/coastalHikes');
const { saveCoastalHikes } = require('../middleware/validate');

// Get all coastal hikes
router.get('/', coastalHikesController.getAll);

// Get a single coastal hike by id
router.get('/:id', coastalHikesController.getSingle);

// Create a new coastal hike
router.post('/', saveCoastalHikes, coastalHikesController.createCoastalHike);

// Update a coastal hike
router.put('/:id', saveCoastalHikes, coastalHikesController.updateCoastalHike);

// Delete a coastal hike
router.delete('/:id', coastalHikesController.deleteCoastalHike);

module.exports = router;