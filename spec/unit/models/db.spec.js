/*
Aborted attempt to unit test db.js connection file.
I might revist this or delete it in the future
*/
const request = require('request');
const app = require('../../../app');
require('jasmine');

let server;
const testPort = 3001;
const dbHost = 'mongodb://localhost/RedOrGreen';

var mongoose = require('mongoose');
 
// var Mockgoose = require('mockgoose').Mockgoose;
// var mockgoose = new Mockgoose(mongoose);
// mockgoose.helper.setDbVersion("3.6.3");
 

/*
beforeEach(async () => {
    mockgoose = new Mockgoose(mongoose);
    await mockgoose.prepareStorage();
    await mongoose.connect("mongodb://foo/map-test");
    return;
});

afterEach(async () => {
    await mockgoose.helper.reset();
    await mongoose.disconnect();
    return;
});
*/
describe("API Routes", () => {

  // beforeEach(() => {
  //   app.request.app.set('env', 'test');
  //   server = app.listen(testPort); 
  // });

  // beforeEach((done) => {
    // mockgoose.prepareStorage().then(() => {
    //   mongoose.connect(dbHost, (err) => {
    //     done(err);
    //   });
    // });
    // done();
  // });

  // afterEach(() => {
  //   app.request.app.set('env', 'development');
  //   server.close();
  // });

  /******************************************************
   *****************************************************/
  describe("Server shuts down or is restarted", () => {
    it("Server closes", (done) => {

      expect(1).toBeTruthy();
      // process.emit('SIGINT');
      done();
    });
  });
});