const supertest = require("supertest");
require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://127.0.0.1:3001");

// UNIT test begin

describe("SAMPLE unit test", function() {
  // #1 should return home page

  it("should return businesses page", function(done) {
    // calling home page api
    server
      .get("/api/businesses")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.error.should.equal(false);
        done();
      });
  });
});
