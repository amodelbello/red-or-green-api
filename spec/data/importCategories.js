const fs = require('fs');
const mongoose = require('mongoose');
const Business = mongoose.model('Category');

const run = async (file = 'categories.json') => {
  const json = JSON.parse(fs.readFileSync(`${__dirname}/seed/${file}`));
  return new Promise((resolve, reject) => {
    try {
      Business.insertMany(json).then(() => {
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