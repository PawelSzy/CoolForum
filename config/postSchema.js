var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;


var postSchema = {
  id_autora: { type : mongoose.Schema.Types.ObjectId, ref: 'Uzytkownik', reguired: true  },
  //id_autora: { type : String, reguired: true},

  tytul: { type: String, required: true},
  tresc: { type: String, required: true},
  data_utworzenia: { type: Date, default: Date.now },
  ///// tutaj umiescic temat w ktorym jest ten post
  // id_tematu: {type; ObjectId, ref: "tematy"}

};


var schema = new mongoose.Schema(postSchema);


//ustaw maksymalna dlugosc tytulu
schema.path('tytul').validate(function (v) {
  return v.length < 32;
});

module.exports = schema;
module.exports.postSchema = postSchema;

