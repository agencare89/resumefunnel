var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
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
});

module.exports = router;