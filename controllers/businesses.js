const mongoose = require('mongoose');
const Business = mongoose.model('Business');

const fetchBusinesses = (req, res) => {

  Business.find()
  .exec((err, businesses) => {
    res.body.data = businesses;
    res
      .status(200)
      .json(res.body);
  })

}

const fetchBusiness = (req, res) => {

  Business.findById('5b14b3ae3450501de43d2f9b')
  .exec((err, business) => {
    res.body.data = business;
    res
      .status(200)
      .json(res.body);
  })

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
