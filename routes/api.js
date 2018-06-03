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
  .get(
    mwResponse.addCallingMethodToResponse('fetchCategories'),
    categoriesController.fetchCategories)
  .post(
    mwResponse.addCallingMethodToResponse('addCategory'),
    categoriesController.addCategory)
  ;
router
  .route('/categories/:businessId')
  .get(
    mwResponse.addCallingMethodToResponse('fetchCategory'),
    categoriesController.fetchCategory)
  .put(
    mwResponse.addCallingMethodToResponse('updateCategory'),
    categoriesController.updateCategory)
  .delete(
    mwResponse.addCallingMethodToResponse('deleteCategory'),
    categoriesController.deleteCategory)
  ;

/****************************************
 * Ratings Routes
 ****************************************/
const ratingsController = require('../controllers/ratings');
router
  .route('/ratings')
  .get(
    mwResponse.addCallingMethodToResponse('fetchRatings'),
    ratingsController.fetchRatings)
  .post(
    mwResponse.addCallingMethodToResponse('addRating'),
    ratingsController.addRating)
  ;
router
  .route('/ratings/:ratingId')
  .get(
    mwResponse.addCallingMethodToResponse('fetchRating'),
    ratingsController.fetchRating)
  .put(
    mwResponse.addCallingMethodToResponse('updateRating'),
    ratingsController.updateRating)
  .delete(
    mwResponse.addCallingMethodToResponse('deleteRating'),
    ratingsController.deleteRating)
  ;

module.exports = router;