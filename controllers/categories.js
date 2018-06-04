const fetchCategories = (req, res) => {

  res.body.data = 'GET /categories fetchCategories()';

  res
    .status(200)
    .json(res.body);
}

const addCategory = (req, res) => {

  res.body.data = 'POST /categories addCategory()';

  res
    .status(201)
    .json(res.body);
}

const fetchCategory = (req, res) => {

  res.body.data = 'GET /categories/:categoryId fetchCategory()';

  res
    .status(200)
    .json(res.body);
}

const updateCategory = (req, res) => {

  res.body.data = 'PUT /categories/:categoryId updateCategory()';

  res
    .status(200)
    .json(res.body);
}

const deleteCategory = (req, res) => {

  res.body.data = 'DELETE /categories/:categoryId deleteCategory()';

  res
    .status(200)
    .json(res.body);
}

module.exports = {
  fetchCategories,
  addCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
}
