var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('postings', { 
  		user : req.user,
  		postings : 'active'
  	 }, function(err, ejs) { 
        if (err) res.send(err); 
        console.log("hi adam");
        res.send(ejs);
    });
});

module.exports = router;