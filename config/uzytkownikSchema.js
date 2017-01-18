var mongoose = require('mongoose');


var mongoose = require('mongoose');

var uzytkownikSchema = {
  _id: { type: String },
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
  data: { type: Date, default: Date.now }, 
  posty: [{ type : ObjectId, ref: 'Post' }],
  // liczba_postow {type int, default: 0}

};


module.exports = new mongoose.Schema(uzytkownikSchema);
module.exports.uzytkownikSchema = uzytkownikSchema;

