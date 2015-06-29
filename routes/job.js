var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting');
var Resume = require('../models/resume');

/* GET job posting. */
router.get('/', function(req, res, next) {
	res.render('job', { 
		user : req.user,
		ownsPost : true
	});
});

router.get('/.json', function(req, res, next) {
	JobPosting.findById(req.params.job_id, function(err, job) {
		if (err) res.send(err);
		
		res.json({ job : job });
	});
});

router.get('/resumes.json', function(req, res, next) {
	Resume.find(function(err, resumes) {
		if (err) res.send(err);
		
		res.json({ resumes : resumes });
	});
});

module.exports = router;