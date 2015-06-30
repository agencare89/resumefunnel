$(document).ready(function() {
	$.ajax({
        url: "/job/" + window.location.href.substring(window.location.href.lastIndexOf("/")),
        type: "GET",
        dataType: "json",
        cache: true,
        success: function(data) {
            console.log(data);
        	$("#resumesTable").dataTable({
        		data: data,
                columns: [
                    { data: "resume", sTitle: "Resume", sClass: "center" },
                    { data: "confidence", sTitle: "Confidence", sClass: "center" }
                ]
            });

            $('#resumesTable tbody').on('click', 'tr', function() {
                window.location.href = "/resume/" + $('td', this).eq(0).text();
            });
		},
        error: function (jqXHR, textStatus, errorThrown) {
            $("#resumesTable").dataTable({
                columns: [
                    { data: "resume", sTitle: "Resume", sClass: "center" },
                    { data: "confidence", sTitle: "Confidence", sClass: "center" }
                ]
            });
        }
    });
});