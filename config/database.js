// Load modules
const mongoose = require('mongoose');

// Load env
const environment = require('./environment');

module.exports = class Database {
  static async connect() {
    try {
      await mongoose.connect(environment.database.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('** Connection to database has been established successfully **');
    } catch (error) {
      console.log(`Unable to connect to database: ${error.message.split('\n')[0]}`);
    }
  }
};
