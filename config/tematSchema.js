var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;


var tematSchema = {
  id_autora: { type : mongoose.Schema.Types.ObjectId, ref: 'Uzytkownik', reguired: true  },
  //id_autora: { type : String, reguired: true},

  tytul: { type: String, required: true},
  data_utworzenia: { type: Date, default: Date.now },
  data_ostatniej_modyfikacji: { type: Date, default: Date.now },
  posty: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Post' }],

  parent: {
	type : mongoose.Schema.Types.ObjectId, 
	ref: 'Temat'
  },

  ancestors: [{
	type : mongoose.Schema.Types.ObjectId, 
	ref: 'Temat'
  }]	

};


var schema = new mongoose.Schema(tematSchema);


//ustaw maksymalna dlugosc tytulu
schema.path('tytul').validate(function (v) {
  return v.length < 32;
});

schema.method('dodajAncestors', function (idNowegoPodtematu)  {
    this.ancestors.push(idNowegoPodtematu);
});

schema.method('dodajPost', function (idPostu)  {
    this.posty.push(idPostu);
});

schema.method('usunPost', function (idPostu)  {
  this.posty = this.posty.filter(item => item !== idPostu);
});


module.exports = schema;
module.exports.tematSchema = tematSchema;

