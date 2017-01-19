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


var request = require('supertest')
var express = require('express');

var app = express();


var Uzytkownik = require('../app/models/uzytkownik');

const myLocalhost = 'http://localhost:3000';





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


describe('uzytkownik', function() {
	it('uzytkownik zostal zdefiniowany', function(done) { 
		var u = new Uzytkownik({nazwa: "testAndrzej", imie: "Andrzej", nazwisko: "Kowalski", passwordhash: "jsjhjhhj"});
		assert.isDefined(u, "Uzytkownik zostal zdefiniowany");
		done();
	});

    it('validacja konczy sie bledem jesli nazwa nie zostalo zdefiniowane', function(done) {
		var u = new Uzytkownik({imie: "Andrzej", nazwisko: "Kowalski", passwordhash: "jsjhjhhj"});
        u.validate(function(err) {
            expect(err.errors.nazwa).to.exist;
            done();
        });
    });

    it('validacja konczy sie bledem jesli passwordhash nie zostalo zdefiniowane', function(done) {
		var u = new Uzytkownik({nazwa: "Halabardnik", nazwisko: "Kowalski"});
        u.validate(function(err) {
            expect(err.errors.passwordhash).to.exist;
            done();
        });
    }); 

});

describe('uzytkownik GET', function() {
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

  // it('sprawdza nazwe uzytkownika request', function(done) {
  //   request(app)
  //     .get('/uzytkownik/test/')
  //     .expect((res) => {
  //       console.log(res.body);
  //       // res.body.should.have.property("imie");
  //     })
  //     .end(function(err, res) {
  //       if (err) {
  //         console.log(res);
  //         return done(err);
  //       }
  //       if (res) {
  //         console.log(res);
  //         return done(res);
  //       }
  //     });                              // <= Call done to signal callback end
  // });

// chai.request(app)

  // it('wyswietla strone uzytkownika', function(done) {
  //   request(app)
  //   .get('/api')
  //   // .expect('Content-Type', 'application/json;')
  //   // .expect('Content-Length', '15')
  //   // .expect(res.body.imie).toBe("Mieszko")
  //   .end(function(err, res){
  //       if(err){
  //           console.log("error");
  //           done(err);
  //       }
  //       else {
  //           console.log(res);
  //           // expect(res.body.imie).toBe("Mieszko")
  //           done();
  //       }
  //   });
  // });

});