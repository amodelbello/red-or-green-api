const mongoose = require('mongoose');
const Business = mongoose.model('Business');

const responseHelper = require('../helpers/response');

const fetchBusinesses = (req, res) => {

  Business.find()
  .exec((err, businesses) => {
    res.body.data = businesses;
    res
      .status(200)
      .json(res.body);
  });
}

const fetchBusiness = (req, res) => {

  const businessId = req.params.businessId;
  Business.findById(businessId)
  .exec((err, business) => {

    if (responseHelper.successfullRequest(err, business)) {
      responseHelper.success(res, business);

    } else {
      responseHelper.failure(err, res, business);
    }
  });
}

const addBusiness = (req, res) => {

  res.body.data = 'POST /businesses addBusiness()';

  res
    .status(201)
    .json(res.body);
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
