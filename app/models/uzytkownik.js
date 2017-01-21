var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
// // mongoose.Types.ObjectId("<object_id>");
// // require('mongoose').Schema.ObjectId ;
// // var uzytkownikSchema = require('../../config/uzytkownikSchema');

// // module.exports = mongoose.model('Uzytkownik', uzytkownikSchema);


// // Wagner

module.exports = function(wagner) {
	 // mongoose.connect('mongodb://localhost/uzytkownik');

	var uzytkownikSchema = require('../../config/uzytkownikSchema');
	var Uzytkownicy = mongoose.model('Uzytkownik', uzytkownikSchema);

	wagner.factory('Uzytkownicy', function() {
		return Uzytkownicy;
	});

	return { Uzytkownicy: Uzytkownicy};

};
