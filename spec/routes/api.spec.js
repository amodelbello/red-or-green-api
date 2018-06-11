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
const testData = require('../data/values');

describe("API Routes", () => {

  beforeEach((done) => {
    dbImporter.run().then(() => { done(); });
  });

  beforeEach(() => {
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
      request.get(`${base_url}/businesses`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchBusinesses');
        done();
      });
    });

    it("Calls GET /businesses/:businessId", (done) => {
      request.get(`${base_url}/businesses/${testData.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchBusiness');
        done();
      });
    });

    it("Calls POST /businesses", (done) => {
      const options = {
        url: `${base_url}/businesses`,
        headers: { 'Authorization': `Bearer ${testData.validJwt}` }
      };
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.post(options, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('addBusiness');
        done();
      });
    });

    it("Calls PUT /businesses/:businessId", (done) => {
      const options = {
        url: `${base_url}/businesses/${testData.validObjectId}`,
        headers: { 'Authorization': `Bearer ${testData.validJwt}` }
      };
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.put(options, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('updateBusiness');
        done();
      });
    });

    it("Calls DELETE /businesses/:businessId", (done) => {
      const options = {
        url: `${base_url}/businesses/${testData.validObjectId}`,
        headers: { 'Authorization': `Bearer ${testData.validJwt}` }
      };
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.delete(options, (err, res, body) => {
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

    it("Calls POST /businesses without a valid jwt", (done) => {
      const options = {
        url: `${base_url}/businesses`,
        headers: { 'Authorization': `Bearer ${testData.invalidJwt}` }
      };
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.post(options, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBeUndefined();
        done();
      });
    });

    it("Calls PUT /businesses without an authorization header", (done) => {
      const options = {
        url: `${base_url}/businesses`
      };
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.post(options, (err, res, body) => {
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
      request.get(`${base_url}/categories/${testData.validObjectId}`, (err, res, body) => {
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
      request.put(`${base_url}/categories/${testData.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('updateCategory');
        done();
      });
    });

    it("Calls DELETE /categories/:categoryId", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.delete(`${base_url}/categories/${testData.validObjectId}`, (err, res, body) => {
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
      request.get(`${base_url}/ratings`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchRatings');
        done();
      });
    });

    it("Calls GET /ratings/:ratingId", (done) => {
      request.get(`${base_url}/ratings/${testData.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('fetchRating');
        done();
      });
    });

    it("Calls POST /ratings", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.post(`${base_url}/ratings`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('addRating');
        done();
      });
    });

    it("Calls PUT /ratings/:ratingId", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.put(`${base_url}/ratings/${testData.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('updateRating');
        done();
      });
    });

    it("Calls DELETE /ratings/:ratingId", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(true);
      request.delete(`${base_url}/ratings/${testData.validObjectId}`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBe('deleteRating');
        done();
      });
    });

    it("Calls GET /ratings is production mode", (done) => {
      app.request.app.set('env', 'production');
      request.get(`${base_url}/ratings`, (err, res, body) => {
        expect(JSON.parse(body).callingMethod).toBeUndefined();
        done();
      });
    });
  });
});