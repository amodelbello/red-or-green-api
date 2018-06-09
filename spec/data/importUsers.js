const fs = require('fs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const run = async (file = 'users.json') => {
  const json = JSON.parse(fs.readFileSync(`${__dirname}/seed/${file}`));
  return new Promise((resolve, reject) => {
    try {
      User.insertMany(json).then(() => {
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