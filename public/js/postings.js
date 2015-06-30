$(document).ready(function() {
    $.fn.dataTable.moment('DD/MM/YYYY');
    
	$.ajax({
        url: "/postings/.json",
        type: "GET",
        dataType: "json",
        cache: true,
        success: function(data) {
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

            table.$("tr").css('cursor', 'pointer');

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

/* DataTables Date Sorting
---------------------------------------------------- */

$.fn.dataTable.moment = function ( format, locale ) {
    var types = $.fn.dataTable.ext.type;
 
    // Add type detection
    types.detect.unshift( function ( d ) {
        return moment( d, format, locale, true ).isValid() ?
            'moment-'+format :
            null;
    } );
 
    // Add sorting method - use an integer for the sorting
    types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
        return moment( d, format, locale, true ).unix();
    };
};