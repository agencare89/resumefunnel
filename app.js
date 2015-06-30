/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');
var ejs = require('ejs');
var cfenv = require('cfenv');
var helpers = require('express-helpers');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash'); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

// database config
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport); // pass passport for configuration

var app = express();

app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(multer({ dest: './uploads/img/', 
    rename: function (fieldname, filename, req, res) {
        return filename;
	}
}));

// Routes
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var postings = require('./routes/postings');
var dashboard = require('./routes/dashboard');
var job = require('./routes/job');
var newPost = require('./routes/new');

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/postings', postings);
app.use('/dashboard', dashboard);
app.use('/job', job);
app.use('/new', newPost);

var appEnv = cfenv.getAppEnv();

helpers(app);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url);
});
