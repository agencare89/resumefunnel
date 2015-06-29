$(document).ready(function() {
	$.ajax({
        url: "/postings",
        type: "GET",
        dataType: "json",
        cache: true,
        success: function(data) {
        	$("#jobPostingsTable").dataTable({
        		data: data,
                columns: [
                    { data: "jobTitle", sTitle: "Job Title", sClass: "center" },
                    { data: "companyName", sTitle: "Company", sClass: "center" },
                    { data: "joblocation", sTitle: "Location", sClass: "center" },
                    { data: "dueDate", sTitle: "Deadline", sClass: "center" }
                ]
            });

            $('#jobPostingsTable tbody').on('click', 'tr', function() {
                window.location.href = "/job/" + $('td', this).eq(0).text();
            });
		},
        error: function (jqXHR, textStatus, errorThrown) {
            // Probably a better way to do this but w/e
            $("#jobPostingsTable").dataTable({
                columns: [
                    { data: "jobTitle", sTitle: "Job Title", sClass: "center" },
                    { data: "companyName", sTitle: "Company", sClass: "center" },
                    { data: "jobLocation", sTitle: "Location", sClass: "center" },
                    { data: "dueDate", sTitle: "Deadline", sClass: "center" }
                ]
            });
        }
    });
});