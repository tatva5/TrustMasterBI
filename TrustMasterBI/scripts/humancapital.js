function dashboardchart(e) {
	//alert("engagement");
	//$("#countPerCost").kendoChart(result);
	$("#humannavbar").data("kendoMobileNavBar").title(e.view.params.title);
	callwebservice('People', 'CountPerCompany', '', dashboardComplete);
    //var fromdate = kendo.toString(new Date(date.getFullYear(), date.getMonth(), 1), "dd MMM yyyy");
    var fromdate="01 Jan 2010";
	var date = new Date();
	//alert(fromdate);
	callwebservice('People', 'CompanyWithEngagementsTerminationLeaveDaysAndEmployees', 'dtFrom=' + fromdate + '&dtTo=' + date + '&periodEndDate=' + date, listbindingcomplete);
	//oncompanyclick(temp.datasource.data.0.TotalEmployees,'#= temp.datasource.data.0.Engagements #','#= temp.datasource.data.0.Terminations #','#= temp.datasource.data.0.LeaveDays #')
	//alert(temp);
}

function dashboardComplete(result) {
	$("#countpercompany").kendoChart(result);
	//alert("dashboadrd complete");
	//$("#countPerCost").kendoChart(result);
}
function listbindingcomplete(result) {
	var hccompanylist = kendo.template($("#hccompanylist").html(), {useWithBlock:false});
	$("#companyData").html(hccompanylist(result.dataSource.data));
    //var chi=$("#companylist").children().first();
    //debugger;
    $("#companylist").children().first().addClass('active');
    
	var data = result.dataSource.data[0];
	oncompanyclick(data.TotalEmployees, data.Engagements, data.Terminations, data.LeaveDays,$("#companylist").children().first());
	//alert("dashboadrd complete");
}
function oncompanyclick(TotalEmployees, Engagements, Terminations, LeaveDays,obj) {
	//alert(name.Companyname);
	//debugger;
    
    $("#companylist li").removeClass('active');
	$(obj).addClass('active');
	document.getElementById('employeeno').innerHTML = TotalEmployees;
	document.getElementById('engagements').innerHTML = Engagements;
	document.getElementById('terminations').innerHTML = Terminations;
	document.getElementById('leavedays').innerHTML = LeaveDays;
	//$("#companyData").html(hccompanylist(result.dataSource.data));
	//alert("dashboadrd complete");
}