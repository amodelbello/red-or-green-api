const request = require('request');
const app = require('../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/api`;

const businessesController = require('../../controllers/businesses');
const categoriesController = require('../../controllers/categories');
const ratingsController = require('../../controllers/ratings');

describe("app.js", () => {

  beforeEach(function() {
    app.request.app.set('env', 'test');
    server = app.listen(testPort); 
  });

  afterEach(() => {
    app.request.app.set('env', 'development');
    server.close();
  });

  /******************************************************
   * Businesses Routes
   *****************************************************/
  describe("Businesses Routes", () => {
    it("Calls GET /businesses", (done) => {
      request.get(base_url + '/businesses', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('fetchBusinesses');
        done();
      });
    });

    it("Calls GET /businesses/:businessId", (done) => {
      request.get(base_url + '/businesses/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('fetchBusiness');
        done();
      });
    });

    it("Calls POST /businesses", (done) => {
      request.post(base_url + '/businesses', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('addBusiness');
        done();
      });
    });

    it("Calls PUT /businesses/:businessId", (done) => {
      request.put(base_url + '/businesses/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('updateBusiness');
        done();
      });
    });

    it("Calls DELETE /businesses/:businessId", (done) => {
      request.delete(base_url + '/businesses/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('deleteBusiness');
        done();
      });
    });

    it("Calls GET /businesses is production mode", (done) => {
      app.request.app.set('env', 'production');
      request.get(base_url + '/businesses', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBeUndefined();
        done();
      });
    });
  });

  /******************************************************
   * Categories Routes
   *****************************************************/
  describe("Categories Routes", () => {
    it("Calls GET /categories", (done) => {
      request.get(base_url + '/categories', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('fetchCategories');
        done();
      });
    });

    it("Calls GET /categories/:categoryId", (done) => {
      request.get(base_url + '/categories/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('fetchCategory');
        done();
      });
    });

    it("Calls POST /categories", (done) => {
      request.post(base_url + '/categories', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('addCategory');
        done();
      });
    });

    it("Calls PUT /categories/:categoryId", (done) => {
      request.put(base_url + '/categories/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('updateCategory');
        done();
      });
    });

    it("Calls DELETE /categories/:categoryId", (done) => {
      request.delete(base_url + '/categories/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('deleteCategory');
        done();
      });
    });
  });

  /******************************************************
   * Ratings Routes
   *****************************************************/
  describe("Ratings Routes", () => {
    it("Calls GET /ratings", (done) => {
      request.get(base_url + '/ratings', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('fetchRatings');
        done();
      });
    });

    it("Calls GET /ratings/:ratingId", (done) => {
      request.get(base_url + '/ratings/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('fetchRating');
        done();
      });
    });

    it("Calls POST /ratings", (done) => {
      request.post(base_url + '/ratings', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('addRating');
        done();
      });
    });

    it("Calls PUT /ratings/:ratingId", (done) => {
      request.put(base_url + '/ratings/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('updateRating');
        done();
      });
    });

    it("Calls DELETE /ratings/:ratingId", (done) => {
      request.delete(base_url + '/ratings/1234', (err, res, body) => {
        expect(JSON.parse(body).message.callingMethod).toBe('deleteRating');
        done();
      });
    });
  });
});