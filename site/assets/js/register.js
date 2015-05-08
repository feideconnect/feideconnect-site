	"use strict";


var loadOrgs = function() {

	var url = "http://connect-register.andreas.uninettlabs.no/orgs";
	var urlCount = "http://connect-register.andreas.uninettlabs.no/count";
	
	$.getJSON(url, function(orgs) {

		var str = '<div>';
		for(var i = 0; i < orgs.length; i++) {
			str += ' <span class="label label-success">' + orgs[i] + '</span>';
		}
		str += '</div>';

		$("#orgOutput").empty().append(str);

	});

	$.getJSON(urlCount, function(c) {
		$("#userCounter").empty().append(c);
	});

}



$(document).ready(function() {

	// console.log("Ready");

	loadOrgs();

	$("#registerPilot").on("click", ".actSmt", function(e) {
		e.preventDefault();

		var el = $("#registerPilot");

		var data = {
			"Email": el.find("#inputEmail").val(),
			"FirstName": el.find("#inputFornavn").val(),
			"LastName": el.find("#inputEtternavn").val(),
			"Org": el.find("#inputOrg").val(),
		};

		var url = "http://connect-register.andreas.uninettlabs.no/register";

		var success = function() {

			$("#registerPilot").hide();
			$("#registerPilotDone").show();

			loadOrgs();

		};

		$.ajax({
			type: "POST",
			url: url,
			data: JSON.stringify(data),
			success: success,
			contentType: "application/json",
			dataType: 'json'
		});



		// console.error("Registering", data);

	});	




});

