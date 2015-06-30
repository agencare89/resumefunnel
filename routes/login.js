var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', loggedIn, function(req, res, next) { 
    res.render('login', {
        user : req.user, 
        message: req.flash('loginMessage') 
    });
});

router.post('/', loggedIn, passport.authenticate('local-login', {
    successRedirect : '/postings', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

function loggedIn(req, res, next) {
    if (!req.user) {
        next();
    } else {
        res.redirect('/dashboard');
    }
}
 
module.exports = router;