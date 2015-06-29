$(document).ready(function() {
    $("#jobPostingsTable tr").css('cursor', 'pointer');
    
	$.ajax({
        url: "/postings/.json",
        type: "GET",
        dataType: "json",
        cache: true,
        success: function(data) {
        	$("#jobPostingsTable").dataTable({
        		data: data,
                columns: [
                    { data: "jobs.jobTitle", sTitle: "Job Title", sClass: "center" },
                    { data: "user.companyName", sTitle: "Company", sClass: "center" },
                    { data: "jobs.jobLocation", sTitle: "Location", sClass: "center" },
                    { data: "jobs.dueDate", sTitle: "Deadline", sClass: "center" }
                ]
            });

            $('#jobPostingsTable tbody').on('click', 'tr', function() {
                window.location.href = "/job/" + $('td', this).eq(0).text();
            });
		},
        error: function (jqXHR, textStatus, errorThrown) {
            $("#jobPostingsTable").dataTable({
                columns: [
                    { data: "jobs.jobTitle", sTitle: "Job Title", sClass: "center" },
                    { data: "user.companyName", sTitle: "Company", sClass: "center" },
                    { data: "jobs.jobLocation", sTitle: "Location", sClass: "center" },
                    { data: "jobs.dueDate", sTitle: "Deadline", sClass: "center" }
                ]
            });
        }
    });
});