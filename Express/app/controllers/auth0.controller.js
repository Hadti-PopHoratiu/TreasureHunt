const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userModel = require('../models/user.model.js');

exports.private = (req,res) => {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
}

exports.external = (req,res) =>{
  res.send({
    msg: "Your Access Token was successfully validated!"
});
}

exports.public = (req,res) =>{
  res.send({
    msg: "You can see this without token!"
});
}

exports.userVerify = (req, res) => {
  return userModel.findOne({ email: req.body.email, userRole: req.body.user_role })
    .then((theUser) => {
      console.log(theUser);
      if (theUser == null) {
        if (req.body.user_role == 2) {

          let tempUser = {
            _id: mongoose.Types.ObjectId(),
            lastname: req.body.family_name,
            firstname: req.body.given_name,
            email: req.body.email,
            sub: req.body.sub,
            userRole: req.body.user_role
          }
          let user = new userModel(tempUser);
          user.save();
          return res.send({});
        }
        return res.sendStatus(401);
      }
      return res.send({});
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};




// app.post("/api/user_verify", checkJwt, (req, res) => {
//   return userModel.User.findOne({ email: req.body.email, userRole: req.body.user_role })
//       .then((theUser) => {
//           console.log(theUser);
//           if (theUser == null) {
//               if (req.body.user_role == 2) {

//                   let tempUser = {
//                       _id: mongoose.Types.ObjectId(),
//                       lastname: req.body.family_name,
//                       firstname: req.body.given_name,
//                       email: req.body.email,
//                       sub: req.body.sub,
//                       userRole: req.body.user_role
//                   }

//                   let user = new userModel.User(tempUser);

//                   user.save();
//                   return res.send({});
//               }
//               return res.sendStatus(401);
//           }
//           return res.send({});
//       })
//       .catch((err) => {
//           res.status(500).json({
//               success: false,
//               message: 'Server error. Please try again.',
//               error: err.message,
//           });
//       });
// });
