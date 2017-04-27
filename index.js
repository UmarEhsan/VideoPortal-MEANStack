//requiring NPM modeles
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var app = express();

db.on('error', console.error);

//requiring local modeles
var configs = require('./config');
var routes = require('./routes/routes');
var userModel = require('./models/users');
var helperFunctions = require('./helpers/helperFunctions');


// Uncomment the following lines to start logging requests to consoles.
// app.use(morgan('combined'));
// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json.
app.use(bodyParser.json());

//connedting to mongoDB
// mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
// var port = process.env.PORT || 3000;


// app.listen(port, function () {
//   // var port = app.address().port;
//
//   console.log("App now running on port", port);
// });

db.on('connected', function () {
  console.log('Mongoose default connection open to ' + configs.dbHost);
});
helperFunctions.populateDb();

// If the connection throws an error
db.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

var gracefulExit = function() {
  db.close(function () {
    console.log('Mongoose default connection with DB :' +  configs.dbHost + ' is disconnected through app termination');
    process.exit(0);
  });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

try {

  mongoose.connect( configs.dbHost );

  console.log("Trying to connect to DB " +  configs.dbHost);

} catch (err) {

  console.log("Sever initialization failed ", err.message)
};





//Initilizing routes.
routes(app);

// serve video files.
app.use('/videos',express.static('videos'));
// serve client side code.
app.use('/',express.static('client'));

//Finally starting the listener
app.listen(configs.applicationPort, function () {
  console.log('App now running on port '+configs.applicationPort+'!');
});
