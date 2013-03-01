function dashboardchart(e) {
	//alert("engagement");
	//$("#countPerCost").kendoChart(result);
	$("#humannavbar").data("kendoMobileNavBar").title(e.view.params.title);
	callwebservice('People', 'TotalEmployeesWithEngagementsAndTermination', '', yearsofservice);
}

function yearsofservice(result) {
	//alert("yearsofservice");
	//debugger;
	$("#engageTermination").kendoChart(result);
	callwebservice('People', 'YearsOfServicePerCompany', '', Union);
	//$("#countPerCost").kendoChart(data);
}
function Union(result) {
	$("#yearsofservice").kendoChart(result);
	//alert("Union");
	callwebservice('People', 'UnionRepresentativesPerCompany', '', dashboardComplete);
}
function dashboardComplete(result) {
	$("#union").kendoChart(result);
	//alert("dashboadrd complete");
	//$("#countPerCost").kendoChart(result);
}