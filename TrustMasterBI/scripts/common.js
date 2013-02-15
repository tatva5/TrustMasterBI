
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

function callwebservice(controller, method, parameter) {
	var url = "http://onit1.homenet.org/TrustMasterMobileWebService/" + controller + "/" + method;
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
                receivedData=eval(data)[0];
			},
			error: function (msg) {
				alert("Server error. Please contact On-IT1.\n\n" + errorThrown);
			}
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