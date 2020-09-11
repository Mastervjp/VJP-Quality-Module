var express = require('express');
const app = express();
var bodyParser = require('body-parser');
var path = require('path')
var config = require('./config')
const fileUpload = require('express-fileupload');
var passport		=	require('passport');

var fs = require('fs')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(fileUpload());
// app.options('*', cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
 });

 app.use(errorHandler);

 app.use(express.static(require('path').join(__dirname, 'uploads')));

function errorHandler(err, req, res, next) {
    // if (!isProd)
        console.log(err);
    res.status(err.status || 500)
    res.json({
        success: false,
        message: err.message,
        // error: isProd ? err.name : err.stack
        error: err.name 

    })
}


const localSignupStrategy = require('./middleware/passport/local-signup')
const localLoginStrategy = require('./middleware/passport/local-login')

passport.use('local-login', localLoginStrategy)
passport.use('local-signup', localSignupStrategy)

app.set('port',config.port)

app.use('/api', require('./routes'))

app.listen( app.get('port'), ()  =>{
 console.log('Listening on port :'+ app.get('port'))
})

module.export = app;