// Load database config
const Database = require('./config/database');

// connect to mongo db
Database.connect();

// Load express config
const app = require('./config/express');

module.exports = app;
