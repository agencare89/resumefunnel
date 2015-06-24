var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
  	res.render('postings', { 
  		user : {
  			firstName : 'Tom',
  			lastName : 'Fischer',
  			email : 'ftom05@ca.ibm.com',
  			companyName : 'IBM',
  			companyLocation : '8200 Warden Ave,\nUnionville, ON Canada\nL6G 1C7',
  			companyWebsite : 'http://www.ibm.com/',
  			companyLogo : 'images/IBM_logo.svg'
  		},
  		postings : 'active'
  	});
});

module.exports = router;