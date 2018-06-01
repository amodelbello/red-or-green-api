const request = require('request');
const app = require('../app');
const ratingsController = require('../controllers/ratings');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/`;

describe("app.js", () => {

  beforeEach(function() {
    server = app.listen(testPort); 
  });

  afterEach(() => {
    app.request.app.set('env', 'test');
    server.close();
  });

  describe("Error handler", () => {
    it('GET 404 in development env', (done) => {
      // app.request.app.set('env', 'development');
      request.get(base_url + 'api/v1/does-not-exists', (err, res, body) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });

  });
});