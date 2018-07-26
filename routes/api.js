const express = require('express');
const router = express.Router();
const responseMiddleware = require('../middleware/response');
const auth = require('../middleware/authentication');
const validate = require('../middleware/validation');

const cors = require('cors');

const corsOptions = {
  origin: (origin, cb) => {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      cb(null, true);
      return;
    }

    /* istanbul ignore next */
    if (process.env.CORS_WHITELIST.indexOf(origin) !== -1) {
      cb(null, true);
      return;
    } else {
      cb(new Error('Not allowed by CORS'));
      return;
    }
  }
};

// Open up CORS to trused origins
router.use(cors(corsOptions));

/****************************************
 * Businesses Routes
 ****************************************/
const businessesController = require('../controllers/businesses');
router
  .route('/businesses')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchBusinesses'),
    businessesController.fetchBusinesses())
  .post(
    responseMiddleware.addCallingMethodToResponse('addBusiness'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super', 'admin', 'default']),
    validate.requiredInBody('name'),
    validate.isNumberOrNull('rating'),
    validate.numberIsWithinRangeOrNull('rating', 0, 5),
    businessesController.addBusiness())
  ;
router
  .route('/businesses/:businessId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchBusiness'),
    validate.hasValidObjectId('businessId'),
    businessesController.fetchBusiness())
  .put(
    responseMiddleware.addCallingMethodToResponse('updateBusiness'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super', 'admin']),
    validate.hasValidObjectId('businessId'),
    validate.requiredInBody('name'),
    validate.isNumberOrNull('rating'),
    validate.numberIsWithinRangeOrNull('rating', 0, 5),
    businessesController.updateBusiness())
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteBusiness'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super', 'admin']),
    validate.hasValidObjectId('businessId'),
    businessesController.deleteBusiness())
  ;

/****************************************
 * Categories Routes
 ****************************************/
const categoriesController = require('../controllers/categories');
router
  .route('/categories')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchCategories'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super', 'admin']),
    categoriesController.fetchCategories())
  .post(
    responseMiddleware.addCallingMethodToResponse('addCategory'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super', 'admin']),
    validate.requiredInBody('name'),
    categoriesController.addCategory())
  ;
router
  .route('/categories/:categoryId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchCategory'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super', 'admin']),
    validate.hasValidObjectId('categoryId'),
    categoriesController.fetchCategory())
  .put(
    responseMiddleware.addCallingMethodToResponse('updateCategory'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super', 'admin']),
    validate.hasValidObjectId('categoryId'),
    validate.requiredInBody('name'),
    categoriesController.updateCategory())
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteCategory'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super']),
    validate.hasValidObjectId('categoryId'),
    categoriesController.deleteCategory())
  ;

/****************************************
 * Ratings Routes
 ****************************************/
const ratingsController = require('../controllers/ratings');
router
  .route('/ratings')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchRatings'),
    ratingsController.fetchRatings())
  .post(
    responseMiddleware.addCallingMethodToResponse('addRating'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super', 'admin', 'default']),
    validate.hasValidObjectId('user'),
    validate.hasValidObjectId('business'),
    validate.hasValidObjectId('category'),
    validate.isValidDocument('User', 'user'),
    validate.isValidDocument('Business', 'business'),
    validate.isValidDocument('Category', 'category'),
    validate.isNumberOrNull('rating'),
    validate.numberIsWithinRangeOrNull('rating', 0, 5),
    ratingsController.addRating())
  ;
router
  .route('/ratings/:ratingId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchRating'),
    validate.hasValidObjectId('ratingId'),
    ratingsController.fetchRating())
  .put(
    responseMiddleware.addCallingMethodToResponse('updateRating'),
    auth.authenticationGuard(),
    auth.allowedRoles(['owner', 'super']),
    validate.hasValidObjectId('ratingId'),
    validate.isNumberOrNull('rating'),
    validate.numberIsWithinRangeOrNull('rating', 0, 5),
    ratingsController.updateRating())
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteRating'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super']),
    validate.hasValidObjectId('ratingId'),
    ratingsController.deleteRating())
  ;
router
  .route('/ratings/b/:businessId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchRatings'),
    validate.hasValidObjectId('businessId'),
    ratingsController.fetchRatings())
  ;
  router
.route('/ratings/b/:businessId/c/:categoryId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchRatings'),
    validate.hasValidObjectId('businessId'),
    validate.hasValidObjectId('categoryId'),
    ratingsController.fetchRatings())
  ;
  
/****************************************
 * Users Routes
 ****************************************/
const usersController = require('../controllers/users');
router
  .route('/users')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchUsers'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super']),
    usersController.fetchUsers())
  .post(
    responseMiddleware.addCallingMethodToResponse('addUser'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super']),
    validate.requiredInBody('username'),
    validate.requiredInBody('email'),
    validate.requiredInBody('password'),
    usersController.addUser())
  ;
router
  .route('/users/:userId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchUser'),
    auth.authenticationGuard(),
    auth.allowedRoles(['owner', 'super']),
    validate.hasValidObjectId('userId'),
    usersController.fetchUser())
  .put(
    responseMiddleware.addCallingMethodToResponse('updateUser'),
    auth.authenticationGuard(),
    auth.allowedRoles(['owner', 'super']),
    validate.hasValidObjectId('userId'),
    validate.requiredInBody('username'),
    validate.requiredInBody('email'),
    usersController.updateUser())
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteUser'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super']),
    validate.hasValidObjectId('userId'),
    usersController.deleteUser())
  ;
router
  .route('/users/role/:role')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchUsers'),
    auth.authenticationGuard(),
    auth.allowedRoles(['super']),
    usersController.fetchUsers())
  ;

/****************************************
 * Authentication Routes
 ****************************************/
const authenticationController = require('../controllers/authentication');
router
  .route('/register')
  .post(
    responseMiddleware.addCallingMethodToResponse('register'),
    validate.requiredInBody('username'),
    validate.requiredInBody('email'),
    validate.requiredInBody('password'),
    authenticationController.register()
  )
  ;
router
  .route('/login')
  .post(
    responseMiddleware.addCallingMethodToResponse('login'),
    validate.requiredInBody('email'),
    validate.requiredInBody('password'),
    authenticationController.login()
  )
  ;

module.exports = router;