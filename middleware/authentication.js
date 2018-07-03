const jwt = require('express-jwt');
const responseHelper = require('../helpers/response');

const authenticationGuard = () => {
  return jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
  });
};

const allowedRoles = (roles) => {
  return (req, res, next) => {
    const userRole = req.payload.role /* istanbul ignore next */ || 'default';
    if (roles.includes(userRole)) {
      next();
    } else {
      responseHelper.respond(403, res, "17: User is not authorized");
      return;
    }
  };
}

const userOwnsDocument = (userIdFieldName = '_id', documentUserIdFieldName = 'userId') => {
  return (req, res, next) => {
    if (req.payload.role === 'super') {
      next();
    } else if (req.payload[userIdFieldName] === req.body[documentUserIdFieldName]) {
      next();
    } else {
      responseHelper.respond(403, res, "28: User is not authorized");
      return;
    }
  }
}

module.exports = {
  authenticationGuard,
  allowedRoles,
  userOwnsDocument,
}