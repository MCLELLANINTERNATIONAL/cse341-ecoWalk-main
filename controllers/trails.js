const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    //#swagger.tags = ['Trails']
    const trails = await mongodb
      .getDatabase()
      .db()
      .collection('trails')
      .find()
      .toArray();

    res.status(200).json(trails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Trails']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid trail id to find a trail.');
  }

  const trailId = new ObjectId(req.params.id);
  try {
    const trail = await mongodb
      .getDatabase()
      .db()
      .collection('trails')
      .findOne({ _id: trailId });

    if (!trail) {
      return res.status(404).json({ message: 'Trail not found' });
    }

    res.status(200).json(trail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTrail = async (req, res) => {
  //#swagger.tags = ['Trails']
  const trail = {
    name: req.body.name,
    location: req.body.location,
    difficulty: req.body.difficulty,
    distancekm: req.body.distancekm,
    description: req.body.description,
    price: req.body.price,
    availableDates: req.body.availableDates
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('trails')
      .insertOne(trail);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Trail created successfully',
        trailId: response.insertedId,
        trail: trail
      });
    } else {
      res.status(500).json({
        error: response.error || 'Some error occurred while creating the trail.'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTrail = async (req, res) => {
  //#swagger.tags = ['Trails']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid trail id to update a trail.');
  }

  const trailId = new ObjectId(req.params.id);
  const trail = {
    name: req.body.name,
    region: req.body.region,
    difficulty: req.body.difficulty,
    distancekm: req.body.distancekm,
    description: req.body.description,
    price: req.body.price,
    availableDates: req.body.availableDates
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('trails')
      .replaceOne({ _id: trailId }, trail);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Trail updated successfully' });
    } else {
      res
        .status(404)
        .json({ message: 'Trail not found or no changes applied' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTrail = async (req, res) => {
  //#swagger.tags = ['Trails']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid trail id to delete a trail.');
  }

  const trailId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('trails')
      .deleteOne({ _id: trailId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Trail deleted successfully' });
    } else {
      res.status(404).json({ message: 'Trail not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTrail,
  updateTrail,
  deleteTrail
};
