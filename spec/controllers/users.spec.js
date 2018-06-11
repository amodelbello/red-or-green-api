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
const fakeUserEdit = require('../data/values').fakeUserEdit;

const usersController = require('../../controllers/users');
const responseHelper = require('../../helpers/response');

const mongoose = require('mongoose');
const dbImporter = require('../data/import');
const testData = require('../data/values');

describe("Users Controller", () => {

  beforeEach((done) => {
    dbImporter.run().then(() => { done(); });
  });

  beforeEach(() => {
    server = app.listen(testPort); 

    mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: base_url + '/users'
    });
    mockResponse = httpMocks.createResponse();
    mockResponse.body = {};
  });

  afterEach(() => {
    server.close();
  });

  /******************************************************
   * fetchUsers()
   *****************************************************/
  describe("fetchUsers()", () => {

    it("should fetch users successfully", (done) => {
      spyOn(responseHelper, 'success');
      const fetchUsers = usersController.fetchUsers();
      fetchUsers(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle unexpected error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const fetchUsers = usersController.fetchUsers();
      fetchUsers(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * fetchUser()
   *****************************************************/
  describe("fetchUser()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: `${base_url}/users`,
        params: {
          userId: testData.validUserId
        }
      });
    });

    it("should fetch user successfully", (done) => {
      spyOn(responseHelper, 'success');
      const fetchUser = usersController.fetchUser();
      fetchUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle 404 error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'failure');
      const fetchUser = usersController.fetchUser();
      fetchUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.failure).toHaveBeenCalled();
        done();
      });
    });

    it("should handle unexpected error", (done) => {
      spyOn(responseHelper, 'respond');
      mockRequest.params.userId = 1;
      const fetchUser = usersController.fetchUser();
      fetchUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * addUser()
   *****************************************************/
  describe("addUser()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'POST',
        url: base_url + '/users',
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should add user successfully", (done) => {
      mockRequest.body = fakeUser;
      spyOn(responseHelper, 'success');
      const addUser = usersController.addUser();
      addUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = 'This is not valid input';
      spyOn(responseHelper, 'respond');
      const addUser = usersController.addUser();
      addUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * updateUser()
   *****************************************************/
  describe("updateUser()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        url: `${base_url}/users`,
        params: {
          userId: testData.validUserId
        }
      });
      mockResponse = httpMocks.createResponse();
      mockResponse.body = {};
    });

    it("should update user successfully", (done) => {
      mockRequest.body = fakeUserEdit;
      spyOn(responseHelper, 'success');
      const updateUser = usersController.updateUser();
      updateUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      mockRequest.body = false;
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const updateUser = usersController.updateUser();
      updateUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });

  /******************************************************
   * deleteUser()
   *****************************************************/
  describe("deleteUser()", () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        method: 'DELETE',
        url: `${base_url}/users`,
        params: {
          userId: testData.validUserId
        }
      });
    });

    it("should delete user successfully", (done) => {
      spyOn(responseHelper, 'success');
      const deleteUser = usersController.deleteUser();
      deleteUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.success).toHaveBeenCalled();
        done();
      });
    });

    it("should handle error", (done) => {
      spyOn(responseHelper, 'successfulRequest').and.returnValue(false);
      spyOn(responseHelper, 'respond');
      const deleteUser = usersController.deleteUser();
      deleteUser(mockRequest, mockResponse).then(() => {
        expect(responseHelper.respond.calls.mostRecent().args[0]).toBe(500);
        done();
      });
    });
  });
});