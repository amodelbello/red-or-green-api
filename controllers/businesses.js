const mongoose = require('mongoose');
const Business = mongoose.model('Business');

const fetchBusinesses = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  Business.find()
  .exec((err, businesses) => {
    message.data = businesses;
    res
      .status(200)
      .json({ message });
  })

}

const fetchBusiness = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.callingMethod = res.callingMethod;

  Business.findById('5b14b3ae3450501de43d2f9b')
  .exec((err, business) => {
    message.data = business;
    res
      .status(200)
      .json({ message });
  })

}

const addBusiness = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'POST /businesses addBusiness()';

  res
    .status(201)
    .json({ 'message': message });
}

const updateBusiness = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'PUT /businesses/:businessId updateBusiness()';

  res
    .status(200)
    .json({ 'message': message });
}

const deleteBusiness = (req, res) => {
  
  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'DELETE /businesses/:businessId deleteBusiness()';

  res
    .status(200)
    .json({ 'message': message });
}

module.exports = {
  fetchBusinesses,
  addBusiness,
  fetchBusiness,
  updateBusiness,
  deleteBusiness,
}
