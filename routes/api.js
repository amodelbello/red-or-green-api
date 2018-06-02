const express = require('express');
const router = express.Router();
const mwResponse = require('../middleware/response');

/****************************************
 * Businesses Routes
 ****************************************/
const businessesController = require('../controllers/businesses');
router
  .route('/businesses')
  .get(
    mwResponse.addCallingMethodToResponse('fetchBusinesses'),
    businessesController.fetchBusinesses)
  .post(
    mwResponse.addCallingMethodToResponse('addBusiness'),
    businessesController.addBusiness)
  ;
router
  .route('/businesses/:businessId')
  .get(
    mwResponse.addCallingMethodToResponse('fetchBusiness'),
    businessesController.fetchBusiness)
  .put(
    mwResponse.addCallingMethodToResponse('updateBusiness'),
    businessesController.updateBusiness)
  .delete(
    mwResponse.addCallingMethodToResponse('deleteBusiness'),
    businessesController.deleteBusiness)
  ;

/****************************************
 * Categories Routes
 ****************************************/
const categoriesController = require('../controllers/categories');
router
  .route('/categories')
  .get(categoriesController.fetchCategories)
  .post(categoriesController.addCategory)
  ;
router
  .route('/categories/:businessId')
  .get(categoriesController.fetchCategory)
  .put(categoriesController.updateCategory)
  .delete(categoriesController.deleteCategory)
  ;

/****************************************
 * Ratings Routes
 ****************************************/
const ratingsController = require('../controllers/ratings');
router
  .route('/ratings')
  .get(ratingsController.fetchRatings)
  .post(ratingsController.addRating)
  ;
router
  .route('/ratings/:ratingId')
  .get(ratingsController.fetchRating)
  .put(ratingsController.updateRating)
  .delete(ratingsController.deleteRating)
  ;

module.exports = router;