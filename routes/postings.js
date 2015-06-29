var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting.js');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('postings', { 
	    user : req.user,
	    postings : 'active'
    }); 
});

/* GET home page. */
router.get('/.json', function(req, res, next) {
    JobPosting.find(function(err, jobs) {
        if(err) res.send(err);

        /*User.findById(jobsfunction(err, user) {

        });*/

        console.log(req.user);

        res.json({ jobs : jobs, user : req.user });
    });
});

module.exports = router;