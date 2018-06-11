const mongoose = require('mongoose');
const Business = mongoose.model('Business');
const responseHelper = require('../helpers/response');

const fetchBusinesses = () => {
  return (req, res) => {
    return new Promise((resolve, reject) => {
      Business.find()
      .exec((err, businesses) => {

        if (responseHelper.successfulRequest(err, businesses)) {
          responseHelper.success(res, businesses);
          return resolve();

        } else {
          responseHelper.failure(err, res, businesses);
          return reject(new Error('Error when attempting to fetch businesses'));
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  };
}

const fetchBusiness = () => {
  return (req, res) => {

    const businessId = req.params.businessId;

    return new Promise((resolve, reject) => {
      Business.findById(businessId)
      .exec((err, business) => {

        if (responseHelper.successfulRequest(err, business)) {
          responseHelper.success(res, business);

        } else {
          responseHelper.failure(err, res, business);
          if (err !== null) {
            return reject(new Error(`Error when attempting to fetch business: ${businessId}: ${err.message}`));
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

const addBusiness = () => {
  return (req, res) => {

    const data = req.body;
    data.created = new Date();
    data.updated = new Date();

    return new Promise((resolve, reject) => {
      Business.create(data, (err, business) => {
        if (responseHelper.successfulRequest(err, business)) {
          responseHelper.success(res, business);
          return resolve();

        } else {
          responseHelper.failure(err, res, business);
          return reject(new Error(`Error when attempting to add business: ${data}`));
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  };
}

const updateBusiness = () => {
  return (req, res) => {

    const businessId = req.params.businessId;
    req.body.updated = new Date();

    return new Promise((resolve, reject) => {
      Business.findByIdAndUpdate(businessId, req.body, { new: true }, (err, business) => {
        if (responseHelper.successfulRequest(err, business)) {
          responseHelper.success(res, business);
          return resolve();

        } else {
          responseHelper.failure(err, res, business);
          return reject(new Error(`Error when attempting to update business: ${businessId}`));
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  };
}

const deleteBusiness = () => {
  return (req, res) => {

    const businessId = req.params.businessId;

    return new Promise((resolve, reject) => {
      Business.findByIdAndRemove(businessId)
      .exec((err, business) => {
        if (responseHelper.successfulRequest(err, business)) {
          responseHelper.success(res, business);
          return resolve();

        } else {
          responseHelper.failure(err, res, business);
          return reject(new Error(`Error when attempting to delete business: ${businessId}`));
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  };
}

module.exports = {
  fetchBusinesses,
  addBusiness,
  fetchBusiness,
  updateBusiness,
  deleteBusiness,
}
