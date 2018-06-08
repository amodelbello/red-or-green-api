const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: '{VALUE} is not a valid ObjectId'
    },
  },
  categoryId: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: '{VALUE} is not a valid ObjectId'
    },
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