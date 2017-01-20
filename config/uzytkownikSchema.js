var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

var uzytkownikSchema = {
  // _id: { type: String },
  nazwa: { type: String, required: true },
  passwordhash: { type: String, required: true},
  imie: { type: String},
  nazwisko: { type: String}, 
  email: {
    type: String,
    match: /.+@.+\..+/,
    lowercase: true
  },
  data: { type: Date, default: Date.now },
  posty: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  liczba_postow: {type: Number , default: 0}
};


module.exports = new mongoose.Schema(uzytkownikSchema);
module.exports.uzytkownikSchema = uzytkownikSchema;

