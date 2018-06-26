const mongoose = require('mongoose');

const objectIdValidator = {
  validator: (v) => {
    return mongoose.Types.ObjectId.isValid(v);
  },
  message: '{VALUE} is not a valid ObjectId'
};

module.exports = {
  objectIdValidator,
};