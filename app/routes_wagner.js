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
            }
        }));


       //route - pobierz post i zwroc jego dane w postci JSON
        // @param - get z id posta w bazie danych
        // @return - JSON - post
        app.get('/post/id/:id', wagner.invoke( (Posty) => {
            return (req, res) => {

                const id = req.params.id
                Posty.findOne({ _id: id}, (error, post) => {
                    res.json(post); 
                });
            }
        }));


        //route - zapisz uzytkownika w baze danych i zwroc jego dane w postci JSON
        // @param - POST zawierajcy JSON z danymi uzytkowanika 
        // @return  - JSON zawierajacy dane uzytkownika

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
                    

                    //zapisz uzytkownia i 
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
            }
        }));


      //route - zapisz post w bazie danych i zwroc jego dane w postci JSON
        // @param - POST zawierajcy JSON z danymi uzytkowanika 
        // @return  - JSON zawierajacy dane uzytkownika

        app.post('/post/utworz', wagner.invoke( (Posty) => {
            return (req, res) => {

                // utworz uzytkownika z     
                try {
                    post = new Posty({
                        tytul : req.body.tytul, 
                        tresc: req.body.tresc, 
                        data_utworzenia: req.body.data_utworzenia,
                        id_autora: '5885e2a4bcf6de07ece716b2'
                    });
                } catch(e) {
                    return res.
                        status(status.BAD_REQUEST)
                        .json({error: "Nie mozna zapisac postu"});
                }


                ///validacja danych uzytkownia
                post.validate(function(err) {          
                  if (err) {
                    return res.      
                        status(status.BAD_REQUEST)
                        .json({error: "Błędne dane użytkownika"});
                  }         
                  else {

                    //zapisz post i 
                    post.save( (error, nowy_post) => {
                        if (error) {
                            return res.
                                status(status.INTERNAL_SERVER_ERROR).
                                json( { error: error.toString() } );
                        } else {
                            return res.json(nowy_post);
                        }
                    });                 
                  }
                });
            }
        }));








        //zwroc api bo funckja bedzie traktowana jako middleware
        return api;

    };
