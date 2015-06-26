var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
<<<<<<< HEAD
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
=======
  	res.render('job', {
  		user : null,
  		contact : {
  			firstName : 'Tom',
  			lastName : 'Fischer',
  			phoneNumber : '5195556106',
  			email : 'ftom05@ca.ibm.com',
  			companyName : 'IBM',
  			companyLocation : '8200 Warden Ave,\r\nUnionville, ON Canada\r\nL6G 1C7',
  			companyWebsite : 'http://www.ibm.com/',
  			companyLogo : 'images/IBM_logo.svg'
  		}
  	});
>>>>>>> ef6e116219e9b4b9dbfa861066b13bce67e86d68
});

module.exports = router;