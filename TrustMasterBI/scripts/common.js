var windowWidth = $(window).width(); //retrieve current window width
var windowHeight = $(window).height(); //retrieve current window height
var contentheight;

function aboutusshow() {    
	var divmargin = ($(window).height() - 445) / 2;
	$("#aboutbox").css('margin-top', divmargin);    
}

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
	if (localStorage.getItem("idService") == window.top.Onit1.ServiceID.YouthDevelopmentCentres)
		e.view.footer.find("#youthdevelopment").css('display', 'block');
	else if (localStorage.getItem("idService") == window.top.Onit1.ServiceID.Kgwerano) {        
		e.view.footer.find("#kgwerano").css('display', 'block');
		e.view.footer.find("#kgwerano").addClass('km-state-active');
	}
}

function clearPopover() {
	var date = new Date();
	if ($("#ddlSelect").data("kendoComboBox").selectedIndex == 0) {
		$("#dpFrom").kendoDatePicker({value:new Date()});
	}
	else {
		$("#dpFrom").kendoDatePicker({value:new Date(date.getFullYear(), date.getMonth(), 1)}, "MM/dd/yyyy"); 
		//$("#dpFrom").data(kendoDatePicker).value(new Date(date.getFullyear, date.getmonth, 1), "MM/dd/yyyy");
		$("#dpTo").data(kendoDatePicker).value(date); 
	}
	//$(".k-datepicker input").val('');
}

function closeParentPopover(e) {
	var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');
	//Validate control
	if ($("#ddlSelect").data("kendoComboBox").selectedIndex == 0) {
		if (!validateControl('since'))
			return;
		//localStorage.setItem("fromdate", kendo.toString($("#dpFrom").data("kendoDatePicker").value(), "MM/dd/yyyy"));
		showchart();
	}
	else if ($("#ddlSelect").data("kendoComboBox").selectedIndex == 1) {
		if (!validateControl('validateDate'))
			return;
		var dateTo = $("#dpTo").data("kendoDatePicker").value();
		alert(dateTo);
	}
	//clearPopover();
	popover.close();
}

function transit(e) {    
	$("#chartArea").empty();
	//alert(e.button.context);
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

function logout() {
	callwebservice('User', 'Logout', 'uidDevice=' + window.top.device.uuid, logoutcomplete);
}

function logoutcomplete(result) {
	if (result.resultCode == window.top.Onit1.ResultCode.Success) {
		//alert("logout successfully!");
		app.navigate("#home");
	}
	else 
		alert("oops....there is an error while logout");
}

function servicelist(e) {
	callwebservice('Home', 'Servicelist', '', servicelistcomplete);
}

function servicelistcomplete(result) {
	var scriptTemplate = kendo.template($("#servicetemplete").html(), {useWithBlock:false});
	$("#divservice").html(scriptTemplate(result.dataSource));   
}

function modulelist(e) {
	if (typeof(e.view.params.id)!=='undefined')
		localStorage.setItem("idService", e.view.params.id);
	//$("#module-navbar").data("kendoMobileNavBar").title(e.view.params.title);
	callwebservice('Home', 'Modulelist', 'idService=' + localStorage.getItem("idService"), modulelistcomplete);
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
	var moduletemplete = kendo.template($("#listtemplete").html(), {useWithBlock:false});
	$("#graph_list").html(moduletemplete(result.dataSource));
}

function onmoduleclick(url, name, id, ismodule) {
	if (ismodule) {
		localStorage.setItem("youthcare", name);	
		localStorage.setItem("idModule", id);	
	}
	contentheight = $(window).height() - $("#youthcareheader").height() - $("#youthcarefooter").height();
	app.navigate(url);
}

function oncustommoduleclick(url, name, ismodule, obj, type) {
	$("#gridArea").empty();
	$("#chartArea").empty();
	$("#scrollview").data("kendoMobileScrollView").scrollTo(0);
	$("#reportlist li").removeClass('active');
	$(obj).addClass('active');
    
	localStorage.setItem("controller", GetQueryStringParams("controller", url));
	localStorage.setItem("method", GetQueryStringParams("method", url)); 
	localStorage.setItem("type", type);
	
	if (type != 'R') {
		$("#scrollview").show();
		showchart();
	}
	else {
		$("#onlygrid").show();
		showGridData();      
	}
}

function customgraphlist(e) {
	$("#ycnavbar").data("kendoMobileNavBar").title(localStorage.getItem("youthcare"));
	$("#graph_list").css('height', contentheight);
	$("#chartAreapage").css('height', contentheight - 20);
	$("#gridAreapage").css('height', contentheight - 20);
	$("#splitter").css('height', contentheight);
	$("#splitter").data("kendoSplitter").trigger("resize");
	callwebservice('YouthCentre', 'Chartlist', 'idService=' + localStorage.getItem("idModule"), customgraphlistcomplete);
}

function customgraphlistcomplete(result) {
	var moduletemplete = kendo.template($("#customlisttemplete").html(), {useWithBlock:false});
	$("#graph_list").html(moduletemplete(result.dataSource));
	$("#reportlist").children().first().addClass("active");
    
	var url = result.dataSource[0].href;
	localStorage.setItem("controller", GetQueryStringParams("controller", url));
	localStorage.setItem("method", GetQueryStringParams("method", url)); 
    
	var type = result.dataSource[0].type;
	localStorage.setItem("type", type); 
	if (type != 'R') {
		$("#scrollview").show();
		$("#onlygrid").hide();
		showchart();      
	}
	else {
		$("#scrollview").hide();
		$("#onlygrid").show();
		showGridData();
	}
}

function showchart(e) {
	if (typeof(e)!=='undefined') {
		localStorage.setItem("controller", e.view.params.controller);
		localStorage.setItem("method", e.view.params.method);      
	}
	//alert(localStorage.getItem("youthcare"));
	//alert(kendo.toString($("#dpFrom").data("kendoDatePicker").value(), "dd MMM yyyy"));
	callwebservice(localStorage.getItem("controller"), localStorage.getItem("method")
				   , 'site=' + localStorage.getItem("youthcare") + '&date=' + kendo.toString($("#dpFrom").data("kendoDatePicker").value(), "dd MMM yyyy") + '&type=' + localStorage.getItem("type")
				   , showchartcomplete)	
}

function showchartcomplete(result) {
	$("#chartArea").kendoChart(result);
}

function showGridData() {
	if ($.trim($("#gridArea").html()) == '') {
		if (localStorage.getItem("controller") == "Youthcentre") {
			callwebservice('Chart', 'Test2', '', showreportcomplete);
            $('.firstdiv').css('transform', 'scale(1.0) translate3d(' + (contentWidth * -1 * $("#scrollview").data("kendoMobileScrollView").page) + 'px,0px,0px)');
			return;
		}
		callwebservice(localStorage.getItem("controller"), localStorage.getItem("method"), '', showreportcomplete);		
	}
    $('.firstdiv').css('transform', 'scale(1.0) translate3d(' + (contentWidth * -1 * $("#scrollview").data("kendoMobileScrollView").page) + 'px,0px,0px)');
}

function showreportcomplete(result) {
	if (localStorage.getItem("type") == "R")
		$("#onlygrid").kendoGrid(result);
	else
		$("#gridArea").kendoGrid(result);
}

function openchildbrowser() {
	var ss = document.createElement("script");
	ss.type = "text/javascript";
	ss.charset = "utf-8";
	ss.src = "../Plugins/Child Browser/childbrowser.js"
	$("#home").append(ss);
	window.plugins.childBrowser.showWebPage("http://www.bosasagroup.com");
}

function oncollapsed() {
	contentWidth = $(window).width() - 15;    
	$("#scrollview").css('width', contentWidth);
	$("#chartAreapage").css('width', contentWidth);
	$("#gridAreapage").css('width', contentWidth);
	$("#chartArea").css('width', contentWidth);
	$("#gridArea").css('width', contentWidth);
	$("#chartArea").data("kendoChart").redraw();
	$('.firstdiv').css('transform', 'scale(1.0) translate3d(' + (contentWidth * -1 * $("#scrollview").data("kendoMobileScrollView").page) + 'px,0px,0px)');
}

function setWidth() {
	setTimeout(function() {
		contentWidth = $(window).width() - 50;
		$("#scrollview").css('width', contentWidth);
		$("#chartAreapage").css('width', contentWidth);
		$("#gridAreapage").css('width', contentWidth);
		$("#chartArea").css('width', contentWidth);
		$("#gridArea").css('width', contentWidth);
		$('.firstdiv').css('transform', 'scale(1.0) translate3d(' + (contentWidth * -1 * $("#scrollview").data("kendoMobileScrollView").page) + 'px,0px,0px)');
		$("#chartArea").data("kendoChart").redraw();
	}, 500);
}

function setWidthExpanded() {
	setTimeout(function() {
		contentWidth = $(window).width() * .75;
		$("#scrollview").css('width', contentWidth);
		$("#chartAreapage").css('width', contentWidth);
		$("#gridAreapage").css('width', contentWidth);
		$("#chartArea").css('width', contentWidth);
		$('.firstdiv').css('transform', 'scale(1.0) translate3d(' + (contentWidth * -1 * $("#scrollview").data("kendoMobileScrollView").page) + 'px,0px,0px)');
		$("#gridArea").css('width', contentWidth);
		$("#chartArea").data("kendoChart").redraw();
	}, 0);
}

function onexpanded() {
	contentWidth = $(window).width() * .75;
	$("#scrollview").css('width', contentWidth);
	$("#chartAreapage").css('width', contentWidth);
	$("#gridAreapage").css('width', contentWidth);
	$("#chartArea").css('width', contentWidth);
	$("#gridArea").css('width', contentWidth);
	$("#chartArea").data("kendoChart").redraw();
	$('.firstdiv').css('transform', 'scale(1.0) translate3d(' + (contentWidth * -1 * $("#scrollview").data("kendoMobileScrollView").page) + 'px,0px,0px)');
	//$("#graph_list").toggle("slow");
}