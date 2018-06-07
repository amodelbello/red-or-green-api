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

const valuesThatExist = [
  'hello',
  1233,
  false,
  true,
  '',
  {},
  { "field": "value" },
];

const valuesThatDontExist = [
  null,
  undefined,
];

let fakeObj;


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

    fakeObj = {};
    fakeObj.fakeNext = ()=>{};
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
      validationFunction(mockRequest, mockResponse, fakeObj.fakeNext);
      expect(responseHelper.respond).toHaveBeenCalledWith(400, mockResponse, 'Error: invalid businessId');
      done();
    });
  });

  /******************************************************
   * requiredInBody()
   *****************************************************/
  describe("requiredInBody()", () => {

    it("should call next with property that exists in req.body", (done) => {

      spyOn(fakeObj, 'fakeNext');

      for(let x = 0; x < valuesThatExist.length; x++) {
        mockRequest.body.name = valuesThatExist[x];
        const validationFunction = validate.requiredInBody('name');
        validationFunction(mockRequest, mockResponse, fakeObj.fakeNext);
        expect(fakeObj.fakeNext).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should handle error with property that does not exist in req.body", (done) => {

      spyOn(responseHelper, 'respond');

      for(let x = 0; x < valuesThatDontExist.length; x++) {
        mockRequest.body.name = valuesThatDontExist[x];
        const validationFunction = validate.requiredInBody('name');
        validationFunction(mockRequest, mockResponse, fakeObj.fakeNext);
        expect(responseHelper.respond).toHaveBeenCalledWith(400, mockResponse, `Error: name is required in request body`);
        responseHelper.respond.calls.reset();
      }

      done();
    });
  });

  /******************************************************
   * requiredInParams()
   *****************************************************/
  describe("requiredInParams()", () => {
    it("should call next with property that exists in req.params", (done) => {

      spyOn(fakeObj, 'fakeNext');

      for(let x = 0; x < valuesThatExist.length; x++) {
        mockRequest.params.name = valuesThatExist[x];
        const validationFunction = validate.requiredInParams('name');
        validationFunction(mockRequest, mockResponse, fakeObj.fakeNext);
        expect(fakeObj.fakeNext).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should handle error with property that does not exist in req.params", (done) => {

      spyOn(responseHelper, 'respond');

      for(let x = 0; x < valuesThatDontExist.length; x++) {
        mockRequest.params.name = valuesThatDontExist[x];
        const validationFunction = validate.requiredInParams('name');
        validationFunction(mockRequest, mockResponse, fakeObj.fakeNext);
        expect(responseHelper.respond).toHaveBeenCalledWith(400, mockResponse, `Error: name is required in request params`);
        responseHelper.respond.calls.reset();
      }

      done();
    });
  });
});