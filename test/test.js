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


// it('dodaj 3+4', () => {
// 	var res = 3+4;
// 	expect(res).toBe(8);

// });

//  _id: { type: String },
//   nazwa: { type: String, required: true },
//   passwordhash: { type: String, required: true},
//   imie: { type: String},
//   nazwisko: { type: String}, 
//   email: {
//     type: String,
//     required: true,
//     match: /.+@.+\..+/,
//     lowercase: true
//   },
//   data: { type: Date, default: Date.now }, 
//   posty: [{ type : ObjectId, ref: 'Post' }],
//   // liczba_postow {type int, default: 0}

// };



describe('uzytkownik', function() {
	it('uzytkownik zostal zdefiniowany', function(done) { 
		var u = new Uzytkownik({nazwa: "testAndrzej", imie: "Andrzej", nazwisko: "Kowalski", passwordhash: "jsjhjhhj"});
		assert.isDefined(u, "Uzytkownik zostal zdefiniowany");
		done();
	});

    it('validacja koczny sie bledem jesli imie nie zostalo zdefiniowane', function(done) {
		var u = new Uzytkownik({imie: "Andrzej", nazwisko: "Kowalski", passwordhash: "jsjhjhhj"});
        u.validate(function(err) {
            expect(err.errors.nazwa).to.exist;
            done();
        });
    });
});