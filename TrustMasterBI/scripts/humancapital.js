function dashboardchart(e) {
	//alert("engagement");
	//$("#countPerCost").kendoChart(result);
	$("#humannavbar").data("kendoMobileNavBar").title(e.view.params.title);
	callwebservice('People', 'CountPerCompany', '', dashboardComplete);
    //callwebservice('People', 'CompanyWithEngagementsTerminationLeaveDaysAndEmployeesCollection', '', dashboardComplete);
}

function dashboardComplete(result) {
	$("#countpercompany").kendoChart(result);
	//alert("dashboadrd complete");
	//$("#countPerCost").kendoChart(result);
}

function onCompanyclick(url, name) {
	if (ismodule) {
		localStorage.setItem("youthcare", name);	
		localStorage.setItem("idService", id);	
	}
	contentheight = $(window).height() - $("#youthcareheader").height() - $("#youthcarefooter").height();
	app.navigate(url);
}
