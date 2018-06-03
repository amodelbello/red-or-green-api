const fetchCategories = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'GET /categories fetchCategories()';

  res
    .status(200)
    .json({ 'message': message });
}

const addCategory = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'POST /categories addCategory()';

  res
    .status(201)
    .json({ 'message': message });
}

const fetchCategory = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'GET /categories/:categoryId fetchCategory()';

  res
    .status(200)
    .json({ 'message': message });
}

const updateCategory = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'PUT /categories/:categoryId updateCategory()';

  res
    .status(200)
    .json({ 'message': message });
}

const deleteCategory = (req, res) => {

  let message = {};

  /* istanbul ignore else  */
  if (res.callingMethod !== null) {
    message.callingMethod = res.callingMethod;
  }

  message.data = 'DELETE /categories/:categoryId deleteCategory()';

  res
    .status(200)
    .json({ 'message': message });
}

module.exports = {
  fetchCategories,
  addCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
}
