const request = require('request');
const app = require('../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/api`;

const businessesController = require('../../controllers/businesses');
const categoriesController = require('../../controllers/categories');
const ratingsController = require('../../controllers/ratings');
const responseHelper = require('../../helpers/response');

const fakeObjectId = '5b14b3ae3450501de43d2f9b';

describe("API Routes", () => {

  beforeEach(() => {
    app.request.app.set('env', 'test');
    process.env.NODE_ENV = 'test';
    server = app.listen(testPort); 
  });

  afterEach(() => {
    app.request.app.set('env', 'development');
    process.env.NODE_ENV = 'development';
    server.close();
  });

  /******************************************************
   * Businesses Routes
   *****************************************************/
  describe("Businesses Routes", () => {
    it("Calls GET /businesses", (done) => {
      request.get(base_url + '/businesses', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchBusinesses');
        done();
      });
    });

    it("Calls GET /businesses/:businessId", (done) => {
      request.get(`${base_url}/businesses/${fakeObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchBusiness');
        done();
      });
    });

    it("Calls POST /businesses", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.post(`${base_url}/businesses`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('addBusiness');
        done();
      });
    });

    it("Calls PUT /businesses/:businessId", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.put(`${base_url}/businesses/${fakeObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('updateBusiness');
        done();
      });
    });

    it("Calls DELETE /businesses/:businessId", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.delete(`${base_url}/businesses/${fakeObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('deleteBusiness');
        done();
      });
    });

    it("Calls GET /businesses is production mode", (done) => {
      app.request.app.set('env', 'production');
      request.get(base_url + '/businesses', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBeUndefined();
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
        expect(JSON.parse(body).callingMethod).toBe('fetchCategories');
        done();
      });
    });

    it("Calls GET /categories/:categoryId", (done) => {
      request.get(base_url + '/categories/1234', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchCategory');
        done();
      });
    });

    it("Calls POST /categories", (done) => {
      request.post(base_url + '/categories', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('addCategory');
        done();
      });
    });

    it("Calls PUT /categories/:categoryId", (done) => {
      request.put(base_url + '/categories/1234', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('updateCategory');
        done();
      });
    });

    it("Calls DELETE /categories/:categoryId", (done) => {
      request.delete(base_url + '/categories/1234', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('deleteCategory');
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
        expect(JSON.parse(body).callingMethod).toBe('fetchRatings');
        done();
      });
    });

    it("Calls GET /ratings/:ratingId", (done) => {
      request.get(base_url + '/ratings/1234', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchRating');
        done();
      });
    });

    it("Calls POST /ratings", (done) => {
      request.post(base_url + '/ratings', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('addRating');
        done();
      });
    });

    it("Calls PUT /ratings/:ratingId", (done) => {
      request.put(base_url + '/ratings/1234', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('updateRating');
        done();
      });
    });

    it("Calls DELETE /ratings/:ratingId", (done) => {
      request.delete(base_url + '/ratings/1234', (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('deleteRating');
        done();
      });
    });
  });
});