$(document).ready(function() {
    $("#jobPostingsTable tr").css('cursor', 'pointer');
    
	$.ajax({
        url: "/postings/.json",
        type: "GET",
        dataType: "json",
        cache: true,
        success: function(data) {
            console.log(JSON.stringify(data), null, 2);

        	var table = $("#jobPostingsTable").dataTable({
        		data: data,
                order: [[ 4, "asc" ], [ 1, "asc" ]],
                columns: [
                    { data: "_id", visible: false },
                    { data: "jobTitle", sTitle: "Job Title", sClass: "center" },
                    { data: "employer.companyName", sTitle: "Company", sClass: "center" },
                    { data: "jobLocation", sTitle: "Location", sClass: "center" },
                    { data: "dueDate", sTitle: "Deadline", sClass: "center" }
                ]
            });

            table.$('tr').click(function () {
                var data = table.fnGetData(this);
                window.location.href = "/job/" + data._id;
            });
		},
        error: function (jqXHR, textStatus, errorThrown) {
            $("#jobPostingsTable").dataTable({
                columns: [
                    { data: "_id", visible: false },
                    { data: "jobTitle", sTitle: "Job Title", sClass: "center" },
                    { data: "employer.companyName", sTitle: "Company", sClass: "center" },
                    { data: "jobLocation", sTitle: "Location", sClass: "center" },
                    { data: "dueDate", sTitle: "Deadline", sClass: "center" }
                ]
            });
        }
    });
});