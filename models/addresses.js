const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
  },
  street2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
});

exports.addressSchema = addressSchema;