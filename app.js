var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

require('dotenv').config();

//Configured Passport 
const passport = require('./config/passport');
const MONGODB_URI = process.env.MONGODB_URI;

// Mongoose connection 
const mongoose = require("mongoose");
mongoose.connect(MONGODB_URI || 'mongodb://localhost/auth-example' , { useNewUrlParser: true, useUnifiedTopology: true })
.then((data) => {
  console.log("DB connected");
})
.catch((err) => {
  console.log("error occured : ", err);
})

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var admin = require('./routes/adminRouter');
var formR = require('./routes/formRouter'); 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  resave: false
}))

/** Flash messages */
app.use(require('connect-flash')());

/** Initialize passport and session */
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/', admin);
app.use('/', formR);
/** Pass configured passport to auth router */
app.use('/auth', authRouter(passport));

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
