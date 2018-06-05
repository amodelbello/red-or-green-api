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
        reject(new Error('Error when attempting to fetch businesses'));
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
        reject(new Error(`Error when attempting to fetch business: ${businessId}`));
      }
    });
  });
}

const addBusiness = (req, res) => {

  const data = req.body;

  return new Promise((resolve, reject) => {
    Business.create(data, (err, business) => {
      if (responseHelper.successfulRequest(err, business)) {
        responseHelper.success(res, business);
        resolve();

      } else {
        responseHelper.failure(err, res, business);
        reject(new Error(`Error when attempting to add business: ${data}`));
      }
    });
  });
}

const updateBusiness = (req, res) => {

  res.body.data = 'PUT /businesses/:businessId updateBusiness()';

  res
    .status(200)
    .json(res.body);
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
