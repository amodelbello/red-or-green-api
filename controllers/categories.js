const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const responseHelper = require('../helpers/response');

const fetchCategories = (req, res) => {

  return new Promise((resolve, reject) => {
    Category.find()
    .exec((err, categories) => {

      if (responseHelper.successfulRequest(err, categories)) {
        responseHelper.success(res, categories);
        return resolve();

      } else {
        responseHelper.failure(err, res, categories);
        return reject(new Error('Error when attempting to fetch categories'));
      }
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

const fetchCategory = (req, res) => {

  const categoryId = req.params.categoryId;

  return new Promise((resolve, reject) => {
    Category.findById(categoryId)
    .exec((err, category) => {

      if (responseHelper.successfulRequest(err, category)) {
        responseHelper.success(res, category);

      } else {
        responseHelper.failure(err, res, category);
        if (err !== null) {
          return reject(new Error(`Error when attempting to fetch category: ${categoryId}: ${err.message}`));
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

const addCategory = (req, res) => {

  const data = req.body;
  data.created = new Date();
  data.updated = new Date();

  return new Promise((resolve, reject) => {
    Category.create(data, (err, category) => {
      if (responseHelper.successfulRequest(err, category)) {
        responseHelper.success(res, category);
        return resolve();

      } else {
        responseHelper.failure(err, res, category);
        return reject(new Error(`Error when attempting to add category: ${data}`));
      }
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

const updateCategory = (req, res) => {

  const categoryId = req.params.categoryId;
  req.body.updated = new Date();

  return new Promise((resolve, reject) => {
    Category.findByIdAndUpdate(categoryId, req.body, { new: true }, (err, category) => {
      if (responseHelper.successfulRequest(err, category)) {
        responseHelper.success(res, category);
        return resolve();

      } else {
        responseHelper.failure(err, res, category);
        return reject(new Error(`Error when attempting to update category: ${categoryId}`));
      }
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

const deleteCategory = (req, res) => {

  const categoryId = req.params.categoryId;

  return new Promise((resolve, reject) => {
    Category.findByIdAndRemove(categoryId)
    .exec((err, category) => {
      if (responseHelper.successfulRequest(err, category)) {
        responseHelper.success(res, category);
        return resolve();

      } else {
        responseHelper.failure(err, res, category);
        return reject(new Error(`Error when attempting to delete category: ${categoryId}`));
      }
    });
  })
  .catch(e => {
    responseHelper.respond(500, res, e.message);
    return;
  });
}

module.exports = {
  fetchCategories,
  addCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
}
