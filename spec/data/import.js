const mongoose = require('mongoose');
const businessesImporter = require('./importBusinesses');
const categoriesImporter = require('./importCategories');
const ratingsImporter = require('./importRatings');
const usersImporter = require('./importUsers');

const run = async (cb) => {
  try {

    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot import data in production mode.');
    }

    await mongoose.connection.dropDatabase()
    await businessesImporter.run();
    await categoriesImporter.run();
    await ratingsImporter.run();
    await usersImporter.run();

    if (cb !== undefined) {
      cb(true);
    }
  } catch(e) {
    console.log(e);
    cb(false);
  }
};

module.exports.run = run;