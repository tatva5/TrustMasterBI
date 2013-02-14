
function AddCSSOnPage() {
	document.write('<link rel="stylesheet" href="../kendo/styles/kendo.mobile.all.min.css" />');
	document.write('<link rel="stylesheet" href="../kendo/styles/kendo.common.css"  />');
	document.write('<link rel="stylesheet" href="../kendo/styles/kendo.default.css" />');   
}

function AddJsOnPage() {
	document.write('<script src="../cordova.js" type="text/javascript"></script>');
	document.write('<script src="../kendo/js/kendo.mobile.min.js" type="text/javascript"></script>');
	document.write('<script src="../kendo/js/kendo.all.js" type="text/javascript"></script>');               
}

function CallWebService(controller, method, parameter){
    var url="http://onit1.homenet.org/TrustMasterMobileWebService/" + controller + "/" + method;
    alert(url);
    
    try {
        $.ajax({
            "url": url,
            "method": "post",
			"dataType": "json"
			//"data": "arg1=val1&arg2=val2" // chart-specific arguments
			})
			.done(function (data, textStatus, jqXHR) {
							try {
								data = eval(data)[0];
                                return data;
							}
							catch (e) {
								alert("Server sent incorrect data. Please contact On-IT1.");
							}
						})
						.fail(function (jqXHR, textStatus, errorThrown) {
							alert("Server error. Please contact On-IT1.\n\n" + errorThrown);
						})
	}
    catch (e) {
	    alert("Error occurred. Please contact On-IT1.\n\n" + e);
    }
}