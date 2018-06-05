const mongoose = require('mongoose');
const Business = mongoose.model('Business');

const responseHelper = require('../helpers/response');

const fetchBusinesses = (req, res) => {

  return new Promise((resolve, reject) => {
    Business.find()
    .exec((err, businesses) => {

      if (responseHelper.successfulRequest(err, businesses)) {
        responseHelper.success(res, businesses);
        resolve();
      } else {
        responseHelper.failure(err, res, businesses);
        return reject(new Error('Error when attempting to fetch businesses'));
      }
    });
  });
}

const fetchBusiness = (req, res) => {

  const businessId = req.params.businessId;

  return new Promise((resolve, reject) => {
    Business.findById(businessId)
    .exec((err, business) => {

      if (responseHelper.successfulRequest(err, business)) {
        responseHelper.success(res, business);
        resolve();

      } else {
        responseHelper.failure(err, res, business);
        return reject(new Error(`Error when attempting to fetch business: ${businessId}`));
      }
    });
  });
}

const addBusiness = (req, res) => {

  const data = req.body;
  data.created = new Date();
  data.updated = new Date();

  return new Promise((resolve, reject) => {
    Business.create(data, (err, business) => {
      if (responseHelper.successfulRequest(err, business)) {
        responseHelper.success(res, business);
        resolve();

      } else {
        responseHelper.failure(err, res, business);
        return reject(new Error(`Error when attempting to add business: ${data}`));
      }
    });
  });
}

const updateBusiness = (req, res) => {

  const businessId = req.params.businessId;

  return new Promise((resolve, reject) => {
    Business.findById(businessId)
    .exec((err, business) => {

      if (!responseHelper.successfulRequest(err, business)) {
        responseHelper.failure(err, res, business);
        return reject(new Error(`Error when attempting to fetch business to update: ${businessId}`));
      }

      if (req.body.address === undefined) req.body.address = {};
      business.name = req.body.name;
      business.address.street = req.body.address.street;
      business.address.street2 = req.body.address.street2;
      business.address.city = req.body.address.city;
      business.address.state = req.body.address.state;
      business.address.zip = req.body.address.zip;
      business.rating = req.body.rating;
      business.updated = new Date();

      business.save((err, business) => {
        if (responseHelper.successfulRequest(err, business)) {
          responseHelper.success(res, business);
          resolve();
  
        } else {
          responseHelper.failure(err, res, business);
          return reject(new Error(`Error when attempting to update business: ${businessId}`));
        }
      });
    });
  });
}

const deleteBusiness = (req, res) => {

  res.body.data = 'DELETE /businesses/:businessId deleteBusiness()';

  res
    .status(200)
    .json(res.body);
}

module.exports = {
  fetchBusinesses,
  addBusiness,
  fetchBusiness,
  updateBusiness,
  deleteBusiness,
}
