module.exports = function(wagner, app) {

	var _ = require('lodash');
	
	//route - pobierz post i zwroc jego dane w postci JSON
	// @param - get z id posta w bazie danych
	// @return - JSON - post
	app.get('/post/id/:id', wagner.invoke( (Posty) => {
		return (req, res) => {

			const id = req.params.id
			Posty.findById(id, (error, post) => {
				if(error) {
					return error;
				} else {
					res.json(post); 
				}
			});
		}
	}));

	


	var zwieksz_id_autora = (id_autora, zwieksz_o =1) => {
		wagner.invoke( (Uzytkownicy) => {
			try {
				Uzytkownicy.findById(id_autora, {passwordhash: 0}, (error, uzytkownik) => {
					uzytkownik.zwiekszLicznikLiczbaPostow( zwieksz_o );
					uzytkownik.save();
				});
			} catch(e) {
				console.log("nie moge zwiekszyc liczby postow danego uzytkownika");
			}                                   
		});
	};

	var zmiejsz_id_autora = (id_autora, zmiejsz_o = 1) => {
		wagner.invoke( (Uzytkownicy) => {
			try {
				Uzytkownicy.findById(id_autora, {passwordhash: 0}, (error, uzytkownik) => {
					uzytkownik.zmiejszLicznikLiczbaPostow( zmiejsz_o );
					uzytkownik.save();
				});
			} catch(e) {
				console.log("nie moge zmiejszyc liczby postow danego uzytkownika");
			}                                   
		});
	};


	
	var nowyPostZnaczyJegoId_w_temacie = (id_postu, id_tematu) => {
		wagner.invoke( (Tematy) => {
		   try {
				Tematy.findById(id_tematu, (error, temat) => {
					temat.dodajPost(id_postu);
					temat.save();
				});
			} catch(e) {
				console.log("nie moge zapisac id nowego postu w odpowiadajacym mu temacie ");
			}
		});      
	};

		var usunPostZnaczyTakzeUsunJegoId_w_temacie = (id_postu, id_tematu) => {
		wagner.invoke( (Tematy) => {
		   try {
				Tematy.findById(id_tematu, (error, temat) => {
					temat.usunPost(id_postu);
					temat.save();
				});
			} catch(e) {
				console.log("nie moge zapisac id nowego postu w odpowiadajacym mu temacie ");
			}
		});      
	};

	
	
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
					id_autora: req.body.id_autora, //'5885e2a4bcf6de07ece716b2'
					temat: req.body.temat
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

						const id_autora = nowy_post.id_autora;
						const id_tematu= post.temat;
						const id_postu = nowy_post._id;
						
						if(id_tematu) { 
							nowyPostZnaczyJegoId_w_temacie(id_postu, id_tematu);
						}
						zwieksz_id_autora(id_autora);

						return res.json(nowy_post);
					}
				});                 
			  }
			});
		}
	}));


	app.delete('/post/id/:id', wagner.invoke( (Posty) => {
		return (req, res) => {

			const id_postu = req.params.id
			var id_autora;
			var id_tematu;
			Posty.findById(id_postu, (error, post) => {
							if(error) {
								return error;
							} else {
								id_tematu= post.temat;
								id_autora = post.id_autora; 
								const zmiejsz_o =1;
				 				zmiejsz_id_autora(id_autora, zmiejsz_o);			
								usunPostZnaczyTakzeUsunJegoId_w_temacie(id_postu, id_tematu); 						
							}
			});			
			Posty.findByIdAndRemove(id_postu, (error, deleteResponse) => {
				if(error) {
					return error
				}
				else {				
					res.json(deleteResponse);
				} 
			});
		}
	}));


	app.patch('/post/id/:id',	wagner.invoke( (Posty) => {
        return (req, res) => {

            try {
                post = new Posty({
                    tytul : req.body.tytul, 
                    tresc: req.body.tresc,
                    data_ostatniej_modyfikacji: JSON.stringify({ type: Date, default: Date.now })
                });
            } catch(e) {
                return res.
                    status(status.BAD_REQUEST)
                    .json({error: "Nie mozna modyfikowac postu"});
            }



            const id = req.params.id;

            var body = _.pick(req.body, ['tytul', 'tresc']);

			body['data_ostatniej_modyfikacji'] =  new Date().toString();

            Posty.findByIdAndUpdate(id, {$set: body}, {new: true}, (error, updateResponse) => {
                if(error) {
                    return error
                }
                else {
                    return res.json(updateResponse);
                }; 
            });
        };
    }));
		

}

