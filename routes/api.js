const express = require('express');
const router = express.Router();
const responseMiddleware = require('../middleware/response');
const validate = require('../middleware/validation');

/****************************************
 * Businesses Routes
 ****************************************/
const businessesController = require('../controllers/businesses');
router
  .route('/businesses')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchBusinesses'),
    businessesController.fetchBusinesses)
  .post(
    responseMiddleware.addCallingMethodToResponse('addBusiness'),
    validate.requiredInBody('name'),
    validate.isNumberOrNull('rating'),
    validate.numberIsWithinRangeOrNull('rating', 0, 5),
    validate.hasValidAddress,
    businessesController.addBusiness)
  ;
router
  .route('/businesses/:businessId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchBusiness'),
    validate.hasValidObjectId('businessId'),
    businessesController.fetchBusiness)
  .put(
    responseMiddleware.addCallingMethodToResponse('updateBusiness'),
    validate.hasValidObjectId('businessId'),
    validate.requiredInBody('name'),
    validate.isNumberOrNull('rating'),
    validate.numberIsWithinRangeOrNull('rating', 0, 5),
    validate.hasValidAddress,
    businessesController.updateBusiness)
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteBusiness'),
    validate.hasValidObjectId('businessId'),
    businessesController.deleteBusiness)
  ;

/****************************************
 * Categories Routes
 ****************************************/
const categoriesController = require('../controllers/categories');
router
  .route('/categories')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchCategories'),
    categoriesController.fetchCategories)
  .post(
    responseMiddleware.addCallingMethodToResponse('addCategory'),
    validate.requiredInBody('name'),
    categoriesController.addCategory)
  ;
router
  .route('/categories/:categoryId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchCategory'),
    validate.hasValidObjectId('categoryId'),
    categoriesController.fetchCategory)
  .put(
    responseMiddleware.addCallingMethodToResponse('updateCategory'),
    validate.hasValidObjectId('categoryId'),
    validate.requiredInBody('name'),
    categoriesController.updateCategory)
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteCategory'),
    validate.hasValidObjectId('categoryId'),
    categoriesController.deleteCategory)
  ;

/****************************************
 * Ratings Routes
 ****************************************/
const ratingsController = require('../controllers/ratings');
router
  .route('/ratings')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchRatings'),
    ratingsController.fetchRatings)
  .post(
    responseMiddleware.addCallingMethodToResponse('addRating'),
    ratingsController.addRating)
  ;
router
  .route('/ratings/:ratingId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchRating'),
    ratingsController.fetchRating)
  .put(
    responseMiddleware.addCallingMethodToResponse('updateRating'),
    ratingsController.updateRating)
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteRating'),
    ratingsController.deleteRating)
  ;

module.exports = router;