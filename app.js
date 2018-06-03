var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();
// app.set('env', 'production');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('json spaces', 2);

app.use(logger('dev', {
  skip: function (req, res) { 
    // Remove clutter when running unit tests (port: 3001)
    return req.connection.localPort !== 3000;
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  let output = {};
  output.status = err.status || /* istanbul ignore next */ 500;
  output.message = err.message;

  /* istanbul ignore if  */
  if (req.app.get('env') === 'development') {
    console.trace(err.stack);
  }

  // render the error page
  res.status(err.status || /* istanbul ignore next */ 500);
  res.json(output);
});

module.exports = app;
