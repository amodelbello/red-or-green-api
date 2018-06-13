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
const fakeUserCredentialsInvalidUsername = require('../data/values').fakeUserCredentialsInvalidUsername;
const fakeUserCredentialsInvalidPassword = require('../data/values').fakeUserCredentialsInvalidPassword

const authenticationController = require('../../controllers/authentication');
const responseHelper = require('../../helpers/response');

const mongoose = require('mongoose');
const dbImporter = require('../data/import');
const testData = require('../data/values');

describe("Authentication Controller:", () => {

  beforeEach((done) => {
    dbImporter.run().then(() => { done(); });
  });

  beforeEach(() => {
    server = app.listen(testPort); 
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
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
    });

    it("should register a new user successfully", (done) => {
      mockRequest.body = fakeUser;
      spyOn(responseHelper, 'respond');
      const register = authenticationController.register();
      register(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(201);
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = 'This is not valid input';
      spyOn(responseHelper, 'respond');
      const register = authenticationController.register();
      register(mockRequest, mockResponse).then(() => {
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
    });

    it("should log in successfully", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body = fakeUserCredentials;
      const login = authenticationController.login();
      login(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(200);
        done();
      });
    });

    it("should not log in with invalid username", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body = fakeUserCredentialsInvalidUsername;
      const login = authenticationController.login();
      login(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(401);
        done();
      });
    });

    it("should not log in with invalid password", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body = fakeUserCredentialsInvalidPassword;
      const login = authenticationController.login();
      login(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(401);
        done();
      });
    });

    it("should not log in with malformed credentials", (done) => {
      mockRequest.body = 'This is not valid input';
      spyOn(responseHelper, 'respond');
      const login = authenticationController.login();
      login(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(401);
        done();
      });
    });
  });
});