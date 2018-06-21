const httpMocks = require('node-mocks-http');
const request = require('request');
const app = require('../../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://127.0.0.1:${testPort}/api`;

let mockRequest;
let mockResponse;
const fakeData = { hello: 'hello' };

const responseHelper = require('../../../helpers/response');

describe("Response Helper:", () => {

  beforeEach(() => {
    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: base_url + '/businesses',
    });
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
  });


  /******************************************************
   * successfulRequest()
   *****************************************************/
  describe("successfulRequest()", () => {

    it("should return true on successful request", (done) => {
      const result = responseHelper.successfulRequest(null, fakeData);
      expect(result).toBeTruthy();
      done();
    });

    it("should return false on error", (done) => {
      const result = responseHelper.successfulRequest(new Error('bad'), fakeData);
      expect(result).toBeFalsy();
      done();
    });

    it("should return false on null response", (done) => {
      const result = responseHelper.successfulRequest(null, null);
      expect(result).toBeFalsy();

      done();
    });
  });

  /******************************************************
   * failure()
   *****************************************************/
  describe("failure()", () => {

    it("should return 404 on null data", (done) => {
      responseHelper.failure(null, mockResponse, null);
      expect(mockResponse.statusCode).toBe(404);
      done();
    });

    it("should return 500 on error", (done) => {
      responseHelper.failure(new Error(), mockResponse, null);
      expect(mockResponse.statusCode).toBe(500);
      done();
    });
  });
  /******************************************************
   * success()
   *****************************************************/
  describe("success()", () => {

    it("should return 200 on non POST verbs", (done) => {
      responseHelper.success(mockResponse, fakeData);
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse.body.data).toBe(fakeData);
      done();
    });

    it("should return 201 on POST", (done) => {
      mockResponse.req = {};
      mockResponse.req.method = 'POST';
      responseHelper.success(mockResponse, fakeData);
      expect(mockResponse.statusCode).toBe(201);
      expect(mockResponse.body.data).toBe(fakeData);
      done();
    });
  });
});