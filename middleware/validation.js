const express = require('express');
const app = require('../app');
const mongoose = require('mongoose');
const responseHelper = require('../helpers/response');

const hasValidObjectId = (idField) => {

  return (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params[idField])) {
      next();
    } else {
      responseHelper.respond(400, res, `Error: invalid ${idField}`);
    }
  };
};

const requiredInBody = (field) => {
  return (req, res, next) => {
    if (propertyExists(getParsedFieldFromRequest(field, req))) {
      next();
    } else {
      responseHelper.respond(400, res, `Error: ${field} is required in request body`);
    }
  };
};

const requiredInParams = (field) => {
  return (req, res, next) => {
    if (propertyExists(req.params[field])) {
      next();
    } else {
      responseHelper.respond(400, res, `Error: ${field} is required in request params`);
    }
  };
};

const propertyExists = (property) => {
  if (
    property !== null &&
    property !== undefined
  ) {
    return true;
  } else {
    return false;
  }
};

const parseField = (field) => {
  return field.split('.');
};

const getParsedFieldFromRequest = (fieldString, req) => {
  let value = req.body;
  const fieldArray = fieldString.split('.');
  for (let field of fieldArray) {
    value = value[field];
  }

  return value;
};

module.exports = {
  hasValidObjectId,
  requiredInBody,
  requiredInParams,
}

