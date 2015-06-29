//user.js
var mongoose = require('mongoose');

// define the schema for our user model
var jobPostingSchema = mongoose.Schema({
    jobTitle            : String, 
    jobDescription      : String,
    jobLocation         : String,
    companyName         : String,
    qualifications      : [], 
    requirements        : [],
    notes               : String, 
    dueDate             : String
    // still need matches and list of resumes 
});

// create the model for users and expose it to our app
module.exports = mongoose.model('JobPosting', jobPostingSchema);