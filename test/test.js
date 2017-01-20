'use strict';
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should(),
chaiHttp = require('chai-http'),
assert = chai.assert;

chai.use(chaiHttp);
// var assert = require('assert');


// var myApp = require('../app/app.js');

// var request = require('supertest');

var wagner = require('wagner-core');
var request = require('supertest')
var express = require('express');

var app = express();


// var Uzytkownik = require('../app/models/uzytkownik');

const myLocalhost = 'http://localhost:3000';


var models = require('../app/models/uzytkownik')(wagner);

// var Uzytkownicy = models.Uzytkownicy;


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


it('dodaj 3+5', () => {
	var res = 3+5;
	assert.equal(res, 8);
});


describe('uzytkownik', function(done) {

  var models = require('../app/models/uzytkownik')(wagner);
  app.use(wagner);

	it('uzytkownik zostal zdefiniowany', function(done) { 
    wagner.invoke((Uzytkownicy) => {
        var u = new Uzytkownicy({imie: "Andrzej", nazwisko: "Kowalski", passwordhash: "jsjhjhhj"});
        assert.isDefined(u, "Uzytkownik zostal zdefiniowany");
        done();
    });	
	});


  it('validacja konczy sie bledem jesli nazwa nie zostalo zdefiniowane', function(done) { 
    wagner.invoke((Uzytkownicy) => {
        var u = new Uzytkownicy({imie: "Andrzej", nazwisko: "Kowalski", passwordhash: "jsjhjhhj"});
        u.validate(function(err) {
            expect(err.errors.nazwa).to.exist;
            done();
        });
    }); 
  });


  it('validacja konczy sie bledem jesli passwordhash nie zostalo zdefiniowane', function(done) { 
    wagner.invoke((Uzytkownicy) => {
    var u = new Uzytkownicy({nazwa: "Halabardnik", nazwisko: "Kowalski"});
        u.validate(function(err) {
            expect(err.errors.passwordhash).to.exist;
            done();
        });
    }); 
  });

});

describe('uzytkownik GET', function(done) {
  var models = require('../app/models/uzytkownik')(wagner);
  app.use(wagner);

  it('wyswietla strone uzytkownika chaiHttp', function(done) {
    chai.request(myLocalhost)
      .get('/uzytkownik/test')
      .end(function(err, res) {
        expect(res).to.have.status(200).to.be.json;
        done();                               // <= Call done to signal callback end
      });
  }) ;

 it('sprawdza nazwe uzytkownika request', function(done) {
      request(myLocalhost)
      .get('/uzytkownik/test/').
      expect(200).
      expect('Content-Type', 'application/json')
      .end(function(err, res) {
        res.body.should.have.property("imie");

        done();
    });;
  });
});




describe('uzytkownik', function() {

   var mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/uzytkownik');

  it('zapis i odczyt do bazy danych', function(done) {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(done) {
      
      var uzytkownik= new Uzytkownicy({nazwa : 'testKrol', imie: 'Jagiello', nazwisko: "Pierwszy", email: "jagielo@krakow.pl", passwordhash: "hhadjdha2"});
    

    uzytkownik.save(function (err, uzytkownik455) {
      if (err) done(err)
      // else done();

    });
      
      Uzytkownicy.find(function (err, uzytkownik) {
        if (err) done(err);
        // else done(0)
        expect(uzytkownik4454).to.exist;
        // done();
        // console.log(uzytkownik);
      })
 
    });
     done();
 });
});
