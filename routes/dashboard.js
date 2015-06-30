var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting');

/* GET dashboard page. */
router.get('/', loggedIn, function(req, res, next) {
    JobPosting.find({}).populate('employer').exec(function(err, jobs) {
        if (err) res.send(err); 
        else {
            var filteredJobs = [];

            for (var i = 0; i < jobs.length; i++) {
                if (jobs[i].employer.id == req.user._id) {
                    filteredJobs.push(jobs[i]);
                }
            }

            res.render('dashboard', { 
                user : req.user, 
                dashboard : 'active', 
                jobs : filteredJobs
            });
        }
    });
});

router.get('/.json', loggedIn, function(req, res, next) {
    JobPosting.find({}).populate('employer').exec(function(err, jobs) {
        if (err) res.send(err); 
        else { 
            var filteredJobs = [];

            for (var i = 0; i < jobs.length; i++) {
                if (jobs[i].employer.id == req.user._id) {
                    filteredJobs.push(jobs[i]);
                }
            }
            
            res.send(filteredJobs);
        }
    }); 
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;