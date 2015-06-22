$(document).ready(function() {
	$("form").validate({
		firstName : {
			group : "form > div:nth-child(1) > div:nth-child(1) > div",
			rules : [{
				type : "empty",
				message : "Please enter a first name"
			}]
		},
		lastName : {
			group : "form > div:nth-child(1) > div:nth-child(2) > div",
			rules : [{
				type : "empty",
				message : "Please enter a last name"
			}]
		},
		email : {
			group : "form > div:nth-child(2)",
			rules : [{
				type : "email",
				message : "Please enter a valid email address"
			}]
		},
		password : {
			group : "form > div:nth-child(3) > div:nth-child(1) > div",
			rules : [{
				type : "empty",
				message : "Please enter a password"
			}]
		},
		rePassword : {
			group : "form > div:nth-child(3) > div:nth-child(2) > div",
			rules : [{
				type : "match",
				match : "form > div:nth-child(3) > div:nth-child(1) > div",
				message : "Your password does not match"
			},
			{
				type : "empty",
				message : "Please enter a password"
			}]
		},
		company : {
			group : "form > div:nth-child(4)",
			rules : [{
				type : "empty",
				message : "Please enter a company name"
			}]
		},
		location : {
			group : "form > div:nth-child(5)",
			rules : [{
				type : "empty",
				message : "Please enter a company location"
			}]
		}
	});
});

(function ($) {
	$.fn.validate = function(rules) {
		$.each(rules, function(i, value) {
			var group = $(value.group);
			var input = $(value.group + " input")
			input.after("<span class='form-control-feedback' aria-hidden='true'></span>");
			var status = $(value.group + " input + span");

			input.on("focusout", function() {
				$.each(value.rules, function(j, rule) {
					var flagged = false;

					switch (rule.type) {
						case "empty":
							flagged = input.val().length === 0;
							break;
						case "email":
							flagged = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.val())
							break;
						case "match":
							flagged = input.val() !== $(rule.match + " input").val();
							break;
						case "must":
							$.each(rule.must, function(k, character) {
								if (!input.val().contains(character)) {
									flagged = true;
									return false;
								}
							});

							break;
						case "banned":
							$.each(rule.must, function(k, character) {
								if (input.val().contains(character)) {
									flagged = true;
									return false;
								}
							});

							break;
						case "max":
							flagged = input.val().length > rule.max;
							break;
						case "min":
							flagged = input.val().length < rule.min;
							break;
						default:
							console.log("Invalid validation type");
					}

					if (flagged) {
						status.removeClass('glyphicon glyphicon-ok')
							  .addClass('glyphicon glyphicon-remove')
							  .css({ display: 'inline' });

						group.removeClass('has-success')
							 .addClass('has-error');
					} else {
						status.removeClass('glyphicon glyphicon-remove')
							  .addClass('glyphicon glyphicon-ok')
							  .css({ display: 'inline' });

						group.removeClass('has-error')
							 .addClass('has-success');
					}
				});
			});
		});

		return this;
	};
}(jQuery));