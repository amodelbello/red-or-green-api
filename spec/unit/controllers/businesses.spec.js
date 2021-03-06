const httpMocks = require('node-mocks-http');
const app = require('../../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://127.0.0.1:${testPort}/api`;

let mockRequest;
let mockResponse;

const fakeBusiness = require('../../data/values').fakeBusiness;
const fakeBusinessEdit = require('../../data/values').fakeBusinessEdit;

const businessesController = require('../../../controllers/businesses');
const responseHelper = require('../../../helpers/response');

const mongoose = require('mongoose');
const dbImporter = require('../../data/import');
const testData = require('../../data/values');

describe("Businesses Controller:", () => {

  beforeEach((done) => {
    dbImporter.run().then(() => { done(); });
  });

  beforeEach(() => {
    server = app.listen(testPort); 

    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: base_url + '/businesses'
    });
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
  });

  afterEach(() => {
    server.close();
  });

  /******************************************************
   * fetchBusinesses()
   *****************************************************/
  describe("fetchBusinesses()", () => {

    it("should fetch businesses successfully", (done) => {
      spyOn(responseHelper, 'success');
      const fetchBusinesses = businessesController.fetchBusinesses();
      fetchBusinesses(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle unexpected error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const fetchBusinesses = businessesController.fetchBusinesses();
      fetchBusinesses(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * fetchBusiness()
   *****************************************************/
  describe("fetchBusiness()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: `${base_url}/businesses`,
        params: {
          businessId: testData.validBusinessId
        }
      });
    });

    it("should fetch business successfully", (done) => {
      spyOn(responseHelper, 'success');
      const fetchBusiness = businessesController.fetchBusiness();
      fetchBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle 404 error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'failure');
      const fetchBusiness = businessesController.fetchBusiness();
      fetchBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.failure).toHaveBeenCalled();
        done();
      });
    });

    it("should handle unexpected error", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.params.businessId = 1;
      const fetchBusiness = businessesController.fetchBusiness();
      fetchBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * addBusiness()
   *****************************************************/
  describe("addBusiness()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'POST',
        url: base_url + '/businesses',
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should add business successfully", (done) => {
      spyOn(responseHelper, 'success');
      mockRequest.body = fakeBusiness;
      const addBusiness = businessesController.addBusiness();
      addBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = 'This is not valid input';
      spyOn(responseHelper, 'respond');
      const addBusiness = businessesController.addBusiness();
      addBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * updateBusiness()
   *****************************************************/
  describe("updateBusiness()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        url: `${base_url}/businesses`,
        params: {
          businessId: testData.validBusinessId
        }
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should update business successfully", (done) => {
      spyOn(responseHelper, 'success');
      mockRequest.body = testData.fakeBusinessEdit;
      const updateBusiness = businessesController.updateBusiness();
      updateBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = false;
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const updateBusiness = businessesController.updateBusiness();
      updateBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * deleteBusiness()
   *****************************************************/
  describe("deleteBusiness()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'DELETE',
        url: `${base_url}/businesses`,
        params: {
          businessId: testData.validBusinessId
        }
      });
    });

    it("should delete business successfully", (done) => {
      spyOn(responseHelper, 'success');
      const deleteBusiness = businessesController.deleteBusiness();
      deleteBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const deleteBusiness = businessesController.deleteBusiness();
      deleteBusiness(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });
});