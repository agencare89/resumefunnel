$( document ).ready(function() {
    $("form").validate({
		firstName : {
			group : "form > div:nth-child(1)",
			rules : [{
				type : "email",
				message : "Please enter your email"
			},
			{
				type : "empty",
				message : "Please enter your password"
			}]
		},
		lastName : {
			group : "form > div:nth-child(2)",
			rules : [{
				type : "empty",
				message : "Please enter your password"
			}]
		}
	});
});