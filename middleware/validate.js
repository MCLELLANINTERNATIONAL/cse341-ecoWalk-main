// middleware/validateCoastalHikesAndTrails.js
const validator = require('../helpers/validate');

// Coastal Hikes validation
const saveCoastalHikes = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    region: 'required|string',
    difficulty: 'required|string',
    distancekm: 'required|numeric',
    description: 'required|string',
    price: 'required|numeric',
    availableDates: 'required|array'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// Trails validation
const saveTrails = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    location: 'required|string',
    difficulty: 'required|string',
    distancekm: 'required|numeric',
    description: 'required|string',
    price: 'required|numeric',
    availableDates: 'required|array'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCoastalHikes,
  saveTrails
};
