const request = require('request');
const server = require('../app');
const base_url = 'http://localhost:3000/';

describe("Hello World Test", function(){
  describe("GET /", function() {
    it('returns status code 200', (done) => {
      request.get(base_url, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it("returns 'Welcome to Express'", (done) => {
      request.get(base_url, function(err, res, body) {
        expect(body).toContain("Welcome to Express");
        server.closeServer();
        done();
      });
    });
  });
});