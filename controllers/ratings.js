const fetchRatings = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'GET /ratings fetchRatings()' });
}

const addRating = (req, res) => {
  res
    .status(201)
    .json({ 'message': 'POST /ratings addRating()' });
}

const fetchRating = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'GET /ratings/:ratingId fetchRating()' });
}

const updateRating = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'PUT /ratings/:ratingId updateRating()' });
}

const deleteRating = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'DELETE /ratings/:ratingId deleteRating()' });
}

module.exports = {
  fetchRatings,
  addRating,
  fetchRating,
  updateRating,
  deleteRating,
}
