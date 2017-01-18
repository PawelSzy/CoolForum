'use strict';
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should(),
  assert = chai.assert;
// var assert = require('assert');


var Uzytkownik = require('../app/models/uzytkownik');

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