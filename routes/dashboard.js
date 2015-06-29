var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', loggedIn, function(req, res, next) {
  	res.render('dashboard', { 
  		user : req.user,
  		dashboard : 'active'
  	});
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;