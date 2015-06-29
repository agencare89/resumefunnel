var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    JobPosting.find(function(err, jobs){ 
        if(err) res.send(err);

        res.render('postings', { 
  		    user : req.user,
  		    postings : 'active', 
            data : jobs
        }); 
    });
    
});

module.exports = router;