module.exports = (app) => {
    const checkJwt = require('../../config/auth0.config')(app);
    const locations = require('../controllers/location.controller.js');

    //Get a location by ID
    app.get('/location/:location_id', locations.getLocationByID);

    //Get all locations on Admin_ID
    app.get('/locations/:admin_id', locations.getAllLocationByAdminID);

    //Get all locations
    app.get('/locations', checkJwt, locations.getAllLocations);

    //Post location
    app.post('/location', checkJwt, locations.post);

    //Put location
    app.put('/location/:location_id', checkJwt, locations.update);

    //Delete a location by ID
    app.delete('/location/delete/:id', locations.delete);
}