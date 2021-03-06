const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectIdValidator = require('../helpers/utility').objectIdValidator;


const schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: objectIdValidator,
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
    validate: objectIdValidator,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
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