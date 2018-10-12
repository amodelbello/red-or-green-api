// TODO: Think about a way to unit test this file. Currently excluded from coverage via .istanbul.yml
const mongoose = require('mongoose');

let dbHost = 'mongodb://docker_rg-mongo_1/RedOrGreen';
if (process.env.NODE_ENV === 'test') {
  dbHost = 'mongodb://docker_rg-mongo_1/RedOrGreen-test';
}

mongoose.connect(dbHost);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbHost}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose disconnected`);
});

process.once('SIGUSR2', () => {
  gracefulShutdown(`nodemon restart`, () => {
    process.kill(process.pid, `SIGUSR2`);
  });
});
process.on('SIGINT', () => {
  gracefulShutdown(`app termination`, () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown(`Heroku app shutdown`, () => {
    process.exit(0);
  });
});

const gracefulShutdown = (msg, cb) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    cb();
  });
};

require('./businesses');
require('./categories');
require('./ratings');
require('./users');