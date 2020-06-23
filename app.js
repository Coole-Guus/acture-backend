// const createError = require('http-errors');
require("dotenv").config();
const express = require('express');
var bodyParser = require('body-parser');

// ...

// const path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express();

const userRouter = require("./api/users/user.router");
const feedRouter = require("./api/feed/feed.router");
const feedPostRouter = require("./api/feedposts/feedpost.router");
const attendanceRouter = require("./api/attendance/attendance.router");

const followRouter = require("./api/follow/follor.router");
const startupRouter = require("./api/startups/startup.router");
const privacyRouter = require("./api/privacy/privacy.router");

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('.local.env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;


app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb'}));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/feed", feedRouter);
app.use("/api/feedposts", feedPostRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/follow", followRouter);
app.use("/api/privacy", privacyRouter);
app.use("/api/startup", startupRouter);


app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on PORT and address : ", process.env.DB_HOST, process.env.APP_PORT);
});

