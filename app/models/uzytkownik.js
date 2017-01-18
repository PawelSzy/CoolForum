var mongoose = require('mongoose');
// var ObjectId = require('mongodb').ObjectID;
// mongoose.Types.ObjectId("<object_id>");
// require('mongoose').Schema.ObjectId ;
// var uzytkownikSchema = require('../config/uzytkownikSchema');


var uzytkownikSchema = {
  // _id: { type: String },
  nazwa: { type: String, required: true },
  passwordhash: { type: String, required: true},
  imie: { type: String},
  nazwisko: { type: String}, 
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true
  },
  data: { type: Date, default: Date.now }
  // posty: [{ type : mongoose.Types.ObjectId("<object_id>"), ref: 'Post' }],
  // liczba_postow {type int, default: 0}

};

// var Uzytkownik = mongoose.model('Uzytkownik', uzytkownikSchema});

module.exports = mongoose.model('Uzytkownik', uzytkownikSchema);
