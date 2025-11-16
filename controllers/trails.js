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
      return res.status(400).json('Must use a valid trail id to find a trail.');
    }
    const contactId = new ObjectId(req.params.id);
    try {
      const contact = await mongodb
        .getDatabase()
        .db()
        .collection('trails')
        .findOne({ _id: contactId });
   
      if (!contact) {
        return res.status(404).json({ message: 'Trail not found' });
      }
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//create contact
const createContact = async (req, res) => {
    //#swagger.tags = ['Trails']
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
        .collection('trails')
        .insertOne(contact);
   
      if (response.acknowledged) {
        res.status(201).json({
          message: 'Trail created successfully',
          contactId: response.insertedId,
          contact: contact
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
  
  // update contact
const updateContact = async (req, res) => {
//#swagger.tags = ['Trails']
if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid trail id to update a trail.');
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
    .collection('trails')
    .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
    res.status(200).json({ message: 'Trail updated successfully' });
    } else {
    res.status(404).json({ message: 'Trail not found or no changes applied' });
    }
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

// delete contact

const deleteContact = async (req, res) => {
//#swagger.tags = ['trails']
if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid trail id to delete a contact.');
}

const contactId = new ObjectId(req.params.id);

try {
    const response = await mongodb
    .getDatabase()
    .db()
    .collection('trails')
    .deleteOne({ _id: contactId });

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
    createContact,
    updateContact,
    deleteContact
};