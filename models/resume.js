//user.js
var mongoose = require('mongoose');

// define the schema for our user model
var resumeSchema = mongoose.Schema({
    text         : String,
    matchPercent : Number
    // relate it to a job posting
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('JobPosting', resumeSchema);