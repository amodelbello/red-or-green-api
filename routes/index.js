const express = require('express');
const router = express.Router();

const ratingsController = require('../controllers/ratings');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/test', ratingsController.testMethod);

module.exports = router;
