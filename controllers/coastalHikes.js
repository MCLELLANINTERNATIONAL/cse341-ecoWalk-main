const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try { 
    //#swagger.tags = ['Coastal Hikes']
    const coastalHikes = await mongodb
        .getDatabase()
        .db()
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
      return res.status(400).json('Must use a valid coastal hike id to find a coastal hike.');
    }
    const contactId = new ObjectId(req.params.id);
    try {
      const contact = await mongodb
        .getDatabase()
        .db()
        .collection('coastalHikes')
        .findOne({ _id: contactId });
   
      if (!contact) {
        return res.status(404).json({ message: 'Coastal hike not found' });
      }
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//create contact
const createContact = async (req, res) => {
    //#swagger.tags = ['Coastal Hikes']
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
   
    try {
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('coastalHikes')
        .insertOne(contact);
   
      if (response.acknowledged) {
        res.status(201).json({
          message: 'Contact created successfully',
          contactId: response.insertedId,
          contact: contact
        });
      } else {
        res.status(500).json({
          error: response.error || 'Some error occurred while creating the coastal hike.'
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // update contact
const updateContact = async (req, res) => {
//#swagger.tags = ['Coastal Hikes']
if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid coastal hike id to update a contact.');
}

const contactId = new ObjectId(req.params.id);
const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
};

try {
    const response = await mongodb
    .getDatabase()
    .db()
    .collection('coastalHikes')
    .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
    res.status(200).json({ message: 'Coastal hike updated successfully' });
    } else {
    res.status(404).json({ message: 'Coastal hike not found or no changes applied' });
    }
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

// delete contact

const deleteContact = async (req, res) => {
//#swagger.tags = ['Coastal Hikes']
if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid coastal hike id to delete a contact.');
}

const contactId = new ObjectId(req.params.id);

try {
    const response = await mongodb
    .getDatabase()
    .db()
    .collection('coastalHikes')
    .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
    res.status(200).json({ message: 'Coastal Hike deleted successfully' });
    } else {
    res.status(404).json({ message: 'Coastal Hike not found' });
    }
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};