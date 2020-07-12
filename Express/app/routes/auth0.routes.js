module.exports = (app) => {
    const checkJwt = require('../../config/auth0.config')(app);
    const auth0Controller = require('../controllers/auth0.controller.js');

    app.post('/api/user_verify', checkJwt, auth0Controller.userVerify);
    app.post('/api/private', checkJwt, auth0Controller.private);
    app.get('/api/external', checkJwt, auth0Controller.external);
    app.get('/api/public', auth0Controller.public);
}