 // app/routes.js

// grab the nerd model we just created
// var Nerd = require('./models/nerd');

    module.exports = function(app, wagner) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        // app.get('/api/nerds', function(req, res) {
        //     // use mongoose to get all nerds in the database
        //     Nerd.find(function(err, nerds) {

        //         // if there is an error retrieving, send the error. 
        //                         // nothing after res.send(err) will execute
        //         if (err)
        //             res.send(err);

        //         res.json(nerds); // return all nerds in JSON format
        //     });
        // });


        // app.get('/uzytkownik/test', (req, res) => {

        //     res.send("<h1>Test uzytkownika</h1>");
        // });


        // var api = express.Router();

        // require('../app/models/uzytkownik')(wagner);

        // app.get('/uzytkownik/test', wagner.invoke( (Uzytkownicy) => {
        //     (req, res) => {
        //         res.json({nazwa : 'test', imie: 'Mieszko', nazwisko: "Pierwszy", email: "mieszko@gniezno.pl"});
        //     }
        // }));


       app.get('/uzytkownik/test', (req, res) => {
            res.json({"nazwa" : 'test', "imie": 'Mieszko', "nazwisko": "Pierwszy", "email": "mieszko@gniezno.pl"});
        });


        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        // app.get('/', function(req, res) {
        //     res.sendfile(__dirname +'./public/views/index.html'); // load our public/index.html file
        // });

        return app;

    };
