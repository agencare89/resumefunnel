var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
    // if you're on the dashboard page, you need to be logged in
  	res.render('dashboard', { 
  		user : req.user,
  		dashboard : 'active'
  	}, function(err, ejs) { 
        if (err) res.send(err); 
        JobPosting.find(err, jobs) { 
            if(err) res.send(err);
            else { 
                var usersJobs = []; 
                for (var i = 0; i < jobs.length; i++) { 
                    if (jobs[i].employerId === req.user.email) { 
                        usersJobs.push(jobs[i]);
                    }
                }
                res.json(usersJobs); 
            }
        });
    });
    res.end();
});

module.exports = router;