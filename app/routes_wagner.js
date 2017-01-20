 // app/routes.js

// grab the nerd model we just created
// var Nerd = require('./models/nerd');
var express        = require('express');


    module.exports = function(wagner, app) {

        //tworze gdyz routes_wagner bedzie zwracany jako middleware - funkcja musi zwrocic 
        var api = express.Router();


        //route - pobierz uzytkownika i zwroc jego dane w postci JSON
        // @param - get z id uzytkownika w bazie danych
        // @return - JSON - dane uzytkowniak
        app.get('/uzytkownik/id/:id', wagner.invoke( (Uzytkownicy) => {
            return (req, res) => {

                res.json({nazwa : 'test4445', imie: 'Mieszko3', nazwisko: "Trzeci", email: "mieszko@gniezno.pl", response: req.params.id});
            }
        }));

        //zwroc api bo funckja bedzie traktowana jako middleware
        return api;

    };
