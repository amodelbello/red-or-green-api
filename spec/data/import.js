const mongoose = require('mongoose');
const businessesImporter = require('./importBusinesses');

const run = async () => {
  try {
    await mongoose.connection.dropDatabase()
    await businessesImporter.run();
  } catch(e) {
    console.log(e);
  }
};

module.exports.fakeBusinessId = '5b14b27d3450501de43d2f98';
module.exports.run = run;