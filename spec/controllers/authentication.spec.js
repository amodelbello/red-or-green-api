const httpMocks = require('node-mocks-http');
const request = require('request');
const app = require('../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/api`;

let mockRequest;
let mockResponse;

const fakeUser = require('../data/values').fakeUser;
const fakeUserCredentials = require('../data/values').fakeUserCredentials;

const authenticationController = require('../../controllers/authentication');
const responseHelper = require('../../helpers/response');

const mongoose = require('mongoose');
const dbImporter = require('../data/import');
const testData = require('../data/values');

describe("Authentication Controller", () => {

  beforeEach((done) => {
    dbImporter.run().then(() => { done(); });
  });

  beforeEach(() => {
    server = app.listen(testPort); 
  });

  afterEach(() => {
    server.close();
  });


  /******************************************************
   * register()
   *****************************************************/
  describe("register()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'POST',
        url: base_url + '/register'
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should register a new user successfully", (done) => {
      mockRequest.body = fakeUser;
      spyOn(responseHelper, 'respond');
      authenticationController.register(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(201);
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = 'This is not valid input';
      spyOn(responseHelper, 'respond');

      authenticationController.register(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });


  /******************************************************
   * login()
   *****************************************************/
  describe("login()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'POST',
        url: base_url + '/login'
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should log in successfully", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body = fakeUserCredentials;
      authenticationController.login(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(200);
        done();
      });
    });

    it("should not log in with invalid credentials", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body = fakeUserCredentials;
      mockRequest.body.password = 'no';
      authenticationController.login(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(401);
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = 'This is not valid input';
      spyOn(responseHelper, 'respond')

      authenticationController.login(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(401);
        done();
      });
    });
  });
});