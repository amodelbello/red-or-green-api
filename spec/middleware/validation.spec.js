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
        businessId: dbImporter.validObjectId
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

      spyOn(dbImporter, 'next');
      const validationFunction = validate.hasValidObjectId('businessId');
      validationFunction(mockRequest, mockResponse, dbImporter.next);

      expect(dbImporter.next).toHaveBeenCalled();
      done();
    });

    it("should reject with invalid objectId", (done) => {
      mockRequest.params.businessId += '-invalid';
      spyOn(responseHelper, 'respond');

      const validationFunction = validate.hasValidObjectId('businessId');
      validationFunction(mockRequest, mockResponse, dbImporter.next);
      expect(responseHelper.respond).toHaveBeenCalledWith(400, mockResponse, 'Error: invalid businessId');
      done();
    });
  });

  /******************************************************
   * requiredInBody()
   *****************************************************/
  describe("requiredInBody()", () => {

    it("should call next with property that exists in req.body", (done) => {

      spyOn(dbImporter, 'next');

      for(let x = 0; x < dbImporter.valuesThatExist.length; x++) {
        mockRequest.body.name = dbImporter.valuesThatExist[x];
        const validationFunction = validate.requiredInBody('name');
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(dbImporter.next).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should handle error with property that does not exist in req.body", (done) => {

      spyOn(responseHelper, 'respond');

      for(let x = 0; x < dbImporter.valuesThatDontExist.length; x++) {
        mockRequest.body.name = dbImporter.valuesThatDontExist[x];
        const validationFunction = validate.requiredInBody('name');
        validationFunction(mockRequest, mockResponse, dbImporter.next);
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

      spyOn(dbImporter, 'next');

      for(let x = 0; x < dbImporter.valuesThatExist.length; x++) {
        mockRequest.params.name = dbImporter.valuesThatExist[x];
        const validationFunction = validate.requiredInParams('name');
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(dbImporter.next).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should handle error with property that does not exist in req.params", (done) => {

      spyOn(responseHelper, 'respond');

      for(let x = 0; x < dbImporter.valuesThatDontExist.length; x++) {
        mockRequest.params.name = dbImporter.valuesThatDontExist[x];
        const validationFunction = validate.requiredInParams('name');
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(responseHelper.respond).toHaveBeenCalledWith(400, mockResponse, `Error: name is required in request params`);
        responseHelper.respond.calls.reset();
      }

      done();
    });
  });

  /******************************************************
   * hasValidAddress()
   *****************************************************/
  describe("hasValidAddress()", () => {

    beforeEach(() => {

      mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: `${base_url}/businesses`,
        params: {
          businessId: dbImporter.validObjectId
        }
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
      mockRequest.body.address = dbImporter.validAddress();
    });

    it("should call next with valid address", (done) => {
      mockRequest.body.address = dbImporter.validAddress();
      spyOn(dbImporter, 'next');
      validate.hasValidAddress(mockRequest, mockResponse, dbImporter.next);
      expect(dbImporter.next).toHaveBeenCalled();
      done();
    });

    it("should handle error with missing address", (done) => {
      spyOn(responseHelper, 'respond');
      delete mockRequest.body.address;
      validate.hasValidAddress(mockRequest, mockResponse, dbImporter.next);
      expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(400)

      done();
    });

    it("should handle error with missing street", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body.address = dbImporter.validAddress();
      delete mockRequest.body.address.street;
      validate.hasValidAddress(mockRequest, mockResponse, dbImporter.next);
      expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(400)
      done();
    });

    it("should handle error with missing city", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body.address = dbImporter.validAddress();
      delete mockRequest.body.address.city;
      validate.hasValidAddress(mockRequest, mockResponse, dbImporter.next);
      expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(400)
      done();
    });

    it("should handle error with missing state", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body.address = dbImporter.validAddress();
      delete mockRequest.body.address.state;
      validate.hasValidAddress(mockRequest, mockResponse, dbImporter.next);
      expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(400)
      done();
    });

    it("should handle error with missing zip", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.body.address = dbImporter.validAddress();
      delete mockRequest.body.address.zip;
      validate.hasValidAddress(mockRequest, mockResponse, dbImporter.next);
      expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(400)
      done();
    });
  });

  /******************************************************
   * isNumberOrNull()
   *****************************************************/
  describe("isNumberOrNull()", () => {
    it("should call next if value of field (in body) is a number", (done) => {
      spyOn(dbImporter, 'next');
      for(let x = 0; x < dbImporter.valuesThatAreNumbers.length; x++) {
        mockRequest.body.name = dbImporter.valuesThatAreNumbers[x];
        const validationFunction = validate.isNumberOrNull('name');
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(dbImporter.next).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should call next if value of field (in params) is a number", (done) => {
      spyOn(dbImporter, 'next');
      for(let x = 0; x < dbImporter.valuesThatAreNumbers.length; x++) {
        mockRequest.params.name = dbImporter.valuesThatAreNumbers[x];
        const validationFunction = validate.isNumberOrNull('name');
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(dbImporter.next).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should call next if value of field (in body) is null or undefined", (done) => {
      spyOn(dbImporter, 'next');
      for(let x = 0; x < dbImporter.valuesThatDontExist.length; x++) {
        mockRequest.body.name = dbImporter.valuesThatDontExist[x];
        const validationFunction = validate.isNumberOrNull('name');
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(dbImporter.next).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should respond with error if value of field (in params) is null or undefined and is not a number", (done) => {
      spyOn(responseHelper, 'respond');
      for(let x = 0; x < dbImporter.valuesThatAreNotNumbers.length; x++) {
        mockRequest.params.name = dbImporter.valuesThatAreNotNumbers[x];
        const validationFunction = validate.isNumberOrNull('name');
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(responseHelper.respond).toHaveBeenCalledWith(400, mockResponse, `Error: name must be a number`);
        responseHelper.respond.calls.reset();
      }

      done();
    });
  });

  /******************************************************
   * inumberIsWithinRangeOrNull()
   *****************************************************/
  describe("numberIsWithinRangeOrNull()", () => {
    it("should call next if value of field (in body) is null or undefined", (done) => {
      spyOn(dbImporter, 'next');
      for(let x = 0; x < dbImporter.valuesThatDontExist.length; x++) {
        mockRequest.body.name = dbImporter.valuesThatDontExist[x];
        const validationFunction = validate.numberIsWithinRangeOrNull('name', -2, 2);
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(dbImporter.next).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should call next if value of field (in body) is within range", (done) => {
      spyOn(dbImporter, 'next');
      const range = [-2, -1, 0, 1, 2];
      for(let x = 0; x < range.length; x++) {
        mockRequest.body.name = range[x];
        const validationFunction = validate.numberIsWithinRangeOrNull('name', -2, 2);
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(dbImporter.next).toHaveBeenCalledTimes((x + 1));
      }

      done();
    });

    it("should respond with error if value of field (in params) is not within range", (done) => {
      spyOn(responseHelper, 'respond');
      const range = [-4, -3, 3, 4, 50];
      for(let x = 0; x < range.length; x++) {
        mockRequest.params.name = range[x];
        const validationFunction = validate.numberIsWithinRangeOrNull('name', -2, 2);
        validationFunction(mockRequest, mockResponse, dbImporter.next);
        expect(responseHelper.respond).toHaveBeenCalledWith(400, mockResponse, `Error: name not within range of -2-2`);
        responseHelper.respond.calls.reset();
      }

      done();
    });
  });
});