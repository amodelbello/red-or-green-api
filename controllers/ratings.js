const testMethod = (req, res, next) => {
  console.log('TEST CONTROLLER METHOD!!!');
  res
    .status(200)
    .json('gagaga');
}

module.exports = {
  testMethod,
}
