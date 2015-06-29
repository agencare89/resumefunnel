var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
  	res.render('new', { 
  		user : req.user,
  		newPost : 'active'
  	});
});

router.post('/', function(req, res, next) { 
    var newJob = new JobPosting();
    newJob.jobTitle = req.body.jobTitle; 
    newJob.jobDescription = req.body.jobDescription;

    var qualifications = req.body.qualifications;
    newJob.qualifications = [];
    
    for (var i = 0; i < qualifications.length; i++) { 
        if(qualifications[i].trim() !== "")
            newJob.qualifications.push(qualifications[i]);
    }
    
    var requirements = req.body.requirements;
    newJob.requirements = [];
    
    for (var j = 0; j < requirements.length; j++) { 
        if(requirements[j].trim() !== "") 
            newJob.requirements.push(requirements[j]);
    }
    
    newJob.dueDate = req.body.dueDate; 
    newJob.notes = req.body.notes;
    
    // save the job
    newJob.save(function(err) {
        if (err) throw err;
        res.send();
    });
});

module.exports = router;