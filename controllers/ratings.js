const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');
const responseHelper = require('../helpers/response');

const fetchRatings = (req, res) => {

  return new Promise((resolve, reject) => {
    Rating.find()
    .exec((err, ratings) => {

      if (responseHelper.successfulRequest(err, ratings)) {
        responseHelper.success(res, ratings);
        return resolve();

      } else {
        responseHelper.failure(err, res, ratings);
        return reject(new Error('Error when attempting to fetch ratings'));
      }
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

const fetchRating = (req, res) => {

  const ratingId = req.params.ratingId;

  return new Promise((resolve, reject) => {
    Rating.findById(ratingId)
    .exec((err, rating) => {

      if (responseHelper.successfulRequest(err, rating)) {
        responseHelper.success(res, rating);

      } else {
        responseHelper.failure(err, res, rating);
        if (err !== null) {
          return reject(new Error(`Error when attempting to fetch rating: ${ratingId}: ${err.message}`));
        }
      }

      return resolve();
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

const addRating = (req, res) => {

  const data = req.body;
  data.created = new Date();
  data.updated = new Date();

  return new Promise((resolve, reject) => {
    Rating.create(data, (err, rating) => {
      if (responseHelper.successfulRequest(err, rating)) {
        responseHelper.success(res, rating);
        return resolve();

      } else {
        responseHelper.failure(err, res, rating);
        return reject(new Error(`Error when attempting to add rating: ${data}`));
      }
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

const updateRating = (req, res) => {

  const ratingId = req.params.ratingId;
  req.body.updated = new Date();

  return new Promise((resolve, reject) => {
    Rating.findByIdAndUpdate(ratingId, req.body, { new: true }, (err, rating) => {
      if (responseHelper.successfulRequest(err, rating)) {
        responseHelper.success(res, rating);
        return resolve();

      } else {
        responseHelper.failure(err, res, rating);
        return reject(new Error(`Error when attempting to update rating: ${ratingId}`));
      }
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

const deleteRating = (req, res) => {

  const ratingId = req.params.ratingId;

  return new Promise((resolve, reject) => {
    Rating.findByIdAndRemove(ratingId)
    .exec((err, rating) => {
      if (responseHelper.successfulRequest(err, rating)) {
        responseHelper.success(res, rating);
        return resolve();

      } else {
        responseHelper.failure(err, res, rating);
        return reject(new Error(`Error when attempting to delete rating: ${ratingId}`));
      }
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

module.exports = {
  fetchRatings,
  addRating,
  fetchRating,
  updateRating,
  deleteRating,
}
