var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');
var multer  = require('multer');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-register', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

        function(req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err) { 
                        return done(err);
                    }
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        // if there is no user with that email create the user
                        var newUser             = new User();
                        // set the user's credentials
                        newUser.firstName       = req.body.firstName;
                        newUser.lastName        = req.body.lastName;
                        newUser.email           = email;
                        newUser.password        = newUser.generateHash(password);
                        newUser.phoneNumber     = req.body.phoneNumber;
                        newUser.companyName     = req.body.companyName;
                        newUser.companyLogo     = req.body.companyLogo;
                        
                        // save the user
                        newUser.save(function(err) {
                            if (err) throw err;
                            multer({ dest: './uploads/',
                                rename: function (fieldname, filename) {
                                    return filename+Date.now();
                                },
                                onFileUploadStart: function (file) {
                                },
                                onFileUploadComplete: function (file) {
                                    console.log("uploaded");
                            }});
                            return done(null, newUser);
                        });
                    }

                });    

            });

    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
        function(req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err) return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    // create the loginMessage and save it to session as flashdata
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
                }
                // all is well, return successful user
                return done(null, user);
            });

    }));

};