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