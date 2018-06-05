const httpMocks = require('node-mocks-http');
const request = require('request');
const app = require('../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/api`;

let mockRequest;
let mockResponse;

const fakeObjectId = '5b14b3ae3450501de43d2f9b';
const fakeBusiness = require('../data/test').fakeBusiness;
const fakeBusinessEdit = require('../data/test').fakeBusinessEdit;

const businessesController = require('../../controllers/businesses');
const responseHelper = require('../../helpers/response');

describe("Businesses Controller", () => {

  beforeEach(() => {
    app.request.app.set('env', 'test');
    process.env.NODE_ENV = 'test';
    server = app.listen(testPort); 

    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: base_url + '/businesses',
      // params: {
        // id: 42
      // }
    });
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
  });

  afterEach(() => {
    app.request.app.set('env', 'development');
    process.env.NODE_ENV = 'development';
    server.close();
  });

  /******************************************************
   * fetchBusinesses()
   *****************************************************/
  describe("fetchBusinesses()", () => {

    it("should fetch businesses successfully", (done) => {
      businessesController.fetchBusinesses(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      businessesController.fetchBusinesses(mockRequest, mockResponse).then(() => {
        /* istanbul ignore next */
        console.log('should not be here. was supposed to fail');
      })
      .catch((e) => {
        expect(e.message).toContain('Error when attempting to fetch businesses');
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
          businessId: fakeObjectId
        }
      });
    });

    it("should fetch business successfully", (done) => {
      businessesController.fetchBusiness(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      businessesController.fetchBusiness(mockRequest, mockResponse).then(() => {
        /* istanbul ignore next */
        console.log('should not be here. was supposed to fail');
      })
      .catch((e) => {
        expect(e.message).toContain('Error when attempting to fetch business');
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
      mockRequest.body = fakeBusiness;
      businessesController.addBusiness(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = 'This is not valid input';
      businessesController.addBusiness(mockRequest, mockResponse).then(() => {
        /* istanbul ignore next */
        console.log('should not be here. was supposed to fail');
      })
      .catch((e) => {
        expect(e.message).toContain('Error when attempting to add business');
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
          businessId: fakeObjectId
        }
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should update business successfully", (done) => {
      mockRequest.body = fakeBusinessEdit;
      businessesController.updateBusiness(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle error on fetch", (done) => {
      mockRequest.body = false;
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      businessesController.updateBusiness(mockRequest, mockResponse).then(() => {
        /* istanbul ignore next */
        console.log('should not be here. was supposed to fail');
      })
      .catch((e) => {
        expect(e.message).toContain('Error when attempting to fetch business to update');
        done();
      });
    });

    it("should handle error on update", (done) => {
      mockRequest.body = fakeBusinessEdit;
      spyOn(responseHelper, 'successfulRequest').and.returnValues(true, false);
      businessesController.updateBusiness(mockRequest, mockResponse).then(() => {
        /* istanbul ignore next */
        console.log('should not be here. was supposed to fail');
      })
      .catch((e) => {
        expect(e.message).toContain('Error when attempting to update business');
        done();
      });
    });
  });
});