
'use strict';
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should(),
chaiHttp = require('chai-http'),
assert = chai.assert;

chai.use(chaiHttp);
// var assert = require('assert');


// var myApp = require('../app/app.js');

// var request = require('supertest');

var wagner = require('wagner-core');
var request = require('supertest')
var express = require('express');
var bodyParser     = require('body-parser');



var app = express();        


 var models = require('../app/models/uzytkownik')(wagner);
 var models = require('../app/models/post')(wagner);
 var models = require('../app/models/temat')(wagner);
  app.use(wagner);

// var Uzytkownik = require('../app/models/uzytkownik');

const myLocalhost = 'http://localhost:3000';


var przyklad_id_postu = "58875ecaee5ec008a8188601";
var przyklad_id_autora = "5885e2a4bcf6de07ece716b2";

var mongoose = require('mongoose');

// var models = require('../app/models/uzytkownik')(wagner);

// var Uzytkownicy = models.Uzytkownicy;


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


it('dodaj 3+5', () => {
  var res = 3+5;
  assert.equal(res, 8);
});


describe('uzytkownik', function(done) {

  it('uzytkownik zostal zdefiniowany', function(done) { 
    wagner.invoke((Uzytkownicy) => {
        var u = new Uzytkownicy({imie: "Andrzej", nazwisko: "Kowalski", passwordhash: "jsjhjhhj"});
        assert.isDefined(u, "Uzytkownik zostal zdefiniowany");
        done();
    }).catch( (e) => done(e) ); 
  });

  it('validacja konczy sie bledem jesli nazwa nie zostalo zdefiniowane', function(done) { 
    wagner.invoke((Uzytkownicy) => {
        var u = new Uzytkownicy({imie: "Andrzej", nazwisko: "Kowalski", passwordhash: "jsjhjhhj"});
        u.validate(function(err) {
            expect(err.errors.nazwa).to.exist;
            done();
        });
    }); 
  });

  it('validacja konczy sie bledem jesli passwordhash nie zostalo zdefiniowane', function(done) { 
    wagner.invoke((Uzytkownicy) => {
    var u = new Uzytkownicy({nazwa: "Halabardnik", nazwisko: "Kowalski",  });
        u.validate(function(err) {
            expect(err.errors.passwordhash).to.exist;
            done();
        });
    }); 
  });


  it('testuj zwieksz licznik liczbe postow uzytkownika' , (done) => {
    wagner.invoke((Uzytkownicy) => {
      var u = new Uzytkownicy({nazwa: "Lucznik", nazwisko: "Starsz", });
      expect(u.liczba_postow).to.exist;
      var liczba_postow_then = u.liczba_postow;
      u.zwiekszLicznikLiczbaPostow();
      expect(u.liczba_postow).to.be.equal(liczba_postow_then + 1);
      done();
    })
  }); 
});


describe('tworzenie tematu', function(done) {
  it('walidacja tematu' , (done) => {
    wagner.invoke((Tematy) => {
        var u = new Tematy({tytul: "Frank Herberts Quotes" });
        assert.isDefined(u, "Temat zostal zdefiniowany");
        done();
    }).catch( (e) => done(e) ); 
  });


  it('walidacja tematu' , (done) => {
    wagner.invoke((Tematy) => {
        var u = new Tematy({tytul: "Frank Herberts Quotes" });
        u.validate(function(err) {
            expect(err).not.to.exist;
            done();
        });
    });
  });


  it('wykryj ze nie podano tematu' , (done) => {
    wagner.invoke((Tematy) => {
        var u = new Tematy({});
        u.validate(function(err) {
            expect(err.errors.tytul).to.exist;
            done();
        });
    });
  });


  it('wykryj ze nie podano nie istniejacy parent tematu' , (done) => {
    wagner.invoke((Tematy) => {
        var u = new Tematy({tytul: "Frank Herberts Quotes III", parent: 0});
        u.validate(function(err) {
            expect(err.errors.parent).to.exist;
            done();
        });
      }) ;
    });


  it(' Temat prawdz czy dziala fukcja dodaj post', (done) => {
    wagner.invoke((Tematy) => {
        var u = new Tematy({tytul: "Frank Herberts Quotes IV"});
        assert.isDefined(u, "Temat zostal zdefiniowany");
        const testowane_id_postu = przyklad_id_postu;


        u.dodajPost(testowane_id_postu);
        assert.isDefined(u, "Temat zostal zdefiniowany");
        // expect(u.posty2).to.exist;
        expect(u.posty).to.include( testowane_id_postu);
        u.validate(function(err) {
            expect(err).not.to.exist;
            done();
        });
      })
    }); 
});


describe('uzytkownik GET', function(done) {

  it('wyswietla strone uzytkownika chaiHttp', function(done) {
    chai.request(myLocalhost)
      .get('/uzytkownik/test')
      .end(function(err, res) {
        expect(res).to.have.status(200).to.be.json;
        done();                               // <= Call done to signal callback end
      });
  }) ;

 it('sprawdza nazwe uzytkownika request', function(done) {
      request(myLocalhost)
      .get('/uzytkownik/test/').
      expect(200).
      expect('Content-Type', 'application/json')
      .end(function(err, res) {
        res.body.should.have.property("imie");
        done();
    });
  });


});


describe('prosty POST, odczyt i zapis uzytkownika do bazy danych', () => {

  it('powinno odczytac prosty przeslanie POST', (done) => {
   
    var uzytkownik_Wyslany_Text =  {
      "nazwa": "testuje nazwa",
      "imie": "Ludwik XIV",
      "nazwisko": "Krol Francji",
      "email":  "ludwiczek@wersal.fr",
      "passwordhash": "madamePompadur"
    };

    request(myLocalhost)
      .post('/uzytkownik/utworz')
      .send(uzytkownik_Wyslany_Text)
      .expect(200)
      .expect( (res) => {
        res.body.should.have.property("imie");
      })
      .end((err, res) => {
          if(err) {
            return done(err);
          } else {
            res.body.should.have.property("imie");
            res.body.nazwa.should.be.equal("testuje nazwa");

            done();
          }
      })
      //.
       // done();
  });    



 it('powinien odczytac zapisanego uzytkownika', (done) => {

   var uzytkownik_Wyslany_Text =  {
      "nazwa": "testuje nazwa",
      "imie": "Napoleon",
      "nazwisko": "Cesarz Francji",
      "email":  "napoleon@wersal.fr",
      "passwordhash": "Vive_la_France"
    };


  request(myLocalhost)
    .post('/uzytkownik/utworz')
    .send(uzytkownik_Wyslany_Text)
    .expect(200)
    .expect( (res) => {
      res.body.should.have.property("imie");
    })
    .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          res.body.should.have.property("imie");
          res.body.should.have.property("_id");

          const id = res.body._id;
// 

          /// teraz sprawdzam GET - pobierz dane uzytkownika 
          request(myLocalhost)
            .get('/uzytkownik/id/'+id).
            expect(200).
            expect('Content-Type', 'application/json')
            .end(function(err, res) {
              res.body.should.have.property("nazwa");
              res.body.should.have.property("imie");
              res.body.should.have.property("nazwisko");
              res.body.should.have.property("posty");
              res.body.should.have.property("data");

              res.body.should.not.have.property("passwordhash");

              res.body.should.have.property("posty").with.lengthOf(0);

              res.body.nazwa.should.be.equal(uzytkownik_Wyslany_Text.nazwa);
              res.body.imie.should.be.equal(uzytkownik_Wyslany_Text.imie);
              res.body.nazwisko.should.be.equal(uzytkownik_Wyslany_Text.nazwisko);
              res.body.liczba_postow.should.be.equal(0);  
              done();
          });

        }    
        // done();
      
    });
  });

  it('czy delete uzytkownik dziala', (done) => {

   var uzytkownik_Wyslany_Text =  {
      "nazwa": "testuje delete nazwa",
      "imie": "Karol",
      "nazwisko": "Cesarz Niemiec, Krol Aragoni i Kastyli...",
      "email":  "karol@madryt.hr",
      "passwordhash": "La Caramba"
    };

  request(myLocalhost)
    .post('/uzytkownik/utworz')
    .send(uzytkownik_Wyslany_Text)
    .expect(200)
    .expect( (res) => {
      res.body.should.have.property("_id");

    }).end( (err, res) => {

      var id_uzytkownika= res.body._id;
      ///// teraz tesutje delete 
      request(myLocalhost)
        .delete('/uzytkownik/id/'+id_uzytkownika).
        end( (err, res) => {
          request(myLocalhost)
            .get('/uzytkownik/id/'+id_uzytkownika).
            expect(404);
            done();        
        });
    });
  });


});


var czyPostDodanyDoTematu = (post_id, temat_id, done, url) => {
    request(url)
            .get('/temat/id/'+temat_id).
            expect(200).
            expect('Content-Type', 'application/json')
            .end((err, res) => { 
              res.body.should.have.property('posty');
              assert(res.body.posty.includes(post_id), "nie id w temacie");
              done();
            });

};


describe('prosty POST, odczyt i zapis tresci Postu do bazy danych', () => { 

  it('powinien odczytac zapisany post', (done) => {
   var wyslany_Post =  {
      "id_autora": przyklad_id_autora,
      "tytul": "Miecz przeznaczenia",
      "tresc": "Na moim sihillu – warknął Zoltan, ",
      "temat" : "58872530ec1f86052bb1d97d"
    };

  request(myLocalhost)
    .post('/post/utworz')
    .send(wyslany_Post)
    .expect(200)
    .expect( (res) => {
      res.body.should.have.property("_id");
      res.body.should.have.property("tresc");
      res.body.should.have.property("tytul");
    })
    .end((err, res) => {
        if(err) {
          return done(err);
        } else {
          res.body.should.have.property("_id");

          const id_nowy_post = res.body._id;


          /// teraz sprawdzam GET - pobierz Post  
          request(myLocalhost)
            .get('/post/id/'+id_nowy_post).
            expect(200).
            expect('Content-Type', 'application/json')
            .end(function(err, res) {
              res.body.should.have.property("tytul");
              res.body.should.have.property("tresc");
             res.body.should.have.property("id_autora");
             res.body.should.have.property("temat");

             res.body.temat.should.be.equal(wyslany_Post.temat);
              res.body.tresc.should.be.equal(wyslany_Post.tresc);
              res.body.tytul.should.be.equal(wyslany_Post.tytul);
              res.body.id_autora.should.be.equal(wyslany_Post.id_autora);

              czyPostDodanyDoTematu(id_nowy_post, wyslany_Post.temat, done, myLocalhost)
          });
        }    
    });
  });

  it('czy delete postu dziala', (done) => {

   var wyslany_Post =  {
      "id_autora": przyklad_id_autora,
      "tytul": "Wieza Jaskulki",
      "tresc": "Jest wodka, ",
      "temat" : "58872530ec1f86052bb1d97d"
    };

  request(myLocalhost)
    .post('/post/utworz')
    .send(wyslany_Post)
    .expect(200)
    .expect( (res) => {
      res.body.should.have.property("_id");
      res.body.should.have.property("tresc");
      res.body.should.have.property("tytul");
    }).end( (err, res) => {

      var id_postu = res.body._id;
      ///// teraz tesutje delete 
      request(myLocalhost)
        .delete('/post/id/'+id_postu).
        end( (err, res) => {
          request(myLocalhost)
            .get('/post/id/'+id_postu).
            expect(404);
            done();        
        });
    });
  });


});


describe('zwieszk o jeden liczbe postow uzytkownika przy zapisie nowego postu', () => {
  it('zwieszk o jeden liczbe postow przy zapisie', (done) => {
    const id_autora = "5885e2a4bcf6de07ece716b2";
    var wyslany_Post =  {
        "id_autora": id_autora,
        "tytul": "Miecz przeznaczenia",
        "tresc": "Na moim sihillu – warknął Zoltan, "
      };

      var poczatkowa_liczba_postow;

      //pobierz uzytkownika i zapisz liczbe postow
      request(myLocalhost)
      .get('/uzytkownik/id/'+id_autora).
      expect(200).
      expect('Content-Type', 'application/json')
      .end(function(err, res) {
        res.body.should.have.property("_id");
        res.body.should.have.property("liczba_postow");
        poczatkowa_liczba_postow = res.body.liczba_postow;
    });

    request(myLocalhost)
        .post('/post/utworz')
        .send(wyslany_Post)
        .expect(200)
        .expect( (res) => {
  
        })
        .end((err, res) => {
            if(err) {
              return done(err);
            } else {

              /// teraz sprawdzam GET - pobierz Post  
              request(myLocalhost)
                .get('/uzytkownik/id/'+id_autora).
                expect(200).
                expect('Content-Type', 'application/json')
                .end(function(err, res) {
                  res.body.should.have.property("_id");
                  res.body.should.have.property("liczba_postow");
                  res.body.liczba_postow.should.be.equal(poczatkowa_liczba_postow +1);  
                  done();
              });

            }    
            // done();
          
        });



  });

});



describe('prosty POST, odczyt i zapis tematu do bazy danych', () => {

  it('utworz nowy temat i go odczytaj', (done) => {
   
    const id_autora = "5885e2a4bcf6de07ece716b2";

    var uzytkownik_Wyslany_Text =  {
      "tytul": "cytaty ksiazkowe",
      "id_autora": id_autora
    };

    request(myLocalhost)
      .post('/temat/utworz')
      .send(uzytkownik_Wyslany_Text)
      .expect(200)
      .expect( (res) => {
        res.body.should.have.property("tytul");
      })
      .end((err, res) => {
          if(err) {
            return done(err);
          } else {
            res.body.should.have.property("_id");
            res.body.should.have.property("tytul");
            res.body.should.have.property("data_utworzenia");
            res.body.tytul.should.be.equal(uzytkownik_Wyslany_Text.tytul);

            const id_tematu = res.body._id

          request(myLocalhost)
            .get('/temat/id/'+id_tematu).
            expect(200).
            expect('Content-Type', 'application/json')
            .end(function(err, res) {
              res.body.should.have.property("_id");
              res.body.should.have.property("id_autora");
              res.body.should.have.property("tytul");
              done();
          });
        }        
      })
  });    
});


describe('Testowanie rodzic i potemek przy tworzeniu tematu', () => {

  it('Powiennien przy tworzeniu nowego tematu, dodac id nowgo tematu do tablicy jego przodka', (done) => {
   
    var temat_rodzic =  {
      "tytul": "Do testowania",
      "id_autora": przyklad_id_autora
    };


    var temat_potomek =  {
      "tytul": "Potomek",
      "id_autora": przyklad_id_autora
    };

    request(myLocalhost)
      .post('/temat/utworz')
      .send(temat_rodzic)
      .expect(200)
      .expect( (res) => {
        res.body.should.have.property("_id");
      })
      .end((err, res) => {
          if(err) {
            return done(err);
          } else {
            res.body.should.have.property("_id");

            const id_tematu_rodzica = res.body._id;
            temat_potomek.parent = id_tematu_rodzica;


            request(myLocalhost)
            .post('/temat/utworz')
            .send(temat_potomek)
            .expect(200)
            .expect( (res) => {
              res.body.should.have.property("_id");
            })            
            .end((err, res) => {
              if(err) {
                return done(err);
              } else {
                const id_tematu_potomka = res.body._id;
   
                ///////  teraz sprawdzam czy zapisano rodzica           
                request(myLocalhost)
                    .get('/temat/id/'+id_tematu_rodzica)
                    .expect(200)
                    .end((err, res) => {
                      res.body.should.have.property("_id");
                      res.body.should.have.property("ancestors");
                      res.body.ancestors.should.be.a('array');
                      assert(res.body.ancestors.includes(id_tematu_potomka));
                      done();
                    });
              }
            });
          }
      });  

  });    


  it('czy delete tematu dziala', (done) => {

    var temat_rodzic =  {
      "tytul": "Do testowania tematu",
      "id_autora": przyklad_id_autora
    };

  request(myLocalhost)
    .post('/temat/utworz')
    .send(temat_rodzic)
    .expect(200)
    .expect( (res) => {
      res.body.should.have.property("_id");

    }).end( (err, res) => {

      var id_tematu= res.body._id;
      ///// teraz tesutje delete 
      request(myLocalhost)
        .delete('/temat/id/'+id_tematu).
        end( (err, res) => {
          request(myLocalhost)
            .get('/temat/id/'+id_tematu)
            .expect(200)
            .end( (err, res) => {
                assert(!res.body);
                done();     
            });
   
        });
    });
  });




});


describe('Znajdz wszystkich podtematy danego tematu (wyszukaj wszystkich potomkow)', () => {


});




describe('uzytkownik zapis do bazy danych', function() {

    // mongoose.connect('mongodb://localhost/uzytkownik');

  it('zapis i odczyt do bazy danych', function(done) {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(done) {
      
      var uzytkownik= new Uzytkownicy({nazwa : 'testKrol', imie: 'Jagiello', nazwisko: "Pierwszy", email: "jagielo@krakow.pl", passwordhash: "hhadjdha2"});
    

    uzytkownik.save(function (err, uzytkownikZapisany) {
      if (err) done(err)
      // else done();

    });
      
      Uzytkownicy.find(function (err, uzytkownik) {
        if (err) done(err);
        // else done(0)
        expect(uzytkownikZapisany).to.exist;
        // done();
        // console.log(uzytkownik);
      })
 
    });
     done();
 });
});