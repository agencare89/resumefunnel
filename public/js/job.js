$(document).ready(function() {
	$.ajax({
        url: "/job/" + window.location.href.substring(window.location.href.lastIndexOf("/")) + "/.json",
        type: "GET",
        dataType: "json",
        cache: true,
        success: function(data) {
            console.log(data);

        	var table = $("#resumesTable").dataTable({
        		data: data,
                order: [[ 2, "asc" ], [ 1, "asc" ]],
                columns: [
                    { data: "_id", visible: false },
                    { data: "path", sTitle: "Resume" },
                    { data: "matchPercentage", sTitle: "Confidence" }
                ]
            });

            table.$("tr").css('cursor', 'pointer');

            table.$('tr').click(function () {
                var data = table.fnGetData(this);
                window.location.href = data.path;
            });
		},
        error: function (jqXHR, textStatus, errorThrown) {
            $("#resumesTable").dataTable({
                columns: [
                    { data: "_id", visible: false },
                    { data: "path", sTitle: "Resume" },
                    { data: "matchPercentage", sTitle: "Confidence" }
                ]
            });
        }
    });
});