$(document).ready(function() {
	$(".year").text(new Date().getFullYear());
});

/* Form Validation
---------------------------------------------------- */
(function ($) {
	$.fn.validate = function(rules) {
		$.each(rules, function(i, value) {
			debugger;
			var group = $(value.group);
			var input = $(value.group + " input");
			var inputGroup = $(value.group + " .input-group");
			var status = null;

			if (inputGroup) {
				inputGroup.after("<span class='form-control-feedback' aria-hidden='true'></span>");
				status = $(value.group + " .input-group + span");
			} else {
				input.after("<span class='form-control-feedback' aria-hidden='true'></span>");
				status = $(value.group + " input + span");
			}

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
						case "phone":
							flagged = !/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i.test(input.val());
						default:
							console.log("Invalid validation type");
					}

					group.addClass('has-feedback');

					if (flagged) {
						status.removeClass('glyphicon glyphicon-ok')
							  .addClass('glyphicon glyphicon-remove')
							  .css({ display: 'inline' });

						group.removeClass('has-success')
							 .addClass('has-error');
							 
						return false;
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