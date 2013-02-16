function GetQueryStringParams(sParam) {  
	var sPageURL = window.location.search.substring(1);  
	alert(sPageURL);
	var sURLVariables = sPageURL.split('?');  
	alert(sURLVariables);
	for (var i = 0; i < sURLVariables.length; i++) {  
		var sParameterName = sURLVariables[i].split('=');  
		if (sParameterName[0] == sParam) {  
			return sParameterName[1];  
		}  
	}  
}

function callwebservice(controller, method, parameter) {
	var url = "http://onit1.homenet.org/TrustMasterMobileServices/" + controller + "/" + method;
    if(typeof(parameter)==='undefined') parameter='';
	var receivedData;
	try {
		$.ajax({
			url: url,
			cache: false,
			dataType: 'json',
			data:parameter,
			async: false,
			beforeSend: function() {
				app.showLoading();         
			},
			success: function (data) {
				receivedData = eval(data)[0];
			},
			error: function (msg) {
				alert("Server error. Please contact On-IT1.\n\n" + errorThrown);
			},
			complete: function() {
				app.hideLoading();
			}
		});
		return receivedData;
	}
	catch (e) {
		alert("Error occurred. Please contact On-IT1.\n\n" + e);
	}
}