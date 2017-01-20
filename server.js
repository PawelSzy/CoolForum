
// server.js

// server.js

// BASE SETUP
// =============================================================================

// // call the packages we need
// var express    = require('express');        // call express
// var app        = express();                 // define our app using express
// var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var port = process.env.PORT || 3000;        // set our port

// // ROUTES FOR OUR API
// // =============================================================================
// var router = express.Router();              // get an instance of the express Router

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });

// // more routes for our API will happen here

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);

// // START THE SERVER
// // =============================================================================
// app.listen(port);
// console.log('Magic happens on port ' + port);


// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var wagner = require('wagner-core');

// // configuration ===========================================
    
// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3000; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url); 

// // get all data/stuff of the body (POST) parameters
// // parse application/json 
// app.use(bodyParser.json()); 

// // parse application/vnd.api+json as json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// // parse application/x-www-form-urlencoded
// // app.use(bodyParser.urlencoded({ extended: true })); 

// // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
// // app.use(methodOverride('X-HTTP-Method-Override')); 

// // set the static files location /public/img will be /img for users
// // app.use(express.static(__dirname + '/public')); 

///use wagner
 var models = require('./app/models/uzytkownik')(wagner);
 // app.use(wagner);

// app.use('/uzytkownik/v1', require('./app/models/uzytkownik')(wagner))

// routes ==================================================
require('./app/routes')(app); // configure our routes




// start app ===============================================
// startup our app at http://localhost:3080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;    


//////////////////Stara wersja

// 'use strict';


// /**
//  * Module dependencies.
//  */
// var express = require('express'),
//     fs = require('fs'),
//     mongoose = require('mongoose');

// /**
//  * Main application entry file.
//  * Please note that the order of loading is important.
//  */

// // Initializing system variables
// var config = require('./config/config');
// var db     = mongoose.connect(config.db);

// //Bootstrap models
// var models_path = __dirname + '/app/models';
// var walk = function(path) {
//     fs.readdirSync(path).forEach(function(file) {
//         var newPath = path + '/' + file;
//         var stat = fs.statSync(newPath);
//         if (stat.isFile()) {
//             if (/(.*)\.(js|coffee)/.test(file)) {
//                 require(newPath);
//             }
//         } else if (stat.isDirectory()) {
//             walk(newPath);
//         }
//     });
// };
// walk(models_path);

// var app = express();

// //express settings
// require('./config/express')(app, db);

// //Bootstrap routes
// require('./config/routes')(app);

// //Start the app by listening on <port>
// var port = config.port;
// app.listen(port);
// console.log('Express app started on port ' + port);

// //expose app
// exports = module.exports = app;