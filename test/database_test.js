// getting-started.js



'use strict';
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should(),
chaiHttp = require('chai-http'),
assert = chai.assert;

chai.use(chaiHttp);


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/uzytkownik');;

describe('uzytkownik', function() {

  it('sprawdza nazwe uzytkownika request', function(done) {
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
		  var Uzytkownicy = require('../app/models/uzytkownik');
		  var uzytkownik= new Uzytkownicy({nazwa : 'testKrol', imie: 'Jagiello', nazwisko: "Pierwszy", email: "jagielo@krakow.pl", passwordhash: "hhadjdha2"});
		

		uzytkownik.save(function (err, uzytkownik) {
		  if (err) return console.error(err);
		  console.log(uzytkownik);
		});
		  
		  Uzytkownicy.find(function (err, uzytkownik) {
		  	if (err) return console.error(err);
		  	console.log(uzytkownik);
			})
		});
 		done();
 });

});

