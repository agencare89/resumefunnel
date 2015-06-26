var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
    if (req.user) { 
        res.render('job', { 
            user: req.user
        });
    }
    else { 
        res.render('job', { 
  		    user : null
        }); 
    }
});

module.exports = router;