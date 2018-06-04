const express = require('express');
const app = require('../app');

const isDevOrTesting = (req) => {
  return (req.app.get('env') === 'development' || req.app.get('env') === 'test');
};

exports.addBodyPropertyToResponse = () => {
  return (req, res, next) => {
    res.body = {};
    next();
  }
};

exports.addCallingMethodToResponse = (methodName) => {
  return (req, res, next) => {
    if (isDevOrTesting(req)) {
      res.body.callingMethod = methodName;
    } 
    next();
  }
};

