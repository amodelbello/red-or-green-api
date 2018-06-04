module.exports.successfullRequest = (err, data) => {
  if (err || !data) {
    return false;
  } else {
    return true;
  }
}

module.exports.success = (res, data) => {
  respond(200, res, data);
}

module.exports.failure = (err, res, data) => {
  if (err) {
    respond(500, res, err);

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