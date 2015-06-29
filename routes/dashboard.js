var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting');

/* GET dashboard page. */
router.get('/', loggedIn, function(req, res, next) {
    JobPosting.find(function(err, jobs) { 
        if (err) res.send(err); 
        else { 
            var usersJobs = []; 
            for (var i = 0; i < jobs.length; i++) { 
                if (jobs[i].employerId === req.user.email) { 
                    usersJobs.push(jobs[i]);
                }
            }
            
            res.render('dashboard', { 
                user : req.user, 
                dashboard : 'active', 
                data : usersJobs
            });
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