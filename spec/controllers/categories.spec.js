const httpMocks = require('node-mocks-http');
const request = require('request');
const app = require('../../app');
require('jasmine');

let server;
const testPort = 3001;
const base_url = `http://localhost:${testPort}/api`;

let mockRequest;
let mockResponse;

const fakeCategory = require('../data/data').fakeCategory;
const fakeCategoryEdit = require('../data/data').fakeCategoryEdit;

const categoriesController = require('../../controllers/categories');
const responseHelper = require('../../helpers/response');

const mongoose = require('mongoose');
const dbImporter = require('../data/import');

describe("Categories Controller", () => {

  beforeEach((done) => {
    dbImporter.run().then(() => { done(); });
  });

  beforeEach(() => {
    server = app.listen(testPort); 

    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: base_url + '/categories'
    });
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
  });

  afterEach(() => {
    server.close();
  });

  /******************************************************
   * fetchCategories()
   *****************************************************/
  describe("fetchCategories()", () => {

    it("should fetch categories successfully", (done) => {
      categoriesController.fetchCategories(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle unexpected error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      categoriesController.fetchCategories(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * fetchCategory()
   *****************************************************/
  describe("fetchCategory()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: `${base_url}/categories`,
        params: {
          categoryId: dbImporter.validCategoryId
        }
      });
    });

    it("should fetch category successfully", (done) => {
      categoriesController.fetchCategory(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle 404 error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'failure');
      categoriesController.fetchCategory(mockRequest, mockResponse).then(() => {
        expect(responseHelper.failure).toHaveBeenCalled();
        done();
      });
    });

    it("should handle unexpected error", (done) => {
      spyOn(responseHelper, 'respond')
      mockRequest.params.categoryId = 1;
      categoriesController.fetchCategory(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * addCategory()
   *****************************************************/
  describe("addCategory()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'POST',
        url: base_url + '/categories',
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should add category successfully", (done) => {
      mockRequest.body = fakeCategory;
      categoriesController.addCategory(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = 'This is not valid input';
      spyOn(responseHelper, 'respond')

      categoriesController.addCategory(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * updateCategory()
   *****************************************************/
  describe("updateCategory()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        url: `${base_url}/categories`,
        params: {
          categoryId: dbImporter.validCategoryId
        }
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should update category successfully", (done) => {
      mockRequest.body = fakeCategoryEdit;
      categoriesController.updateCategory(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = false;
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond')

      categoriesController.updateCategory(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * deleteCategory()
   *****************************************************/
  describe("deleteCategory()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'DELETE',
        url: `${base_url}/categories`,
        params: {
          categoryId: dbImporter.validObjectId
        }
      });
    });

    it("should delete category successfully", (done) => {
      categoriesController.deleteCategory(mockRequest, mockResponse).then(() => {
        done();
      });
    });

    it("should handle error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond')

      categoriesController.deleteCategory(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });
});