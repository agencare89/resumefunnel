$(document).ready(function() {
	$(".year").text(new Date().getFullYear());
	$('#jobPostingsTable').dataTable();
});