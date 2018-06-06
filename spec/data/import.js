const fs = require('fs');
const mongoose = require('mongoose');
const Business = mongoose.model('Business');

const run = (file = 'seed.json') => {
  const json = JSON.parse(fs.readFileSync(`${__dirname}/${file}`));
  console.log(json);
  console.log('DATABASE NAME:');
  console.log(mongoose.connection.db.databaseName);
  loadBusinesses(json);
};

async function loadBusinesses(json) {
  try {
    await mongoose.connection.db.dropCollection('businesses');
    await Business.insertMany(json);
    console.log('Done!');
    // process.exit();
  } catch(e) {
    console.log(e);
    // process.exit();
  }
};

module.exports = {
  run
}