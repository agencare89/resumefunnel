var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) { 
    res.render('login', {
        user : req.user, 
        message: req.flash('loginMessage') 
    });
});

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/postings', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
 
module.exports = router;