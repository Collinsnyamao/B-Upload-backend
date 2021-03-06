const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const health = require('express-ping');
const expressMonitor = require('express-status-monitor');

const winston = require('winston');

const log = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
    log.log({
        level: 'error',
        message: err
    });
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pusherRouter = require('./routes/pusher');
const uploadRouter = require('./routes/upload');
const responseRouter = require('./routes/response');
const banksRouter = require('./routes/banks');
const statusRouter = require('./routes/status');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(health.ping());
app.use(expressMonitor());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pusher', pusherRouter);
app.use('/upload', uploadRouter);
app.use('/response', responseRouter);
app.use('/banks', banksRouter);
app.use('/status', statusRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

let privateKey  = fs.readFileSync(__dirname+'/certs/localhost.key', 'utf8');
let certificate = fs.readFileSync(__dirname+'/certs/localhost.cert', 'utf8');
let credentials = {
    key: privateKey,
    cert: certificate,
    rejectUnauthorized:false
};
let httpsServer = https.createServer(credentials, app);
httpsServer.listen(3002);

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
