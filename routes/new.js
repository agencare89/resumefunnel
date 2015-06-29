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

    var quals = req.body.qualificationString; 
    for (var i = 0; i < quals.length; i++) { 
        if (quals[i].trim() !== "") { 
            newJob.qualificationString.push(quals[i]);
        }
    }
    var qualKeys = req.body.employerOnly.qualificationVal;
    for (var j = 0; j < qualKeys.length; j++) { 
        // check the string array, if its empty then dont push a value into the parallel array for it
        if (quals[j].trim() !== "") { 
            newJob.employerOnly.qualificationVal.push(qualKeys[j]); 
        }
    }
    
    var requirements = req.body.requirements;    
    for (var k = 0; k < requirements.length; k++) { 
        if(requirements[k].trim() !== "") 
            newJob.requirements.push(requirements[k]);
    } 
    
    newJob.dueDate = req.body.dueDate; 
    newJob.notes = req.body.notes;
    newJob.employerId = req.user.email;
    
    /*  The employer only information requires 5 arrays to be stored. These arrays will define the unique 
        qualities that an employer is looking for. This information will be stored in the mongoDB database
        so that Watson will be able to use it and score resumes accordingly                             */ 
    
    var desiredJobs = req.body.employerOnly.desiredJobs;
    for (var a = 0; a < desiredJobs.length; a++) { 
        if (desiredJobs[a].trim() !== "") { 
            newJob.employerOnly.desiredJobs.key.push(desiredJobs[a]);
        }
    }
    
    var desiredCompanies = req.body.employerOnly.desiredCompanies; 
    for (var b = 0; b < desiredCompanies.length; b++) { 
        if (desiredCompanies[b].trim() !== "") { 
            newJob.employerOnly.desiredCompanies.key.push(desiredCompanies[b]);   
        }
    }
    
    var desiredSchools = req.body.employerOnly.desiredSchools; 
    for (var c = 0; c < desiredSchools.length; c++) { 
        if (desiredSchools[c].trim() !== "") { 
            newJob.employerOnly.desiredSchools.key.push(desiredSchools[c]);
        }
    }
    
    var desiredDegrees = req.body.employerOnly.desiredDegrees;
    for (var d = 0; d < desiredDegrees.length; d++) { 
        if (desiredDegrees[d].trim() !== "") { 
            newJob.employerOnly.desiredDegrees.key.push(desiredDegrees[d]);
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