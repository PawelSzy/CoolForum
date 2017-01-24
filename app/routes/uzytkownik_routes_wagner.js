module.exports = function(wagner, app) {
	
	
	
  
  //route - pobierz uzytkownika i zwroc jego dane w postci JSON
        // @param - get z id uzytkownika w bazie danych
        // @return - JSON - dane uzytkowniak
        app.get('/uzytkownik/id/:id', wagner.invoke( (Uzytkownicy) => {
            return (req, res) => {

                const id = req.params.id
                Uzytkownicy.findById(id, {passwordhash: 0}, (error, uzytkownik) => {
                    res.json(uzytkownik); 
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


		
		
		
		
}