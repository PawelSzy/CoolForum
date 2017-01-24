module.exports = function(wagner, app) {
	
	//route - pobierz post i zwroc jego dane w postci JSON
	// @param - get z id posta w bazie danych
	// @return - JSON - post
	app.get('/post/id/:id', wagner.invoke( (Posty) => {
		return (req, res) => {

			const id = req.params.id
			Posty.findById(id, (error, post) => {
				res.json(post); 
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
	}	
	
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


}

