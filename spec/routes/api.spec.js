const request = require('request');
const app = require('../../app');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/api`;

const businessesController = require('../../controllers/businesses');
const categoriesController = require('../../controllers/categories');
const ratingsController = require('../../controllers/ratings');

describe("app.js", () => {

  beforeEach(function() {
    server = app.listen(testPort); 
  });

  afterEach(() => {
    server.close();
  });

  describe("Businesses Routes", () => {
    it("Calls GET /businesses", (done) => {

      spyOn(businessesController, 'fetchBusinesses').and.returnValue('hello');

      businessesController.fetchBusinesses();
      expect(businessesController.fetchBusinesses).toHaveBeenCalled();

      request.get(base_url + '/businesses', (err, res, body) => {
        console.log(body);
        expect(businessesController.fetchBusinesses).toHaveBeenCalled();
        done();
      });
    });

  });
});