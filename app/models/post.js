var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
mongoose.Promise = require('bluebird');

// // Wagner

module.exports = function(wagner) {
	 // mongoose.connect('mongodb://localhost/uzytkownik');

	var postSchema = require('../../config/postSchema');
	var Posty = mongoose.model('Post', postSchema);



	wagner.factory('Posty', function() {
		return Posty;
	});

	return { Posty: Posty};

};
