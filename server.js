var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/recrosoft';
var path = require("path")
var sessions = require('express-session');
var passport = require('passport');
require('./app/controllers/passport')(passport)

var routes = require('./app/routes/index.js');
var auth = require('./app/routes/auth.js')(passport);


// /mongoose.Promise = global.Promise;
mongoose.connect(url);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + url);
  });
  mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
  });
  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
  });


var app = express();


// seting up view engine as html
var engines = require('consolidate');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(sessions({
  secret:"thesecret",
  saveUninitialized:false,
  resave:false 
}));

app.use('/node_modules',express.static(__dirname + "/node_modules"))
// app.use(device.capture());
app.use(morgan('dev'))


// body parser to get the values from form elements
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',routes)
app.use('/auth',auth)

app.listen(3000);