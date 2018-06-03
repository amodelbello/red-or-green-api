const fetchRatings = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'GET /ratings fetchRatings()';

  res
    .status(200)
    .json({ 'message': message });
}

const addRating = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'POST /ratings addRating()';

  res
    .status(201)
    .json({ 'message': message });
}

const fetchRating = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'GET /ratings/:ratingId fetchRating()';

  res
    .status(200)
    .json({ 'message': message });
}

const updateRating = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'PUT /ratings/:ratingId updateRating()';

  res
    .status(200)
    .json({ 'message': message });
}

const deleteRating = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'DELETE /ratings/:ratingId deleteRating()';

  res
    .status(200)
    .json({ 'message': message });
}

module.exports = {
  fetchRatings,
  addRating,
  fetchRating,
  updateRating,
  deleteRating,
}
