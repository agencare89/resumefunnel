var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', loggedIn, function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
    // if you're on the dashboard page, you need to be logged in
    
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