const mongoose = require('mongoose');
const dbHost = 'mongodb://localhost/RedOrGreen';

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