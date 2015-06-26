var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
    // if you're on the dashboard page, you need to be logged in
  	res.render('dashboard', { 
<<<<<<< HEAD
  		user : req.user,
=======
  		user : {
  			firstName : 'Tom',
  			lastName : 'Fischer',
  			email : 'ftom05@ca.ibm.com',
  			companyName : 'IBM',
  			companyLocation : '8200 Warden Ave,\nUnionville, ON Canada\nL6G 1C7',
  			companyWebsite : 'http://www.ibm.com/',
  			companyLogo : 'images/IBM_logo.svg'
  		},
>>>>>>> ef6e116219e9b4b9dbfa861066b13bce67e86d68
  		dashboard : 'active'
  	});
});

module.exports = router;