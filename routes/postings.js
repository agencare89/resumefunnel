var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('postings', { 
  		user : req.user,
  		postings : 'active'
  	 }, function(err, ejs) { 
        if (err) res.send(err); 
        JobPosting.find(err, jobs) { 
            if(err) res.send(err);
            res.json(jobs); 
        });
    });
});

module.exports = router;