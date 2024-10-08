
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// this line is added in case env variables are not getting to other files.
require('dotenv').config({ path: path.join(__dirname, '.env') });

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


// routes import
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
console.log('env----------------', process.env.USER)
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "exposedHeaders": "authorization,x-access-token,new-token,invalidToken,refresh-token,AuthToken,RefreshToken"
}
app.use(cors(corsOptions))

app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  req.response = {
    status: false,
    message: '',
    data: {}
  };
  next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
