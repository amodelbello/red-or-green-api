const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
});

const generateSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

const encrypt = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

schema.methods.setPassword = function(password) {
  this.salt = generateSalt();
  this.hash = encrypt(password, this.salt);
};

schema.methods.validPassword = function(password) {
  const hash = encrypt(password, this.salt);
  return this.hash === hash;
}

schema.methods.generateJwt = function() {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 30);

  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    expiration: parseInt(expiration.getTime() / 1000),
  };

  return jwt.sign(payload, process.env.JWT_SECRET );
}

mongoose.model('User', schema);