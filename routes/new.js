var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting.js');

/* GET home page. */
router.get('/', loggedIn, function(req, res, next) {
	// TODO: Replace hard-coded user with logged in user information from Passport.io (null if not logged in)
  	res.render('new', { 
  		user : req.user,
  		newPost : 'active'
  	});
});

router.post('/', function(req, res, next) { 
    console.log(req);
    var newJob = new JobPosting();
    newJob.jobTitle = req.body.jobTitle; 
    newJob.jobDescription = req.body.jobDescription;
    newJob.jobLocation = req.body.jobLocation;

    if(req.body.qualificationString) var quals = req.body.qualificationString; 
    for (var i = 0; i < quals.length; i++) { 
        if (quals[i] !== "") { 
            newJob.qualifications.push(quals[i]);
        }
    }
    
    if(req.body.requirements) var requirements = req.body.requirements;    
    for (var k = 0; k < requirements.length; k++) { 
        if(requirements[k] !== "") 
            newJob.requirements.push(requirements[k]);
    } 
    
    newJob.dueDate = req.body.dueDate; 
    newJob.notes = req.body.notes;
    newJob.employerId = req.user.email;
    
    /*  The employer only information requires 5 arrays to be stored. These arrays will define the unique 
        qualities that an employer is looking for. This information will be stored in the mongoDB database
        so that Watson will be able to use it and score resumes accordingly                             */ 
    if(req.body.desiredSkillsKeys) var desiredSkills = req.body.desiredSkillsKeys; 
    for(var a = 0; a < desiredSkills.length; a++) { 
        if(desiredSkills[a] !== "") { 
            newJob.employerOnly.desiredSkills.key.push(desiredSkills[a]); 
            newJob.employerOnly.desiredSkills.value.push(req.body.desiredSkillsValues[a]);
        }
    }
    
    if(req.body.desiredJobsKeys) var desiredJobs = req.body.desiredJobsKeys;
    for (var b = 0; b < desiredJobs.length; b++) { 
        if (desiredJobs[b] !== "") { 
            newJob.employerOnly.desiredJobs.key.push(desiredJobs[b]);
            newJob.employerOnly.desiredJobs.value.push(req.body.desiredJobsValues[b]);
        }
    }
    
    if(req.body.desiredCompaniesKeys) var desiredCompanies = req.body.desiredCompaniesKeys; 
    for (var c = 0; c < desiredCompanies.length; c++) { 
        if (desiredCompanies[c].trim() !== "") { 
            newJob.employerOnly.desiredCompanies.key.push(desiredCompanies[c]);
            newJob.employerOnly.desiredCompanies.value.push(req.body.desiredCompaniesValues[c]);
        }
    }
    
    if(req.body.desiredSchoolsKeys) var desiredSchools = req.body.desiredSchoolsKeys; 
    for (var d = 0; d < desiredSchools.length; d++) { 
        if (desiredSchools[d] !== "") { 
            newJob.employerOnly.desiredSchools.key.push(desiredSchools[d]);
            newJob.employerOnly.desiredSchools.value.push(req.body.desiredSchoolsValues[d]);
        }
    }
    
    if(req.body.desiredDegreesKeys) var desiredDegrees = req.body.desiredDegreesKeys;
    for (var e = 0; e < desiredDegrees.length; e++) { 
        if (desiredDegrees[e] !== "") { 
            newJob.employerOnly.desiredDegrees.key.push(desiredDegrees[e]);
            newJob.employerOnly.desiredDegrees.value.push(req.body.desiredDegreesValues[e]);
        }
    }
    
    // save the job
    newJob.save(function(err) {
        if (err) throw err;
        res.send();
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