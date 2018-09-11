const _ = require('lodash');
const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');
const Business = mongoose.model('Business');
const responseHelper = require('../helpers/response');

const getParamsFromUrl = (req) => {
  let params = {};
  if (req.params.businessId) {
    params.business = req.params.businessId;
  }

  if (req.params.categoryId) {
    params.category = req.params.categoryId;
  }

  if (req.params.userId) {
    params.user = req.params.userId;
  }

  return params;
};

const fetchRatings = () => {
  return (req, res) => {

    return new Promise((resolve, reject) => {

      const criteria = getParamsFromUrl(req);
      Rating.find(criteria)
      .populate('user', '_id username')
      .populate('business', '-address')
      .populate('category')
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
  };
}

const fetchRating = () => {
  return (req, res) => {

    const ratingId = req.params.ratingId;

    return new Promise((resolve, reject) => {
      Rating.findById(ratingId)
      .populate('user', '_id username')
      .populate('business', '-address')
      .populate('category')
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
  };
}

const addRating = () => {
  return (req, res) => {

    const data = req.body;
    data.created = new Date();
    data.updated = new Date();

    return new Promise((resolve, reject) => {
      Rating.create(data, (err, rating) => {
        if (responseHelper.successfulRequest(err, rating)) {
          updateBusinessRating(rating.business, rating.category);
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
  };
}

const updateRating = () => {
  return (req, res) => {

    const ratingId = req.params.ratingId;
    req.body.updated = new Date();

    // Once a rating is created we don't want these to be changed
    delete req.body.user;
    delete req.body.business;
    delete req.body.category;

    return new Promise((resolve, reject) => {
      Rating.findByIdAndUpdate(ratingId, req.body, { new: true }, (err, rating) => {
        if (responseHelper.successfulRequest(err, rating)) {
          updateBusinessRating(rating.business, rating.category);
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
  };
}

const deleteRating = () => {
  return (req, res) => {

    const ratingId = req.params.ratingId;

    return new Promise((resolve, reject) => {
      Rating.findByIdAndRemove(ratingId)
      .exec((err, rating) => {
        if (responseHelper.successfulRequest(err, rating)) {
          updateBusinessRating(rating.business, rating.category);
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
  };
}

// We need to update the business rating (average of all ratings for that business)
const updateBusinessRating = (businessId, categoryId) => {
  Rating.find({ 
    business: businessId,
    category: categoryId
  })
  .sort('user')
  .exec((err, ratings) => {

    /* istanbul ignore else */
    if (ratings.length > 0) { 

      // Average all ratings per single users,
      // So results can't be skewed by one or a few users
      const partitionedByUser = _.values(_.groupBy(ratings, 'user'));
      let averageRatingPerUser = [];
      partitionedByUser.forEach(ratingsBySingleUser => {
        const numRatings = ratingsBySingleUser.length;
        const sumOfRatings = ratingsBySingleUser.reduce((a, c) => a + c.rating, 0);
        averageRatingPerUser.push((sumOfRatings / numRatings));
      });


      // Then average those averages
      const numRatings = averageRatingPerUser.length;
      const sumOfRatings = averageRatingPerUser.reduce((a, c) => a + c, 0);
      const averageRating = (sumOfRatings / numRatings);


      // Then update the particular category rating in the business
      const categoryRating = {
        category: categoryId,
        averageRating: averageRating
      }

      Business.findById(businessId, (err, business) => {
        // if (err) throw new Error('Could not find business: ' + err);

        let updated = false;
        /* istanbul ignore else */
        if (business !== null) {
          business.ratings.map((category) => {
            if(category.category.toString() === categoryId.toString()) {
              updated = true;
              category.averageRating = averageRating;
            }
            return category;
          });

          /* istanbul ignore else */
          if (updated !== true) {
            business.ratings.push(categoryRating);
          }

          business.save();
        }
      });
    }
  });
};

module.exports = {
  fetchRatings,
  addRating,
  fetchRating,
  updateRating,
  deleteRating,
}
