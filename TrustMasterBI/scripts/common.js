var windowWidth = $(window).width(); //retrieve current window width
var windowHeight = $(window).height(); //retrieve current window height

function validateControl(divname) {
	var validator = $("#" + divname).kendoValidator().data("kendoValidator");
	return validator.validate();
}

function cleanview() {
	//alert('cleanview');
	$("div[data-role=view]").each(function(i, elem) {
		if ($(elem).attr("data-url") && $(elem).attr("data-url") != window.location.href.split('#')[1]) {
			$(elem).remove();
		}
	});
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

function onInit(e) {//alert(e.view.title);
	//e.view.title =="My custom Title";
	e.view.footer.find(".youthdevelopment").hide();
}

function closeParentPopover(e) {
	var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');				
	popover.close();
}

function transit(e) {    
	$("#chartArea").empty();
	alert(e.button.context);
	if (e.button.context.innerText == "Tabular") {
		e.button.context.innerText = "Graphical";
		callwebservice('Chart', 'Test2', '', showreportcomplete);
	}
	else {
		e.button.context.innerText = "Tabular";
		showchart();
	}
}

function callwebservice(controller, method, parameter, callbackFunction) {
	var url;
	url = "http://196.214.67.67/TrustMasterMobileServices/" + controller + "/" + method;
	//url = "http://183.182.91.146/TrustMasterBI/" + controller + "/" + method;
	//url = "http://192.168.0.4/TrustMasterBI/" + controller + "/" + method;
    
	if (typeof(parameter)==='undefined')
		parameter = '';
    
	//alert(url);
	//alert(parameter);
    
	app.showLoading();
	try {
		var request = $.ajax({
			url: url,
			cache: false,
			dataType: 'json',
			data:parameter
		});
    
		// callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR) {
			// log a message to the console
			//alert("Hooray, it worked!" + response);
			var result = eval(response)[0];
			if (typeof(result)==='undefined') 
				return;
			callbackFunction(result);
		});
    
		// callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown) {
			// log the error to the console
			alert("The following error occured: " + textStatus, errorThrown);
		});
    
		// callback handler that will be called regardless
		// if the request failed or succeeded
		request.always(function () {
			app.hideLoading();
			// reenable the inputs
			//alert("always");
		});
	}
	catch (e) {
		alert("Errour occurred " + e);
		app.hideLoading();
	}
}

function login() {
	//Validate control
	if (!validateControl('divlogin'))
		return;
	//Authentication
	callwebservice('User', 'Login', 'uidDevice=' + window.top.device.uuid + '&pin=' + $("#loginpin").val(), logincomplete);
}

function logincomplete(result) {
	if (result.resultCode == window.top.Onit1.ResultCode.Success) { // login successful
		//alert("Logedin successfully!");
		app.navigate("../Common/services.html");
	}
	else 
		alert("We did not recognise your pin and device. Please try again");
}

function registeruser() {		
	//Validate control
	if (!validateControl('registationForm'))
		return;
	//Registration
	callwebservice('User', 'Register'
				   , 'firstname=' + $("#txtFirstName").val() + '&lastname=' + $("#txtSurname").val() + '&uidDevice=' + window.top.device.uuid + '&email=' + $("#email").val() + '&pin=' + $("#pin").val()
				   , registerusercomplete);
}

function registerusercomplete(result) {
	if (result.resultCode == window.top.Onit1.ResultCode.Success) { // login successful
		alert("Registration successfully!");
		$("#registationForm").hide();
		$("#result").show();
	}
	else 
		alert("Error occured while registration. Please try again");   
}

function forgotPin() {
	//Validate control
	if (!validateControl('forgotPinForm'))
		return;
	//call service        
	callwebservice('User', 'ForgotPin', 'uidDevice=' + window.top.device.uuid + '&email=' + $("#txtemailId").val(), forgotPincomplete);
};

function forgotPincomplete(result) {
	if (result.resultCode == window.top.Onit1.ResultCode.Success) { // login successful
		alert("Your pin sent successfully!");
		$("#forgotPinForm").hide();
		$("#Response").show();
	}
	else 
		alert(result.message);   
}

function reset(e) {
	//alert("reset clicked");
	//reset email text box
	$("#txtemailId").val('');
};

function registrationFormReset(e) {
	$("#txtFirstName").val('');
	$("#txtSurname").val('');
	$("#email").val('');
	$("#pin").val('');
}

function servicelist(e) {
	callwebservice('Home', 'Servicelist', '', servicelistcomplete);
}

function servicelistcomplete(result) {
	var scriptTemplate = kendo.template($("#servicetemplete").html(), {useWithBlock:false});
	$("#divservice").html(scriptTemplate(result.dataSource));   
}

function modulelist(e) {
	//$("#module-navbar").data("kendoMobileNavBar").title(e.view.params.title);
	callwebservice('Home', 'Modulelist', 'idService=' + e.view.params.id, modulelistcomplete);
}

function modulelistcomplete(result) {
	var moduletemplete = kendo.template($("#moduletemplete").html(), {useWithBlock:false});
	$("#divmodule").html(moduletemplete(result.dataSource));
}

function graphlist(e) {
	//$("#module-navbar").data("kendoMobileNavBar").title(localStorage.getItem("title"));
	callwebservice('YouthCentre', 'Chartlist', '', graphlistcomplete);
}

function graphlistcomplete(result) {
	var moduletemplete = kendo.template($("#moduletemplete").html(), {useWithBlock:false});
	$("#graph_list").html(moduletemplete(result.dataSource));
}

function showchart(e) {
	if (typeof(e)!=='undefined') {
		localStorage.setItem("controller", e.view.params.controller);
		localStorage.setItem("method", e.view.params.method);      
	}
	callwebservice(localStorage.getItem("controller"), localStorage.getItem("method"), '', showchartcomplete);	
}

function showchartcomplete(result) {
	$("#chartArea").kendoChart(result);  
}

function showreportcomplete(result) {
	$("#chartArea").kendoGrid(result);  
}

function btnClick(url){
    app.navigate(url);
}