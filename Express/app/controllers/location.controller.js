const locationModel = require('../models/location.model.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Create and Save a new Note
exports.create = (req, res) => {

};

//Get list with all locations by adminID
exports.getAllLocationByAdminID = async (req, res, next) => {
  await locationModel.find({ admin_id: req.params.admin_id })
    .then((allUsers) => {
      return res.status(200).json(allUsers);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};

//Get one location By ID
exports.getLocationByID = async (req, res, next) => {
  await locationModel.findById(req.params.location_id)
    .then((allUsers) => {
      return res.status(200).json(allUsers);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};

exports.post = async (req, res, next) => {
  var tempLocation = req.body;

  tempLocation._id = mongoose.Types.ObjectId();

  tempLocation.admin_id = mongoose.Types.ObjectId(req.body.admin_id);

  var location = new locationModel(tempLocation);

  var result = await location.save();

  res.send(result);
};

//Get all locations
exports.getAllLocations = async (req, res, next) => {
  await locationModel.find({})
    .then((allLocations) => {
      return res.status(200).json(allLocations);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};


// Update a note identified by the noteId in the request
exports.update = async (req, res, next) => {
  await locationModel.findByIdAndUpdate(
    req.params.location_id,
    req.body,
    { new: true }
  )
  .then(() => {
    return res.status(200).json({ updated: "true" });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  });
next();
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res, next) => {
  await locationModel.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      return res.status(200).json({ deleted: "true" });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
  next();
};
