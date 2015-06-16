/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');
var ejs = require('ejs');
var cfenv = require('cfenv');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Routes
var index = require('./routes/index');
app.use('/', index);

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url);
});
