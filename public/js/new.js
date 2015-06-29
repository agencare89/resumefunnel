$(document).ready(function() {
	$('.addQualification').click(function() {
		$('.qualifications').last().after("<div class=\"form-group qualifications\">\
											<input type=\"text\" class=\"form-control\" class=\"qualificationInput\" placeholder=\"Qualification\" name=\"qualificationString\" />\ </div>");
	});

	$('.addRequirement').click(function() {
		$('.requirements').last().after("<div class=\"form-group requirements\">\
										  <input type=\"text\" class=\"form-control\" class=\"requirementInput\" placeholder=\"Requirement\" name=\"requirements\" />\ </div>");
	});

	$('#dueDatePicker').datetimepicker({
		format : 'DD/MM/YYYY'
	});

	$('.skillsSlider').slider();
	$('.degreeSlider').slider();
	$('.instituteSlider').slider();
	$('.jobSlider').slider();
	$('.companySlider').slider();

	$('.addSkill').click(function() {
		$('.skillsRow').last().after("<div class=\"row skillsRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control skillInput\" placeholder=\"Skill\" name=\"desiredSkillsKeys\"/>\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"skillsSlider\" value=\"5\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" name=\"desiredSkillsValues\"/>\
					</div>\
				</div>\
			</div>");

		$('.skillsSlider').slider();
	});

	$('.addDegree').click(function() {
		$('.degreeRow').last().after("<div class=\"row degreeRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control degreeInput\" placeholder=\"Degree\" name=\"desiredDegreesKeys\"/>\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"degreeSlider\" value=\"5\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" name=\"desiredDegreesValues\"/>\
					</div>\
				</div>\
			</div>");

		$('.degreeSlider').slider();
	});

	$('.addInstitute').click(function() {
		$('.instituteRow').last().after("<div class=\"row instituteRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control instituteInput\" placeholder=\"Institute\" name=\"desiredSchoolsKeys\"/>\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"instituteSlider\" value=\"5\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" name=\"desiredSchoolsValues\"/>\
					</div>\
				</div>\
			</div>");

		$('.instituteSlider').slider();
	});

	$('.addJob').click(function() {
		$('.jobRow').last().after("<div class=\"row jobRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control jobInput\" placeholder=\"Job\" name=\"employerOnly.desiredJobs.keys\"/>\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"jobSlider\" value=\"5\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" name=\"employerOnly.desiredJobs.values\"/>\
					</div>\
				</div>\
			</div>");

		$('.jobSlider').slider();
	});

	$('.addCompany').click(function() {
		$('.companyRow').last().after("<div class=\"row companyRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control companyInput\" placeholder=\"Company\" name=\"desiredCompaniesKeys\"/>\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"companySlider\" value=\"5\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" name=\"desiredCompaniesValues\"/>\
					</div>\
				</div>\
			</div>");

		$('.companySlider').slider();
	});
});