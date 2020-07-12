const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const geolib = require('geolib');
const locationModel = require('./app/models/location.model.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const path = require('path');
// const multer = require('multer');

// app.use("/public", express.static(path.resolve(__dirname, 'public')));

// app.get("/uploads/:imageName", function (req, res) {
//   res.sendFile(__dirname + "/uploads/" + req.params.imageName + ".jpg")
// });

// const DIR = './uploads';

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
//let upload = multer({ storage: storage });



console.log("Start services:");
require('./db.js')(app);
require('./cors.js')(app, 1);
require('./auth0.js')(app, 2);


////////////////////////////////////////////////////////

require('dotenv').config();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encryped: true,
});

let visitedLocations = {};

app.post('/ping/:accessToken', (req, res, next) => {
  const { lat, lng } = req.body;
  const data = {
    lat,
    lng,
  };

  locationModel.find({}).then(locations => {
    
    for (let index = 0; index < locations.length; index++) {
      polygon = [];
      for (let index2 = 0; index2 < locations[index].shape.additionalPoints.length; index2++) {
        const element = locations[index].shape.additionalPoints[index2];
        polygon.push({lat: element.lat, lng: element.lng})
      }
      if (geolib.isPointInPolygon(data, polygon)) {
        let unique = req.params.accessToken + locations[index].name;
        if (visitedLocations[unique] == undefined) {
          visitedLocations[unique] = 1;
          pusher.trigger(req.params.accessToken, 'notification', {message: `Bine ai venit la ${locations[index].name}!`});
        }
      }
    }
  });
  res.json(data);
});

////////////////////////////////////////////////////////


console.log("");

// app.post('/api/upload', upload.single('photo'), function (req, res) {
//   if (!req.file) {
//     console.log("No file received");
//     return res.send({
//       success: false
//     });

//   } else {
//     console.log('file received');
//     var path = req.file.path;
//     console.log(this.path);
//     return res.send({
//       success: true
//     })
//   }
// });

// Require Users routes
require('./app/routes/location.routes.js')(app);
require('./app/routes/user.routes.js')(app);


app.listen(PORT, "0.0.0.0",() => {
  console.log("Server is listening on port " + PORT);
});