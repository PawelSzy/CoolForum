var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
// mongoose.Types.ObjectId("<object_id>");
// require('mongoose').Schema.ObjectId ;
var uzytkownikSchema = require('../../config/uzytkownikSchema');

module.exports = mongoose.model('Uzytkownik', uzytkownikSchema);
