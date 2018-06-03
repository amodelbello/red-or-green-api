const fetchBusinesses = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'GET /businesses fetchBusinesses()';

  res
    .status(200)
    .json({ 'message': message });
}

const fetchBusiness = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.callingMethod = res.callingMethod;
  message.data = 'GET /businesses/:businessId fetchBusiness()';

  res
    .status(200)
    // .json(body);
    .json({ 'message': message });
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
