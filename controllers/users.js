const mongoose = require('mongoose');
const User = mongoose.model('User');
const responseHelper = require('../helpers/response');

const fetchUsers = () => {
  return (req, res) => {

    return new Promise((resolve, reject) => {
      User.find()
      .exec((err, users) => {

        if (responseHelper.successfulRequest(err, users)) {
          responseHelper.success(res, users);
          return resolve();

        } else {
          responseHelper.failure(err, res, users);
          return reject(new Error('Error when attempting to fetch users'));
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  };
}

const fetchUser = () => {
  return (req, res) => {

    const userId = req.params.userId;

    return new Promise((resolve, reject) => {
      User.findById(userId)
      .exec((err, user) => {

        if (responseHelper.successfulRequest(err, user)) {
          responseHelper.success(res, user);

        } else {
          responseHelper.failure(err, res, user);
          if (err !== null) {
            return reject(new Error(`Error when attempting to fetch user: ${userId}: ${err.message}`));
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

const addUser = () => {
  return (req, res) => {

    const data = req.body;
    data.created = new Date();
    data.updated = new Date();

    return new Promise((resolve, reject) => {
      User.create(data, (err, user) => {
        if (responseHelper.successfulRequest(err, user)) {
          responseHelper.success(res, user);
          return resolve();

        } else {
          responseHelper.failure(err, res, user);
          return reject(new Error(`Error when attempting to add user: ${data}`));
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  };
}

const updateUser = () => {
  return (req, res) => {

    const userId = req.params.userId;
    req.body.updated = new Date();

    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(userId, req.body, { new: true }, (err, user) => {
        if (responseHelper.successfulRequest(err, user)) {
          responseHelper.success(res, user);
          return resolve();

        } else {
          responseHelper.failure(err, res, user);
          return reject(new Error(`Error when attempting to update user: ${userId}`));
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  }
}

const deleteUser = () => {
  return (req, res) => {

    const userId = req.params.userId;

    return new Promise((resolve, reject) => {
      User.findByIdAndRemove(userId)
      .exec((err, user) => {
        if (responseHelper.successfulRequest(err, user)) {
          responseHelper.success(res, user);
          return resolve();

        } else {
          responseHelper.failure(err, res, user);
          return reject(new Error(`Error when attempting to delete user: ${userId}`));
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  }
}

module.exports = {
  fetchUsers,
  addUser,
  fetchUser,
  updateUser,
  deleteUser,
}
