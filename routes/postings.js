var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('postings', { 
  		user : req.user,
  		postings : 'active'
  	 });
});

module.exports = router;