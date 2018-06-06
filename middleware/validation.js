const express = require('express');
const app = require('../app');
const mongoose = require('mongoose');
const responseHelper = require('../helpers/response');

exports.hasValidObjectId = (idField) => {

  return (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params[idField])) {
      next();
    } else {
      responseHelper.respond(400, res, 'Error: invalid objectId');
    }
  };
};



