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

const dbImporter = require('../data/import');
const fakeObjectId = '5b175ac99eee34409aa6ea7e';
const fakeObjectIdToDelete = '5b175a76d6b6dc3fe376ae93';

describe("API Routes", () => {

  beforeEach((done) => {
    dbImporter.run().then(() => { done(); });
  });

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
      request.get(`${base_url}/businesses`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchBusinesses');
        done();
      });
    });

    it("Calls GET /businesses/:businessId", (done) => {
      request.get(`${base_url}/businesses/${dbImporter.validObjectId}`, (err, res, body) => {
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
      request.put(`${base_url}/businesses/${dbImporter.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('updateBusiness');
        done();
      });
    });

    it("Calls DELETE /businesses/:businessId", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.delete(`${base_url}/businesses/${dbImporter.validObjectId}`, (err, res, body) => {
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
      request.get(`${base_url}/categories`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchCategories');
        done();
      });
    });

    it("Calls GET /categories/:categoryId", (done) => {
      request.get(`${base_url}/categories/${dbImporter.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchCategory');
        done();
      });
    });

    it("Calls POST /categories", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.post(`${base_url}/categories`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('addCategory');
        done();
      });
    });

    it("Calls PUT /categories/:categoryId", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.put(`${base_url}/categories/${dbImporter.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('updateCategory');
        done();
      });
    });

    it("Calls DELETE /categories/:categoryId", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.delete(`${base_url}/categories/${dbImporter.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('deleteCategory');
        done();
      });
    });

    it("Calls GET /categories is production mode", (done) => {
      app.request.app.set('env', 'production');
      request.get(`${base_url}/categories`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBeUndefined();
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