const fetchBusinesses = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'GET /businesses fetchBusinesses()' });
}

const addBusiness = (req, res) => {
  res
    .status(201)
    .json({ 'message': 'POST /businesses addBusiness()' });
}

const fetchBusiness = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'GET /businesses/:businessId fetchBusiness()' });
}

const updateBusiness = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'PUT /businesses/:businessId updateBusiness()' });
}

const deleteBusiness = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'DELETE /businesses/:businessId deleteBusiness()' });
}

module.exports = {
  fetchBusinesses,
  addBusiness,
  fetchBusiness,
  updateBusiness,
  deleteBusiness,
}
