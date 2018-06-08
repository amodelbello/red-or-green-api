const mongoose = require('mongoose');
const businessesImporter = require('./importBusinesses');
const categoriesImporter = require('./importCategories');

const run = async () => {
  try {
    await mongoose.connection.dropDatabase()
    await businessesImporter.run();
    await categoriesImporter.run();
  } catch(e) {
    console.log(e);
  }
};

module.exports.run = run;