const fetchCategories = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'GET /categories fetchCategories()' });
}

const addCategory = (req, res) => {
  res
    .status(201)
    .json({ 'message': 'POST /categories addCategory()' });
}

const fetchCategory = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'GET /categories/:categoryId fetchCategory()' });
}

const updateCategory = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'PUT /categories/:categoryId updateCategory()' });
}

const deleteCategory = (req, res) => {
  res
    .status(200)
    .json({ 'message': 'DELETE /categories/:categoryId deleteCategory()' });
}

module.exports = {
  fetchCategories,
  addCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
}
