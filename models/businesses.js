const mongoose = require('mongoose');
const addressSchema = require('./addresses').addressSchema;

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema
  },
  rating: {
    type: Number,
    'default': 0,
    min: 0,
    max: 5,
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

mongoose.model('Business', businessSchema);