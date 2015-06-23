$(document).ready(function() {
	$('#jobPostingsTable').dataTable();

	$('#jobPostingsTable tbody').on('click', 'tr', function() {
		window.location.href = "/job/" + $('td', this).eq(0).text();
	});
});