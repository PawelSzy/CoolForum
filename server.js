








// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
    
// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3000; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
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
