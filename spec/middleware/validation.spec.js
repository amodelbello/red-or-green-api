const httpMocks = require('node-mocks-http');
const request = require('request');
const app = require('../../app');
const dbImporter = require('../data/import');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/api`;

let mockRequest;
let mockResponse;

const responseHelper = require('../../helpers/response');
const validate = require('../../middleware/validation');

describe("Validation Middleware", () => {

  beforeEach(() => {

    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: `${base_url}/businesses`,
      params: {
        businessId: dbImporter.fakeBusinessId
      }
    });
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
  });


  /******************************************************
   * hasValidObjectId()
   *****************************************************/
  describe("hasValidObjectId()", () => {

    it("should call next with valid objectId", (done) => {
      const fakeObj = {};
      fakeObj.fakeNext = ()=>{};
      spyOn(fakeObj, 'fakeNext');

      const validationFunction = validate.hasValidObjectId('businessId');
      validationFunction(mockRequest, mockResponse, fakeObj.fakeNext);

      expect(fakeObj.fakeNext).toHaveBeenCalled();
      done();
    });

    it("should reject with invalid objectId", (done) => {
      mockRequest.params.businessId += '-invalid';
      spyOn(responseHelper, 'respond');

      const validationFunction = validate.hasValidObjectId('businessId');
      validationFunction(mockRequest, mockResponse, ()=>{});
      expect(responseHelper.respond).toHaveBeenCalledWith(400, mockResponse, 'Error: invalid objectId');
      done();
    });

  });

});