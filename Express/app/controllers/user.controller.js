const userModel = require('../models/user.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
	
};

// Retrieve and return all user from the database.
exports.getShort = async (req, res, next) => {  
    await userModel.find({},['lastname','firstname','email','avatar'])
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
// Retrieve and return the user with req.params.user_id from the database.
exports.getUserByID = async (req, res, next) => {
  await userModel.findById(req.params.user_id)
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

// Get ID of current logged user.
exports.getUserID = async (req, res, next) => {
  await userModel.findOne({sub:req.params.sub})
    .then((allUsers) => {
      return res.status(200).json({user_id: allUsers._id});
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


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};
