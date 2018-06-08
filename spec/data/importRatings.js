const fs = require('fs');
const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');

const run = async (file = 'ratings.json') => {
  const json = JSON.parse(fs.readFileSync(`${__dirname}/seed/${file}`));
  return new Promise((resolve, reject) => {
    try {
      Rating.insertMany(json).then(() => {
        return resolve();
      });
    } catch(e) {
      return reject();
    }
  });
};

module.exports = {
  run
}