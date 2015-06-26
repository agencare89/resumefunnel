$(document).ready(function() {
	$("form").validate({
		firstName : {
			group : ".firstNameGroup",
			rules : [{
				type : "empty",
				message : "Please enter a first name"
			}]
		},
		lastName : {
			group : ".lastNameGroup",
			rules : [{
				type : "empty",
				message : "Please enter a last name"
			}]
		},
		phone : {
			group : ".phoneGroup",
			rules : [{
				type : "phone",
				message : "Please enter a valid phone number"
			},
			{
				type : "empty",
				message : "Please enter a phone number"
			}]
		},
		email : {
			group : ".emailGroup",
			rules : [{
				type : "email",
				message : "Please enter a valid email address"
			},
			{
				type : "empty",
				message : "Please enter your email address"
			}]
		},
		password : {
			group : ".passwordGroup",
			rules : [{
				type : "empty",
				message : "Please enter a password"
			}]
		},
		rePassword : {
			group : ".rePasswordGroup",
			rules : [{
				type : "match",
				match : ".passwordGroup",
				message : "Your password does not match"
			},
			{
				type : "empty",
				message : "Please enter a password"
			}]
		},
		companyName : {
			group : ".companyNameGroup",
			rules : [{
				type : "empty",
				message : "Please enter a company name"
			}]
		},
		companyLocation : {
			group : ".companyLocationGroup",
			rules : [{
				type : "empty",
				message : "Please enter a company location"
			}]
		},
		companyWebsite : {
			group : ".companyWebsiteGroup",
			rules : [{
				type : "empty",
				message : "Please enter a company website"
			}]
		}
	});
});