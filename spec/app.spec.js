const request = require('request');
const app = require('../app');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/`;

describe("app.js:", () => {

  beforeEach(function() {
    app.request.app.set('env', 'test');
    server = app.listen(testPort); 
  });

  afterEach(() => {
    app.request.app.set('env', 'development');
    server.close();
  });

  describe("Error handler", () => {
    it("returns 404 on not found", (done) => {
      request.get(base_url + 'api/does-not-exists', (err, res, body) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });

  });
});