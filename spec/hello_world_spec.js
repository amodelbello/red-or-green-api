const request = require('request');
const app = require('../app');
const ratingsController = require('../controllers/ratings');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/`;

describe("Hello World Test", function(){

  beforeEach(function() {
    server = app.listen(testPort); 
  });

  afterEach(() => {
    server.close();
  });

  describe("GET /api/v1/test", function() {
    it('test controller', (done) => {
      request.get(base_url + 'api/v1/test', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it('returns status code 200', (done) => {
      request.get(base_url, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it("returns 'Welcome to Red Or Green'", (done) => {
      request.get(base_url, (err, res, body) => {
        expect(body).toContain("Welcome to Red Or Green");
        done();
      });
    });

    it("returns 404 on not found", (done) => {
      request.get(base_url + 'does-not-exist', (err, res, body) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });
});