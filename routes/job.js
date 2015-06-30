var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting');
var Resume = require('../models/resume');

/* File uploading and processing */
var multer  = require('multer');
var done=false;
var pdfText = "";
var txtFile;

var postingText = "";
var skills = "";
var totalWeight; 
var jobObj;

//Create the AlchemyAPI object
var AlchemyAPI = require('../alchemyapi_node/alchemyapi');
var alchemyapi = new AlchemyAPI();

function postProcess(output){

	/* Extract the desired weights from the DB */
	var skillWeights = new Array();
	var jobTitleWeights = new Array();
	var companyWeights = new Array();
	var educationWeights = new Array();
	var degreeWeights = new Array();

	for(var t = 0; t < jobObj['employerOnly']['desiredSchools'].length; t++) {
		var obj = jobObj['employerOnly']['desiredSchools'][t];
		educationWeights[obj.key] = obj.value;
	}

	for(var t = 0; t < jobObj['employerOnly']['desiredCompanies'].length; t++) {
		var obj = jobObj['employerOnly']['desiredCompanies'][t];
		companyWeights[obj.key] = obj.value;
	}

	for(var t = 0; t < jobObj['employerOnly']['desiredJobs'].length; t++) {
		var obj = jobObj['employerOnly']['desiredJobs'][t];
		jobTitleWeights[obj.key] = obj.value;
	}

	for(var t = 0; t < jobObj['employerOnly']['desiredDegrees'].length; t++) {
		var obj = jobObj['employerOnly']['desiredDegrees'][t];
		degreeWeights[obj.key] = obj.value;
	}

	for(var t = 0; t < jobObj['employerOnly']['desiredSkills'].length; t++) {
		var obj = jobObj['employerOnly']['desiredSkills'][t];
		skillWeights[obj.key] = obj.value;
	}

	/* Confidence scores */
	var skillScore = 0.0;
	var jobTitleScore = 0.0;
	var companyScore = 0.0;
	var educationScore = 0.0;
	var degreeScore = 0.0;

	// Compute the weight against the desired qualifications
	skillScore = skillWeighting(skillWeights);
	jobTitleScore = jobTitleWeighting(jobTitleWeights, output);
	companyScore = companyWeighting(companyWeights, output);
	educationScore = educationWeighting(educationWeights, output);
	degreeScore = degreeWeighting(degreeWeights, output);

	// Compute an overall rating based on the 5 categories above
	totalWeight = skillScore*0.4 + jobTitleScore*0.2 + companyScore*0.2
		+ educationScore*0.1 + degreeScore*0.1;
	
	console.log(totalWeight);
}

function alchemyChain(){
	var output = {};
	//Start the analysis chain
	entities(output);
}

function entities(output) {
	alchemyapi.entities('text', pdfText,{ 'sentiment':1 }, function(response) {
		output['entities'] = { text:pdfText, response:JSON.stringify(response,null,4), results:response['entities'] };
		keywords(output);
	});
}

function keywords(output) {
	alchemyapi.keywords('text', pdfText, { 'sentiment':1 }, function(response) {
		output['keywords'] = { text:pdfText, response:JSON.stringify(response,null,4), results:response['keywords'] };
		postProcess(output);
	});
}

function skillWeighting(skillWeights){

	var score = 0.0;
	var lc_pdfText = pdfText.toLowerCase();

	for(var skill in skillWeights) {
		// check if the skill is a match within the parsed PDF
		if (lc_pdfText.indexOf(skill.toLowerCase()) != -1){
			// assign the associated weight since it's a match
			score += skillWeights[skill];
		}
	}

	return score;

}

function jobTitleWeighting(jobTitleWeights, output){

	var score = 0.0;
	var entityObj;

	// Retrieve the entity from Watson with a type classification of "JobTitle"	
	for (var i = 0; i < output['entities']['results'].length; i++){
		entityObj = output['entities']['results'][i];

		if(entityObj.type == "JobTitle"){
			// A job title was found, check if it exists in the employer's list
			for(var jobTitle in jobTitleWeights) {
				var titleFound = entityObj.text.toLowerCase();
				if (titleFound == jobTitle.toLowerCase()){
					// assign the associated weight since it's a match
					score += jobTitleWeights[jobTitle];
				}
			}
		}
	}

	return score;

}

function companyWeighting(companyWeights, output){

	/*
	To-Do:
	This method needs to be refined to ensure that the applicant 
	actually worked at this company as opposed to just mentioning it
	in his/her resume
	*/

	var score = 0.0;
	var entityObj;

	// Retrieve the entity from Watson with a type classification of "Company"	
	for (var i = 0; i < output['entities']['results'].length; i++){
		entityObj = output['entities']['results'][i];

		if(entityObj.type == "Company"){
			// A company was found, check if it exists in the employer's list
			for(var company in companyWeights) {
				var companyFound = entityObj.text.toLowerCase();
				if (companyFound == company.toLowerCase()){
					// assign the associated weight since it's a match
					score += companyWeights[company];
				}
			}
		}
	}

	return score;

}

function educationWeighting(educationWeights, output){

	var score = 0.0;
	var entityObj;

	// Retrieve the entity from Watson with a type classification of "Organization"	
	for (var i = 0; i < output['entities']['results'].length; i++){
		entityObj = output['entities']['results'][i];
		
		if(entityObj.type == "Organization" && entityObj.hasOwnProperty('disambiguated')){
			// Further disambiguate the org. to refine it's subtype using Watson
			var index = entityObj['disambiguated']['subType'].indexOf("University" || "CollegeUniversity");
		 	if (index != -1){
				// An educational institution was found, check if it exists in the employer's list
				for(var education in educationWeights) {
					var educationFound = entityObj.text.toLowerCase();
					if (educationFound == education.toLowerCase()){
						// assign the associated weight since it's a match
						score += educationWeights[education];
					}
				}
		 	}
		}
	}

	return score;

}

function degreeWeighting(degreeWeights, output){

	var score = 0.0;
	var entityObj;

	// Retrieve the entity from Watson with a type classification of "Degree"	
	for (var i = 0; i < output['entities']['results'].length; i++){
		entityObj = output['entities']['results'][i];

		if(entityObj.type == "Degree"){
			// A degree was found, check if it exists in the employer's list
			for(var degree in degreeWeights) {
				var degreeFound = entityObj.text.toLowerCase();
				if (degreeFound == degree.toLowerCase()){
					// assign the associated weight since it's a match
					score += degreeWeights[degree];
				}
			}
		}
	}

	return score;

}

/* GET job posting. */
router.get('/:job_id', function(req, res, next) {
	JobPosting.findById(req.params.job_id).populate('employer').exec(function(err, job) {
		if (err) res.send(err);
		else {
			jobObj = job;
			
			res.render('job', { 
				user : req.user,
				ownsPost : job.employer && req.user && job.employer.id == req.user._id,
				job : job
			});
		}
	});
});

router.get('/:job_id/.json', function(req, res, next) {
	JobPosting.findById(req.params.job_id).populate('employer').exec(function(err, job) {
		if (err) res.send(err);
		else res.json(job);
	});
});

router.post('/api/pdf/:job_id',
		[multer({ dest: './uploads/',
	    rename: function (fieldname, filename) {
	        return filename+Date.now();
	    },
	    onFileUploadStart: function (file) {
	    },
	    onFileUploadComplete: function (file) {
	    	var exec = require('child_process').exec;

	    	var fileName = file.name;
	    	txtFile = fileName.substring(0, fileName.length - 4);
	    	txtFile = txtFile + '.txt';
	    	txtFile = 'uploads/' + txtFile;

	        // for testing on a Windows machine, replace with backward slashes
	    	exec('ext_libs/pdftotext_mac -eol unix ' + file.path, function (error, stdout, stderr) {

	            var fs = require('fs');

	            fs.readFile(txtFile, {encoding: 'utf-8'}, function(err,data){
	                if (!err){
	                    pdfText = data;
	                    alchemyChain();
	                }else{
	                    console.log(err);
	                }

	            });

	    	});
	    }
	}),
	function(req, res){
        var newResume = new Resume();
        newResume.path = req.files.userPDF.originalname;
        newResume.matchPercent = totalWeight;
        newResume.save(function(err) { 
            if(err) throw err; 
            JobPosting.findById( req.params.job_id, function(err, data) { 
                data.resumes.push(newResume);
                
                var upsertData = data.toObject();
                delete upsertData._id;
                
                JobPosting.update({ jobTitle: jobTitle},  upsertData, {upsert:true}, function(err) { 
                    if(err) console.log(err); 
                });
            });
            res.redirect(req.get('referer'));
        });      
	}]);

module.exports = router;