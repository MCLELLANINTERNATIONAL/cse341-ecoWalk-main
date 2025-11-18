const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    //#swagger.tags = ['Coastal Hikes']
    const coastalHikes = await mongodb
      .getDatabase()
      .collection('coastalHikes')
      .find()
      .toArray();

    res.status(200).json(coastalHikes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Coastal Hikes']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid coastal hike id to find a coastal hike.');
  }

  const coastalHikeId = new ObjectId(req.params.id);
  try {
    const coastalHike = await mongodb
      .getDatabase()
      .collection('coastalHikes')
      .findOne({ _id: coastalHikeId });

    if (!coastalHike) {
      return res.status(404).json({ message: 'Coastal hike not found' });
    }

    res.status(200).json(coastalHike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCoastalHike = async (req, res) => {
  //#swagger.tags = ['Coastal Hikes']
  const coastalHike = {
    name: req.body.name,
    region: req.body.region,
    difficulty: req.body.difficulty,
    distanceKm: req.body.distanceKm, 
    description: req.body.description,
    price: req.body.price,
    availableDates: req.body.availableDates
  };

  try {
    const response = await mongodb
      .getDatabase()
      .collection('coastalHikes')
      .insertOne(coastalHike);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Coastal hike created successfully',
        coastalHikeId: response.insertedId,
        coastalHike: coastalHike
      });
    } else {
      res.status(500).json({
        error:
          response.error ||
          'Some error occurred while creating the coastal hike.'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCoastalHike = async (req, res) => {
  //#swagger.tags = ['Coastal Hikes']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid coastal hike id to update a coastal hike.');
  }

  const coastalHikeId = new ObjectId(req.params.id);
  const coastalHike = {
    name: req.body.name,
    region: req.body.region, 
    difficulty: req.body.difficulty,
    distanceKm: req.body.distancekm,
    description: req.body.description,
    price: req.body.price,
    availableDates: req.body.availableDates
  };

  try {
    const response = await mongodb
      .getDatabase()
      .collection('coastalHikes')
      .replaceOne({ _id: coastalHikeId }, coastalHike);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Coastal hike updated successfully' });
    } else {
      res
        .status(404)
        .json({ message: 'Coastal hike not found or no changes applied' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCoastalHike = async (req, res) => {
  //#swagger.tags = ['Coastal Hikes']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid coastal hike id to delete a coastal hike.');
  }

  const coastalHikeId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .collection('coastalHikes')
      .deleteOne({ _id: coastalHikeId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Coastal hike deleted successfully' });
    } else {
      res.status(404).json({ message: 'Coastal hike not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCoastalHike,
  updateCoastalHike,
  deleteCoastalHike
};
