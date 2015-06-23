$(document).ready(function() {
	$('.addQualification').click(function() {
		$('.qualifications').last().after("<div class=\"form-group qualifications\">\
											<input type=\"text\" class=\"form-control\" class=\"qualificationInput\" placeholder=\"Qualification\" />\
										   </div>");
	});

	$('.addRequirement').click(function() {
		$('.requirements').last().after("<div class=\"form-group requirements\">\
										  <input type=\"text\" class=\"form-control\" class=\"requirementInput\" placeholder=\"Requirement\" />\
										 </div>");
	});
});