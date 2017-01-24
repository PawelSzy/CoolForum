module.exports = function(wagner, app) {

	var wstawNowegoPotomka = (id_rodzica, id_potomka) => {
		wagner.invoke( (Tematy) => {
			try {
				Tematy.findById(id_rodzica, (error, temat_rodzic) => {
					temat_rodzic.dodajAncestors(id_potomka);
					temat_rodzic.save();
				});
			} catch(e) {
				console.log("nie moge wstawNowegoPotomka");
			}               
		});
	};

	//route - pobierz uzytkownika i zwroc jego dane w postci JSON
	// @param - get z id uzytkownika w bazie danych
	// @return - JSON - dane uzytkowniak
	app.get('/temat/id/:id', wagner.invoke( (Tematy) => {
		return (req, res) => {

			const id = req.params.id
			Tematy.findById(id, (error, temat) => {
				res.json(temat); 
			});
		}
	}));

	app.post('/temat/utworz', wagner.invoke( (Tematy) => {
		return (req, res) => {

			// utworz uzytkownika z     
			try {
				temat = new Tematy({
					tytul : req.body.tytul, 
					data_utworzenia: req.body.data_utworzenia,
					id_autora: req.body.id_autora, //'5885e2a4bcf6de07ece716b2'
					parent: req.body.parent,
					ancestors: req.body.ancestors 
				});
			} catch(e) {
				return res.
					status(status.BAD_REQUEST)
					.json({error: "Nie mozna utworzyc nowego tematu"});
			}

			///validacja danych uzytkownia
			temat.validate(function(err) {          
			  if (err) {
				return res.      
					status(status.BAD_REQUEST)
					.json({error: "Błędne dane użytkownika"});
			  }         
			  else {

				//zapisz post i 
				temat.save( (error, nowy_temat) => {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json( { error: error.toString() } );
					} else {

						////////// Tutaj zwracamy utworzony temat

						if (nowy_temat.parent) {
							wstawNowegoPotomka(nowy_temat.parent,nowy_temat.id );
						}

						return res.json(nowy_temat);
					}
				});                 
			  }
			});
		}
	}));	
	
	
}
