 // app/routes.js

// grab the nerd model we just created
// var Nerd = require('./models/nerd');
var express        = require('express');
var bodyParser     = require('body-parser');
var status         = require('http-status');



    module.exports = function(wagner, app) {

        //tworze gdyz routes_wagner bedzie zwracany jako middleware - funkcja musi zwrocic 
        var api = express.Router();
        app.use(bodyParser.json());

        // app.use(require('./routes/uzytkownik_routes_wagner')(wagner, app));
        require('./routes/uzytkownik_routes_wagner')(wagner, app);
        require('./routes/post_routes_wagner')(wagner, app);
        require('./routes/temat_routes_wagner')(wagner, app);

        //zwroc api bo funckja bedzie traktowana jako middleware
        return api;

    };
