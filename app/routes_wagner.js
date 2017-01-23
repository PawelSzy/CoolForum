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

        //route - pobierz uzytkownika i zwroc jego dane w postci JSON
        // @param - get z id uzytkownika w bazie danych
        // @return - JSON - dane uzytkowniak
        app.get('/uzytkownik/id/:id', wagner.invoke( (Uzytkownicy) => {
            return (req, res) => {

                const id = req.params.id
                Uzytkownicy.findOne({ _id: id}, (error, uzytkownik) => {
                    res.json(uzytkownik); 

                });
                // res.json({nazwa : 'test4445', imie: 'Mieszko3', nazwisko: "Trzeci", email: "mieszko@gniezno.pl", response: req.params.id});
            }
        }));

        // app.post('/uzytkownik/utworz', (req, res) => {
        //     res.json({nazwa : 'test4445'});
        // });


        app.post('/uzytkownik/utworz', wagner.invoke( (Uzytkownicy) => {
            return (req, res) => {
                    // uzytkownik = new Uzytkownicy({nazwa : 'testKrol', imie: 'Jagiello', nazwisko: "Pierwszy", email: "jagielo@krakow.pl", passwordhash: "hhadjdha2"});

                // utworz uzytkownika z     
                try {
                    uzytkownik = new Uzytkownicy({
                        nazwa : req.body.nazwa, 
                        imie: req.body.imie, 
                        nazwisko: req.body.nazwisko, 
                        email: req.body.email, 
                        passwordhash: req.body.passwordhash,
                    });
                } catch(e) {
                    return res.
                        status(status.BAD_REQUEST)
                        .json({error: "Nie mozna utworzyc uzytkownika"});
                }


                ///validacja danych uzytkownia
                uzytkownik.validate(function(err) {          
                  if (err) {
                    return res.      
                        status(status.BAD_REQUEST)
                        .json({error: "Błędne dane użytkownika"});
                  }         
                  else {
                    // validation passed
                    // console.log(req.body);
                    
                    uzytkownik.save( (error, nowy_uzytkownik) => {
                        if (error) {
                            return res.
                                status(status.INTERNAL_SERVER_ERROR).
                                json( { error: error.toString() } );
                        } else {
                            return res.json(nowy_uzytkownik);
                        }
                    });                 
                  }
                });




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
