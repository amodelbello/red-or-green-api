const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const responseHelper = require('../helpers/response');

const register = () => {
  return (req, res) => {

    return new Promise((resolve, reject) => {

      const user = new User();
      user.username = req.body.username;
      user.email = req.body.email;
      user.setPassword(req.body.password);

      user.save((err) => {
        let token;

        /* istanbul ignore if */
        if (err) {
          return reject(new Error(`Error when attempting to register user: ${err.message}`));

        } else {
          token = user.generateJwt();
          responseHelper.respond(201, res, { "token": token });
          return resolve();
        }
      });
    })
    .catch(e => {
      responseHelper.respond(500, res, e.message);
      return;
    });
  };
}

const login = () => {
  return (req, res) => {

    return new Promise((resolve, reject) => {

      passport.authenticate('local', (err, user, info) => {
        let token;

        /* istanbul ignore if */
        if (err) {
          return reject(new Error(`Error when attempting to log in user: ${err.message}`));
        } 

        if (user) {
          token = user.generateJwt();
          responseHelper.respond(200, res, { "token": token });
          return resolve();

        } else {
          responseHelper.respond(401, res, "Authentication failed");
          return resolve();
        }
      })(req, res);
    })
    .catch(e => {
      /* istanbul ignore next */
      responseHelper.respond(500, res, e.message); 
      /* istanbul ignore next */
      return;
    });
  };
}

module.exports = {
  register,
  login,
}