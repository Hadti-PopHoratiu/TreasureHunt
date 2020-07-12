module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const checkJwt = require('../../config/auth0.config')(app);

    //Get all user with minimal no. of properties.
    app.get('/user', users.getShort);

    app.get('/user/:user_id',users.getUserByID);

    app.get('/user/id/:sub', checkJwt,users.getUserID);

    
}