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
});