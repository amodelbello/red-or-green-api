const request = require('request');
const app = require('../app');
const ratingsController = require('../controllers/ratings');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/`;

describe("Hello World Test", function(){

  beforeEach(function() {
    server = app.listen(testPort, function () {
      var port = server.address().port;
      console.log('Example app listening at port %s', port);
    });
  });

  afterEach(() => {
    server.close();
  });

  describe("GET /", function() {
    it('test controller', (done) => {
      request.get(base_url + 'test', (err, res, body) => {
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

    it("returns 'Welcome to Express'", (done) => {
      request.get(base_url, (err, res, body) => {
        expect(body).toContain("Welcome to Express");
        done();
      });
    });

    it("should load /users route", (done) => {
      request.get(base_url + 'users', (err, res, body) => {
        expect(res.statusCode).toBe(200);
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