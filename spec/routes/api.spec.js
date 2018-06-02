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
  });
});