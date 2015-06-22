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