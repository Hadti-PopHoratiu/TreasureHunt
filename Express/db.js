module.exports = (app) => {
    const dbConfig = require('./config/database.config.js');
    const mongoose = require('mongoose');

    mongoose.Promise = global.Promise;
    // Connecting to the database//
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true, useFindAndModify: false
    }).then(() => {
        console.log("Successfully connected to the MongoDB database!");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}