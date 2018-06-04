const fetchRatings = (req, res) => {

  res.body.data = 'GET /ratings fetchRatings()';

  res
    .status(200)
    .json(res.body);
}

const addRating = (req, res) => {

  res.body.data = 'POST /ratings addRating()';

  res
    .status(201)
    .json(res.body);
}

const fetchRating = (req, res) => {

  res.body.data = 'GET /ratings/:ratingId fetchRating()';

  res
    .status(200)
    .json(res.body);
}

const updateRating = (req, res) => {

  res.body.data = 'PUT /ratings/:ratingId updateRating()';

  res
    .status(200)
    .json(res.body);
}

const deleteRating = (req, res) => {

  res.body.data = 'DELETE /ratings/:ratingId deleteRating()';

  res
    .status(200)
    .json(res.body);
}

module.exports = {
  fetchRatings,
  addRating,
  fetchRating,
  updateRating,
  deleteRating,
}
