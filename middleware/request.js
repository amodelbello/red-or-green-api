const express = require('express');
const app = require('../app');

exports.addUserToRequest = () => {
  return (req, res, next) => {
    req.user = {};
    req.user.id = 'THis is NAME';
    next();
  }
};
