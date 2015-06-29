$(document).ready(function() {
	$('.addQualification').click(function() {
		$('.qualifications').last().after("<div class=\"form-group qualifications\">\
											<input type=\"text\" class=\"form-control\" class=\"qualificationInput\" placeholder=\"Qualification\" name=\"qualifications\" />\ </div>");
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
						<input type=\"text\" class=\"form-control skillInput\" placeholder=\"Skill\" />\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"skillsSlider\" value=\"\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" />\
					</div>\
				</div>\
			</div>");

		$('.skillsSlider').slider();
	});

	$('.addDegree').click(function() {
		$('.degreeRow').last().after("<div class=\"row degreeRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control degreeInput\" placeholder=\"Degree\" />\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"degreeSlider\" value=\"\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" />\
					</div>\
				</div>\
			</div>");

		$('.degreeSlider').slider();
	});

	$('.addInstitute').click(function() {
		$('.instituteRow').last().after("<div class=\"row instituteRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control instituteInput\" placeholder=\"Institute\" />\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"instituteSlider\" value=\"\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" />\
					</div>\
				</div>\
			</div>");

		$('.instituteSlider').slider();
	});

	$('.addJob').click(function() {
		$('.jobRow').last().after("<div class=\"row jobRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control jobInput\" placeholder=\"Job\" />\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"jobSlider\" value=\"\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" />\
					</div>\
				</div>\
			</div>");

		$('.jobSlider').slider();
	});

	$('.addCompany').click(function() {
		$('.companyRow').last().after("<div class=\"row companyRow\">\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"form-control companyInput\" placeholder=\"Company\" />\
					</div>\
				</div>\
				<div class=\"col-md-6\">\
					<div class=\"form-group\">\
						<input type=\"text\" class=\"companySlider\" value=\"\" data-slider-min=\"0\" data-slider-max=\"10\" data-slider-step=\"1\" data-slider-value=\"5\" />\
					</div>\
				</div>\
			</div>");

		$('.companySlider').slider();
	});
});