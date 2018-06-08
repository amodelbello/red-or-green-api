const mongoose = require('mongoose');
const businessesImporter = require('./importBusinesses');
const categoriesImporter = require('./importCategories');
const ratingsImporter = require('./importRatings');

const run = async () => {
  try {
    await mongoose.connection.dropDatabase()
    await businessesImporter.run();
    await categoriesImporter.run();
    await ratingsImporter.run();
  } catch(e) {
    console.log(e);
  }
};

module.exports.run = run;