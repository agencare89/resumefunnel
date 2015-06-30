//user.js
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Resume = require('../models/resume.js');

// define the schema for our user model
var jobPostingSchema = mongoose.Schema({
    jobTitle            : String, 
    jobDescription      : String,
    jobLocation         : String,
    qualifications      : [],
    requirements        : [],
    notes               : String, 
    dueDate             : String,
    employer            : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    resumes             : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Resume' }],
    employerOnly        : { 
            desiredSkills   : [{ 
                key     : String,
                value   : Number
            }],
            desiredDegrees  : [{ 
                key     : String,
                value   : Number 
            }],
            desiredSchools  : [{ 
                key     : String,
                value   : Number 
            }], 
            desiredJobs     : [{ 
                key     : String,
                value   : Number 
            }],
            desiredCompanies: [{ 
                key     : String,
                value   : Number 
            }],
            matches         : [],
            applications    : []
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('JobPosting', jobPostingSchema);