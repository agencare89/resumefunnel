var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) { 
    res.render('register', { 
        user : null, 
        message: req.flash('signupMessage') 
    });
});

router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/postings', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));  

module.exports = router;