module.exports.successfulRequest = (err, data) => {
  if (err || !data) {
    return false;
  } else {
    return true;
  }
}

module.exports.success = (res, data) => {
  let statusCode = 200;
  if (res.req !== undefined && res.req.method === 'POST') {
    statusCode = 201; // record added
  }
  respond(statusCode, res, data);
}

module.exports.failure = (err, res, data) => {
  if (err) {
    respond(500, res, err);

  /* istanbul ignore else  */
  } else if (!data) {
    respond(404, res, data);
  }
}

const respond = (status, res, data) => {
  res.body.data = data;
  res
    .status(status)
    .json(res.body);
}