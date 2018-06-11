const jwt = require('express-jwt');
const responseHelper = require('../helpers/response');

module.exports.authenticationGuard = () => {
  return jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
  });
};

module.exports.allowedRoles = (roles) => {
  return (req, res, next) => {
    const userRole = req.payload.role /* istanbul ignore next */ || 'default';
    if (roles.includes(userRole)) {
      next();
    } else {
      responseHelper.respond(403, res, "User is not authorized");
      return;
    }
  };
}