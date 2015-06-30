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
        newJob.employerOnly.desiredSkills = [];
        if (!Array.isArray(req.body.desiredSkillsKeys)) { 
            newJob.employerOnly.desiredSkills.push({key: req.body.desiredSkillsKeys, value: req.body.desiredSkillsValues}); 
        }
        else {  
            var length = req.body.desiredSkillsKeys.length; 
            for(var a = 0; a < length; a++) { 
                if(req.body.desiredSkillsKeys[a] !== "") { 
                    newJob.employerOnly.desiredSkills.push({ key: req.body.desiredSkillsKeys[a], value: req.body.desiredSkillsValues[a]}); 
                }
            }
        }
    } 
    
    if(req.body.desiredJobsKeys) { 
        newJob.employerOnly.desiredJobs = []; 
        if (!Array.isArray(req.body.desiredJobsKeys)) { 
            newJob.employerOnly.desiredJobs.push({key: req.body.desiredJobsKeys, value: req.body.desiredJobsValues}); 
        }
        else { 
            var length = req.body.desiredJobsKeys.length;
            for (var b = 0; b < length; b++) { 
                if (req.body.desiredJobsKeys[b] !== "") { 
                    newJob.employerOnly.desiredJobs.push({ key: req.body.desiredJobsKeys[b], value: req.body.desiredJobsValues[b]});
                }
            }
        }
    }
 
    if(req.body.desiredCompaniesKeys) { 
        newJob.employerOnly.desiredCompanies = []; 
        if (!Array.isArray(req.body.desiredCompaniesKeys)) { 
            newJob.employerOnly.desiredCompanies.push({key: req.body.desiredCompaniesKeys, value: req.body.desiredCompaniesValues}); 
        }
        else {          
            var length = req.body.desiredCompaniesKeys.length; 
            for (var c = 0; c < length; c++) { 
                if (req.body.desiredCompaniesKeys[c] !== "") { 
                    newJob.employerOnly.desiredCompanies.push({key: req.body.desiredCompaniesKeys[c], value: req.body.desiredCompaniesValues[c]});
                }
            }
        }
    }
    
    if(req.body.desiredSchoolsKeys) { 
        newJob.employerOnly.desiredSchools = []; 
        if (!Array.isArray(req.body.desiredSchoolsKeys)) { 
            newJob.employerOnly.desiredSchools.push({key: req.body.desiredSchoolsKeys, value: req.body.desiredSchoolsValues});
        }
        else { 
            var desiredSchools = req.body.desiredSchoolsKeys.length; 
            for (var d = 0; d < length; d++) { 
                if (req.body.desiredSchoolsKeys[d] !== "") { 
                    newJob.employerOnly.desiredSchools.push({key: req.body.desiredSchoolsKeys[d], value: req.body.desiredSchoolsValues[d]});
                }
            }
        }
    }

    if(req.body.desiredDegreesKeys) { 
        newJob.employerOnly.desiredDegrees.key = [];
        if (!Array.isArray(req.body.desiredDegreesKeys)) { 
            newJob.employerOnly.desiredDegrees.push({key: req.body.desiredDegreesKeys, value: req.body.desiredDegreesValues});
        }
        else { 
            var length = req.body.desiredDegreesKeys.length;
            for (var e = 0; e < length; e++) { 
                if (req.body.desiredDegreesKeys[e] !== "") { 
                    newJob.employerOnly.desiredDegrees.push({key: req.body.desiredDegreesKeys[e], value: req.body.desiredDegreesValues[e]});
                }
            }
        }
    }
    
    // save the job
    newJob.save(function(err, job) {
        if (err) throw err;
        
        res.redirect('/job/' + job._id);
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