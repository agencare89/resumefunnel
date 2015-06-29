//user.js
var mongoose = require('mongoose');

// define the schema for our user model
var jobPostingSchema = mongoose.Schema({
    jobTitle            : String, 
    jobDescription      : String,
    jobLocation         : String,
    qualificationString : [],
    requirements        : [],
    notes               : String, 
    dueDate             : String,
    employerId          : String,
    employerOnly        : { 
            qualificationVal: [],
            desiredDegrees  : { 
                key     : [],
                value   : [] 
            },
            desiredSchools  : { 
                key     : [],
                value   : [] 
            }, 
            desiredJobs     : { 
                key     : [],
                value   : [] 
            },
            desiredCompanies: { 
                key     : [],
                value   : [] 
            },
            matches         : [],
            applications    : []
    }
    // still need matches and list of resumes 
});

// create the model for users and expose it to our app
module.exports = mongoose.model('JobPosting', jobPostingSchema);