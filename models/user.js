//user.js
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    firstName       : String, 
    lastName        : String,
    phoneNumber     : String,
    email           : String,
    password        : String, 
    companyName     : String,
    companyWebsite  : String,
    companyLogo     : String,
    jobPostings     : { type : mongoose.Schema.Types.ObjectId, ref : 'JobPosting' }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);