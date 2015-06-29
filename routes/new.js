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

router.post('/', loggedIn, function(req, res, next) { 
    var newJob = new JobPosting();
    newJob.jobTitle = req.body.jobTitle; 
    newJob.jobDescription = req.body.jobDescription;
    newJob.jobLocation = req.body.jobLocation;
    
    if(req.body.qualificationString) { 
        if (!Array.isArray(req.body.qualificationString)) { 
           newJob.qualifications = req.body.qualificationString;
        }
        else { 
            var length = req.body.qualificationString.length;
            newJob.qualifications = [];
            for (var i = 0; i < length; i++) { 
                if (req.body.qualificationString[i] !== "") { 
                    newJob.qualifications.push(req.body.qualificationString[i]);
                }
            }
        }
        
    }
    
    if(req.body.requirements) { 
        if (!Array.isArray(req.body.requirements)) { 
            newJob.requirements = req.body.requirements;
        }
        else { 
            newJob.requirements = []; 
            var length = req.body.requirements.length;    
            for (var k = 0; k < length; k++) { 
                if(req.body.requirements[k] !== "") 
                    newJob.requirements.push(req.body.requirements[k]);
            } 
        }
    }

    newJob.dueDate = req.body.dueDate; 
    newJob.notes = req.body.notes;
    newJob.employer = req.user._id;
    
    /*  The employer only information requires 5 arrays to be stored. These arrays will define the unique 
        qualities that an employer is looking for. This information will be stored in the mongoDB database
        so that Watson will be able to use it and score resumes accordingly   */ 

    if(req.body.desiredSkillsKeys) { 
        if (!Array.isArray(req.body.desiredSkillsKeys)) { 
            newJob.employerOnly.desiredSkills.key = req.body.desiredSkillsKeys; 
            newJob.employerOnly.desiredSkills.value = req.body.desiredSkillsValues;
        }
        else {  
            var length = req.body.desiredSkillsKeys.length; 
            newJob.employerOnly.desiredSkills.key = [];
            newJob.employerOnly.desiredSkills.value = [];
            for(var a = 0; a < length; a++) { 
                if(req.body.desiredSkillsKeys[a] !== "") { 
                    newJob.employerOnly.desiredSkills.key.push(req.body.desiredSkillsKeys[a]); 
                    newJob.employerOnly.desiredSkills.value.push(req.body.desiredSkillsValues[a]);
                }
            }
        }
    } 
    
    if(req.body.desiredJobsKeys) { 
        if (!Array.isArray(req.body.desiredJobsKeys)) { 
            newJob.employerOnly.desiredJobs.key = req.body.desiredJobsKeys; 
            newJob.employerOnly.desiredJobs.value = req.body.desiredJobsValues;
        }
        else { 
            var length = req.body.desiredJobsKeys.length;
            newJob.employerOnly.desiredJobs.key = []; 
            newJob.employerOnly.desiredJobs.value = []; 
            for (var b = 0; b < length; b++) { 
                if (req.body.desiredJobsKeys[b] !== "") { 
                    newJob.employerOnly.desiredJobs.key.push(req.body.desiredJobsKeys[b]);
                    newJob.employerOnly.desiredJobs.value.push(req.body.desiredJobsValues[b]);
                }
            }
        }
    }
 
    if(req.body.desiredCompaniesKeys) { 
        if (!Array.isArray(req.body.desiredCompaniesKeys)) { 
            newJob.employerOnly.desiredCompanies.key = req.body.desiredCompaniesKeys; 
            newJob.employerOnly.desiredCompanies.value = req.body.desiredCompaniesValues;
        }
        else {          
            var length = req.body.desiredCompaniesKeys.length; 
            newJob.employerOnly.desiredCompanies.key = []; 
            newJob.employerOnly.desiredCompanies.value = [];
            for (var c = 0; c < length; c++) { 
                if (req.body.desiredCompaniesKeys[c] !== "") { 
                    newJob.employerOnly.desiredCompanies.key.push(req.body.desiredCompaniesKeys[c]);
                    newJob.employerOnly.desiredCompanies.value.push(req.body.desiredCompaniesValues[c]);
                }
            }
        }
    }
    
    if(req.body.desiredSchoolsKeys) { 
        if (!Array.isArray(req.body.desiredSchoolsKeys)) { 
            newJob.employerOnly.desiredSchools.key = req.body.desiredSchoolsKeys;
            newJob.employerOnly.desiredSchools.value = req.body.desiredSchoolsValues;
        }
        else { 
            var desiredSchools = req.body.desiredSchoolsKeys.length; 
            newJob.employerOnly.desiredSchools.key = []; 
            newJob.employerOnly.desiredSchools.value = [];
            for (var d = 0; d < length; d++) { 
                if (req.body.desiredSchoolsKeys[d] !== "") { 
                    newJob.employerOnly.desiredSchools.key.push(req.body.desiredSchoolsKeys[d]);
                    newJob.employerOnly.desiredSchools.value.push(req.body.desiredSchoolsValues[d]);
                }
            }
        }
    }

    if(req.body.desiredDegreesKeys) { 
        if (!Array.isArray(req.body.desiredDegreesKeys)) { 
            newJob.employerOnly.desiredDegrees.key = req.body.desiredDegreesKeys;
            newJob.employerOnly.desiredDegrees.value = req.body.desiredDegreesValues;
        }
        else { 
            var length = req.body.desiredDegreesKeys.length;
            newJob.employerOnly.desiredDegrees.key = [];
            newJob.employerOnly.desiredDegrees.value = []; 
            for (var e = 0; e < length; e++) { 
                if (req.body.desiredDegreesKeys[e] !== "") { 
                    newJob.employerOnly.desiredDegrees.key.push(req.body.desiredDegreesKeys[e]);
                    newJob.employerOnly.desiredDegrees.value.push(req.body.desiredDegreesValues[e]);
                }
            }
        }
    }
    
    // save the job
    newJob.save(function(err) {
        if (err) throw err;
        
        res.redirect('dashboard', { 
  		    user : req.user,
  		    newPost : 'active'
  	    });
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