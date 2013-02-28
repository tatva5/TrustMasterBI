function dashboardchart() {
	//alert("engagement");
	//$("#countPerCost").kendoChart(result);
	callwebservice('People', 'TotalEmployeesWithEngagementsAndTermination', '', yearsofservice);
}

function yearsofservice(result) {
	//alert("yearsofservice");
	//debugger;
	$("#engageTermination").kendoChart(result);
	callwebservice('People', 'YearsOfServicePerCostCentrePerCompany', '', Union);
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