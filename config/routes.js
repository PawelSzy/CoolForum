var async = require('async');

module.exports = function(app) {

    Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

	// app.get('/uzytkownik/test', (req, res) => {
 //    	res.json({nazwa: "krol", imie "Mieszko", nazwisko: "Pierwszy" }); 
};