function validateControl(divname) {
	var validator = $("#" + divname).kendoValidator().data("kendoValidator");
	return validator.validate();
}

$("#loginbtn").live("click", function(e) {
	//Validate control
	if (!validateControl('divlogin'))
		return;
				
	//Authentication
	var result = callwebservice('User', 'Login', 'uidDevice=' + window.top.device.uuid + '&pin=' + $("#loginpin").val());
	if (typeof(result)==='undefined') 
		return;
	if (result.resultCode == window.top.Onit1.ResultCode.Success) { // login successful
		alert("Logedin successfully!");
		app.navigate("../Common/services.html");
	}
	else 
		alert("We didn’t recognise your pin and device. Please try again");
});

$("#btnRegister").live("click", function(e) {		
	//Validate control
	if (!validateControl('registationForm'))
		return;
    
	//Registration
	var result = callwebservice('User', 'Register', 'firstname=' + $("#txtFirstName").val() + '&lastname=' + $("#txtSurname").val() + '&uidDevice=' + window.top.device.uuid + '&email=' + $("#email").val() + '&pin=' + $("#pin").val());
	if (typeof(result)==='undefined') 
		return;
	if (result.resultCode == window.top.Onit1.ResultCode.Success) { // login successful
		alert("Registration successfully!");
		$("#registationForm").hide();
		$("#result").show();
	}
	else 
		alert("Error occured while registration. Please try again");
});

$("#btnSubmit").live("click", function(e) {
	//Validate control
	if (!validateControl('forgotPinForm'))
		return;
	var result = callwebservice('User', 'ForgotPin', 'uidDevice=' + window.top.device.uuid + '&email=' + $("#txtemailId").val());
	if (typeof(result)==='undefined') 
		return;
    
	if (result.resultCode == window.top.Onit1.ResultCode.Success) { // login successful
		alert("Your pin sent successfully!");
		$("#forgotPinForm").hide();
		$("#Response").show();
	}
	else 
		alert(result.message);
});

$("#resetButton").live("click", function(e) {
	//reset email text box
	$("#txtemailId").val('');
});

function onserviceclick(url) {
	//alert(url);
	localStorage.setItem("id", GetQueryStringParams("id", url));
	localStorage.setItem("title", GetQueryStringParams("title", url));
	app.navigate(url);
}

function cleanview() {
	//alert('cleanview');
	$("div[data-role=view]").each(function(i, elem) {
		if ($(elem).attr("data-url") && $(elem).attr("data-url") != window.location.href.split('#')[1]) {
			$(elem).remove();
		}
	});
}

function transit(e) {
	if (e.button.context.innerText == "Tabular") {
		e.button.context.innerText = "Graphical";
		$("#chartArea").empty();
		$("#chartArea").kendoGrid(callwebservice('Chart', 'Test2', ''));
	}
	else {
		e.button.context.innerText = "Tabular";
		$("#chartArea").empty();
		$("#chartArea").kendoChart(callwebservice('Chart', 'Test1', ''));
	}
}

function GetQueryStringParams(sParam, url) {  
	if (typeof(url)==='undefined')    
		url = window.location.href;
	var sPageURL = url;  
	var sURLVariables = sPageURL.split('?')[1].split('&');  
	for (var i = 0; i < sURLVariables.length; i++) {  
		var sParameterName = sURLVariables[i].split('=');  
		if (sParameterName[0] == sParam) {  
			return sParameterName[1];  
		}  
	}  
}

function callwebservice(controller, method, parameter) {
	var url;
	//url = "http://onit1.homenet.org/TrustMasterMobileServices/" + controller + "/" + method;
	url = "http://183.182.91.146/TrustMasterBI/" + controller + "/" + method;
	//url = "http://192.168.0.4/TrustMasterBI/" + controller + "/" + method;
	if (typeof(parameter)==='undefined')
		parameter = '';
	//alert(url);
	//alert(parameter);
	var receivedData;
	try {
		$.ajax({
			url: url,
			cache: false,
			dataType: 'json',
			data:parameter,
			async: false,
			success: function (data) {
				receivedData = eval(data)[0];
			},
			error: function (msg) {
				alert("Server error. Please contact On-IT1.\n\n" + errorThrown);
			}
		});
	}
	catch (e) {
		alert("Error occurred. Please contact On-IT1.\n\n" + e);
	}
	return receivedData;
}

function servicelist(e) {
	var scriptTemplate = kendo.template($("#servicetemplete").html(), {useWithBlock:false});
	$("#divservice").html(scriptTemplate(callwebservice('Home', 'Servicelist').dataSource));
}

function modulelist(e) {
	//$("#module-navbar").data("kendoMobileNavBar").title(e.view.params.title);
	var moduletemplete = kendo.template($("#moduletemplete").html());
	var result = callwebservice('Home', 'Modulelist', 'idService=' + e.view.params.id);
	if (typeof(result)==='undefined') 
		return;
	$("#divmodule").html(moduletemplete(result.dataSource));
}

function closeParentPopover(e) {
	var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');				
	popover.close();
}