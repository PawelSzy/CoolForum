var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
mongoose.Promise = require('bluebird');

// // Wagner

module.exports = function(wagner) {
	 // mongoose.connect('mongodb://localhost/uzytkownik');

	var tematSchema = require('../../config/tematSchema');
	var Tematy = mongoose.model('Tematy', tematSchema);

	wagner.factory('Tematy', function() {
		return Tematy;
	});

	return { Tematy: Tematy};

};
