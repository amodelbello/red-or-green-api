const express = require('express');
const app = require('../app');

const isDevOrTesting = (req) => {
  return (req.app.get('env') === 'development' || req.app.get('env') === 'test');
};

exports.addCallingMethodToResponse = (methodName) => {
  return (req, res, next) => {
    const addMethodToResponse = isDevOrTesting(req);
    if (addMethodToResponse) {
      res.callingMethod = methodName;
    } else {
      res.callingMethod = null;
    }
    next();
  }
};

