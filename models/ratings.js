const mongoose = require('mongoose');

const objectIdValidator = {
  validator: (v) => {
    return mongoose.Types.ObjectId.isValid(v);
  },
  message: '{VALUE} is not a valid ObjectId'
};

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    validate: objectIdValidator,
  },
  businessId: {
    type: String,
    required: true,
    validate: objectIdValidator,
  },
  categoryId: {
    type: String,
    required: true,
    validate: objectIdValidator,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  comments: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Rating', schema);