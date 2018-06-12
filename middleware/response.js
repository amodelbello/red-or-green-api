const app = require('../app');

const isDevOrTesting = (req) => {
  // TODO: Should probably use process.env here
  return (req.app.get('env') === 'development' || req.app.get('env') === 'test');
};

const addBodyPropertyToResponse = () => {
  return (req, res, next) => {
    res.body = {};
    next();
  }
};

const addCallingMethodToResponse = (methodName) => {
  return (req, res, next) => {
    if (isDevOrTesting(req)) {
      res.body.callingMethod = methodName;
    } 
    next();
  }
};

module.exports = {
  addBodyPropertyToResponse,
  addCallingMethodToResponse,
};

