var express = require('express');
var router = express.Router();
var JobPosting = require('../models/jobPosting');
var Resume = require('../models/resume');

/* GET job posting. */
router.get('/', function(req, res, next) {
	JobPosting.findById(req.params.job_id, function(err, job) {
		res.render('job', { 
			user : req.user,
			ownsPost : true,
			job : job
		}, function(err, ejs) { 
			if (err) res.send(err);
		});
	});
});

router.get('/resumes', function(req, res, next) {
	Resume.find(function(err, resumes) {
		res.json({ resumes : resumes });
	});
});

module.exports = router;