var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

var uzytkownikSchema = {
  // _id: { type: String },
  nazwa: { type: String, required: true, minlength: 1 },
  passwordhash: { type: String, required: true, minlength: 1},
  imie: { type: String},
  nazwisko: { type: String}, 
  email: {
    type: String,
    match: /.+@.+\..+/,
    lowercase: true,
    minlength: 1,
    unique: true
  },
  data: { type: Date, default: Date.now },
  posty: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  liczba_postow: {type: Number , default: 0}
};


var schema = new mongoose.Schema(uzytkownikSchema);

// schema.virtual('liczba_postow').get( function() {
//   return this.posty.length
// });


schema.method('zwiekszLicznikLiczbaPostow', function (liczba_nowych_postow = 1)  {
    this.liczba_postow +=liczba_nowych_postow ;
});


schema.method('zmiejszLicznikLiczbaPostow', function (liczba_usunietych_postow = 1)  {
    this.liczba_postow -= liczba_usunietych_postow ;
});


schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
module.exports.uzytkownikSchema = uzytkownikSchema;

