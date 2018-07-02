const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectIdValidator = require('../helpers/utility').objectIdValidator;
const addressSchema = require('./addresses').addressSchema;

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: false,
  },
  phone: {
    type: String,
  },
  ratings: [{
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      validate: objectIdValidator
    },
    averageRating: {
      type: Number,
      'default': 0,
      min: 0,
      max: 5,
    },
  }],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Business', businessSchema);