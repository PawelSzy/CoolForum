 // app/routes.js

// grab the nerd model we just created
// var Nerd = require('./models/nerd');
var express        = require('express');
var bodyParser     = require('body-parser');



    module.exports = function(wagner, app) {

        //tworze gdyz routes_wagner bedzie zwracany jako middleware - funkcja musi zwrocic 
        var api = express.Router();
        app.use(bodyParser.json());

        //route - pobierz uzytkownika i zwroc jego dane w postci JSON
        // @param - get z id uzytkownika w bazie danych
        // @return - JSON - dane uzytkowniak
        app.get('/uzytkownik/id/:id', wagner.invoke( (Uzytkownicy) => {
            return (req, res) => {

                res.json({nazwa : 'test4445', imie: 'Mieszko3', nazwisko: "Trzeci", email: "mieszko@gniezno.pl", response: req.params.id});
            }
        }));

        // app.post('/uzytkownik/utworz', (req, res) => {
        //     res.json({nazwa : 'test4445'});
        // });


        app.post('/uzytkownik/utworz', wagner.invoke( (Uzytkownicy) => {
            return (req, res) => {
                    // uzytkownik = new Uzytkownicy({nazwa : 'testKrol', imie: 'Jagiello', nazwisko: "Pierwszy", email: "jagielo@krakow.pl", passwordhash: "hhadjdha2"});
                    uzytkownik = new Uzytkownicy({
                        nazwa : req.body.nazwa, 
                        imie: req.body.imie, 
                        nazwisko: req.body.nazwisko, 
                        email: req.body.email, 
                        passwordhash: req.body.passwordhash,
                    }
                        );
                    console.log(req.body);
                    res.send(uzytkownik);
                    // res.json({nazwa : 'test4445'});
            }
        }));

        // app.post('uzytkownik/utworz', wagner.invoke( (Uzytkownicy) => {

        //     return (req, res) =>(req, res) => {
        //         res.json({nazwa : 'test4445'});
        //     });

        // }));

        //zwroc api bo funckja bedzie traktowana jako middleware
        return api;

    };
