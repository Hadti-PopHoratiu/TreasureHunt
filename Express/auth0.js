module.exports = (app, index) => {

    console.log(index + ". Auth0 service starting...");
    console.log("");

    require('./app/routes/auth0.routes.js')(app);
}