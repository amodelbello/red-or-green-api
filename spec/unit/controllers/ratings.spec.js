const httpMocks = require('node-mocks-http');
const request = require('request');
const app = require('../../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://127.0.0.1:${testPort}/api`;

let mockRequest;
let mockResponse;

const fakeRating = require('../../data/values').fakeRating;
const fakeRatingEdit = require('../../data/values').fakeRatingEdit;

const ratingsController = require('../../../controllers/ratings');
const responseHelper = require('../../../helpers/response');

const mongoose = require('mongoose');
const dbImporter = require('../../data/import');
const testData = require('../../data/values');

describe("Ratings Controller:", () => {

  beforeEach((done) => {
    dbImporter.run().then(() => { done(); });
  });

  beforeEach(() => {
    server = app.listen(testPort); 

    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: base_url + '/ratings'
    });
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
  });

  afterEach(() => {
    server.close();
  });

  /******************************************************
   * fetchRatings()
   *****************************************************/
  describe("fetchRatings()", () => {
    it("should fetch ratings successfully", (done) => {
      spyOn(responseHelper, 'success');
      const fetchRatings = ratingsController.fetchRatings();
      fetchRatings(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle unexpected error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const fetchRatings = ratingsController.fetchRatings();
      fetchRatings(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * fetchRating()
   *****************************************************/
  describe("fetchRating()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: `${base_url}/ratings`,
        params: {
          ratingId: testData.validRatingId
        }
      });
    });

    it("should fetch rating successfully", (done) => {
      spyOn(responseHelper, 'success');
      const fetchRating = ratingsController.fetchRating();
      fetchRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle 404 error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'failure');
      const fetchRating = ratingsController.fetchRating();
      fetchRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.failure).toHaveBeenCalled();
        done();
      });
    });

    it("should handle unexpected error", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.params.ratingId = 1;
      const fetchRating = ratingsController.fetchRating();
      fetchRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * addRating()
   *****************************************************/
  describe("addRating()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'POST',
        url: base_url + '/ratings',
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
      mockResponse.req = mockRequest;
    });

    it("should add rating successfully", (done) => {
      mockRequest.body = fakeRating;
      spyOn(responseHelper, 'success');
      const addRating = ratingsController.addRating();
      addRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = 'This is not valid input';
      spyOn(responseHelper, 'respond');
      const addRating = ratingsController.addRating();
      addRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * updateRating()
   *****************************************************/
  describe("updateRating()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        url: `${base_url}/ratings`,
        params: {
          ratingId: testData.validRatingId
        }
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should update rating successfully", (done) => {
      mockRequest.body = fakeRatingEdit;
      spyOn(responseHelper, 'success');
      const updateRating = ratingsController.updateRating();
      updateRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = false;
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const updateRating = ratingsController.updateRating();
      updateRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * deleteRating()
   *****************************************************/
  describe("deleteRating()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'DELETE',
        url: `${base_url}/ratings`,
        params: {
          ratingId: testData.validRatingId
        }
      });
    });

    it("should delete rating successfully", (done) => {
      spyOn(responseHelper, 'success');
      const deleteRating = ratingsController.deleteRating();
      deleteRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const deleteRating = ratingsController.deleteRating();
      deleteRating(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });
});