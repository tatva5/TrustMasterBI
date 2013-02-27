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
