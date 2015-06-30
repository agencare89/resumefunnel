var express = require('express');
var passport = require('passport');
var router = express.Router();
var multer = require('multer');

router.get('/', function(req, res, next) { 
    res.render('register', { 
        user : null, 
        message: req.flash('signupMessage') 
    });
});

// router.post('/', passport.authenticate('local-register', {
//     successRedirect : '/postings', // redirect to the secure profile section
//     failureRedirect : '/register', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));  

router.post('/',
	[multer({ dest: './uploads/', 
    rename: function (fieldname, filename, req, res) {
        return filename;
	}
	}),	
	passport.authenticate('local-register', {
	    successRedirect : '/postings', // redirect to the secure profile section
	    failureRedirect : '/register', // redirect back to the signup page if there is an error
	    failureFlash : true // allow flash messages
	})
	]);

module.exports = router;