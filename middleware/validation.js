const mongoose = require('mongoose');
const responseHelper = require('../helpers/response');

const hasValidObjectId = (idField) => {

  return (req, res, next) => {
    const value = getPropertyFromRequest(idField, req);
    if (mongoose.Types.ObjectId.isValid(value)) {
      next();
    } else {
      responseHelper.respond(400, res, `Error: invalid ${idField}`);
      return;
    }
  };
};

const isValidDocument = (modelName, field) => {
  return (req, res, next) => {
    const id = req.body[field];
    const model = mongoose.model(modelName);

    return new Promise((resolve, reject) => {
      model.findById(id)
      .exec((err, document) => {

        if (document !== null /* istanbul ignore next */ && err === null) {
          resolve(next());
        } else {
          return reject();
        }
      });
    })
    .catch(e => {
      responseHelper.respond(400, res, `Associated document with field: ${field} does not exist`);
      return;
    });
  };
};

const requiredInBody = (field) => {
  return (req, res, next) => {
    if (propertyExists(getParsedFieldFromRequest(field, req))) {
      next();
    } else {
      responseHelper.respond(400, res, `Error: ${field} is required in request body`);
      return;
    }
  };
};

const requiredInParams = (field) => {
  return (req, res, next) => {
    if (propertyExists(req.params[field])) {
      next();
    } else {
      responseHelper.respond(400, res, `Error: ${field} is required in request params`);
      return;
    }
  };
};

const hasValidAddress = () => {
  return (req, res, next) => {
    // no need to check anything else if there's no address at all
    if (!propertyExists(req.body.address)) {
      responseHelper.respond(400, res, `Error: address is required`);
      return;
    } 

    let valid = true;
    let errorMessage = `Error: Invalid address `;

    if (!propertyExists(req.body.address.street)) {
      valid = false;
      errorMessage += `- street is required `;
    }

    if (!propertyExists(req.body.address.city)) {
      valid = false;
      errorMessage += `- city is required `;
    }

    if (!propertyExists(req.body.address.state)) {
      valid = false;
      errorMessage += `- state is required `;
    }

    if (!propertyExists(req.body.address.zip)) {
      valid = false;
      errorMessage += `- zip is required `;
    }

    if (valid === true) {
      next();

    } else {
      responseHelper.respond(400, res, errorMessage);
      return;
    }
  };
};

const isNumberOrNull = (field) => {
  return (req, res, next) => {
    const property = getPropertyFromRequest(field, req);
    if (property === null || property === undefined) {
      next();
    } else if (
      !isNaN(property) && 
      typeof property !== 'boolean' &&
      property !== '' &&
      !Array.isArray(property)
    ) {
      next();
    } else {
      responseHelper.respond(400, res, `Error: ${field} must be a number, got ${property}`);
      return;
    }
  };
}

const numberIsWithinRangeOrNull = (field, start, end) => {
  return (req, res, next) => {
    const property = getPropertyFromRequest(field, req);
    if (property === null || property === undefined) {
      next();
    } else if (property >= start && property <= end) {
      next();
    } else {
      responseHelper.respond(400, res, `Error: ${field} not within range of ${start}-${end}`);
      return;
    }
  }
}

const getPropertyFromRequest = (field, req) => {
  if (propertyExists(req.body[field])) {
    return req.body[field];
  }
  if (propertyExists(req.params[field])) {
    return req.params[field];
  }

  return null;
}

const propertyExists = (property) => {
  if (
    property !== null &&
    property !== undefined
  ) {
    return true;
  } else {
    return false;
  }
};

const getParsedFieldFromRequest = (fieldString, req) => {
  let value = req.body;
  const fieldArray = fieldString.split('.');
  for (let field of fieldArray) {
    value = value[field];
  }

  return value;
};

module.exports = {
  hasValidObjectId,
  requiredInBody,
  requiredInParams,
  hasValidAddress,
  isNumberOrNull,
  numberIsWithinRangeOrNull,
  isValidDocument,
}

