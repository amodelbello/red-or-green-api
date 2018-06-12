const httpMocks = require('node-mocks-http');
const request = require('request');
const app = require('../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/api`;

let mockRequest;
let mockResponse;

const responseHelper = require('../../helpers/response');
const auth = require('../../middleware/authentication');

const testData = require('../data/values');

describe("Authentication Middleware", () => {

  beforeEach(() => {

    mockRequest = httpMocks.createRequest({
      method: 'POST',
      url: `${base_url}/users`,
      params: {
        userId: testData.validObjectId
      },
      payload: testData.fakeUserPayload
    });
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
  });


  /******************************************************
   * allowedRoles()
   *****************************************************/
  describe("allowedRoles()", () => {

    it("should respond with 403 if user role is not allowed", (done) => {

      spyOn(testData, 'next');
      spyOn(responseHelper, 'respond');
      const allowedRoles = auth.allowedRoles(['other-role']);
      allowedRoles(mockRequest, mockResponse, testData.next);
      expect(testData.next).not.toHaveBeenCalled();
      expect(responseHelper.respond).toHaveBeenCalledWith(403, mockResponse, '17: User is not authorized');
      done();
    });

  });


  /******************************************************
   * userOwnsDocument()
   *****************************************************/
  describe("userOwnsDocument()", () => {

    it("should respond with 403 if user is required to own document but doesn't", (done) => {
      spyOn(testData, 'next');
      spyOn(responseHelper, 'respond');
      mockRequest.body = {};
      mockRequest.body.userId = testData.validObjectId;
      const userOwnsDocument = auth.userOwnsDocument();
      userOwnsDocument(mockRequest, mockResponse, testData.next);
      expect(testData.next).not.toHaveBeenCalled();
      expect(responseHelper.respond).toHaveBeenCalledWith(403, mockResponse, '28: User is not authorized');
      done();
    });

    it("should should call next if user owns document", (done) => {
      spyOn(testData, 'next');
      mockRequest.body = {};
      mockRequest.body.userId = mockRequest.payload._id;
      const userOwnsDocument = auth.userOwnsDocument();
      userOwnsDocument(mockRequest, mockResponse, testData.next);
      expect(testData.next).toHaveBeenCalled();
      done();
    });

    it("should should call next if user is admin", (done) => {
      spyOn(testData, 'next');
      mockRequest.body.userId = testData.validObjectId;
      mockRequest.payload = testData.fakeAdminUserPayload;
      const userOwnsDocument = auth.userOwnsDocument();
      userOwnsDocument(mockRequest, mockResponse, testData.next);
      expect(testData.next).toHaveBeenCalled();
      done();
    });
  });
});