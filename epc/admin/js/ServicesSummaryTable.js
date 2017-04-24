/**
 * Shows the services summary
 */
function ServicesSummaryTable(elementName) {
    this._elementName = elementName;
    ServicesSummaryTable._this = this;
    this.init();
}

ServicesSummaryTable._this;
ServicesSummaryTable._dataTable;
ServicesSummaryTable._serviceErrorsDialog;
ServicesSummaryTable._slowServicesDialog;
ServicesSummaryTable.prototype._elementName;

/**
 * init the component
 */
ServicesSummaryTable.prototype.init = function() {
    if (!ServicesSummaryTable._dataTable) {
        var headers = [];
        headers.push({"bVisible": false});
        headers.push({sTitle:"Service",
                            fnRender: function(obj) {
                               var router = obj.aData[0];
                               var method = obj.aData[1];
                               //return "<div style='cursor:pointer'>" + data + "</div>";
                               return "<span style='cursor:pointer;color:blue;text-decoration:underline;' onclick='ServicesSummaryTable.showSlowServicesDialog(\"" + router + "\",\"" + method + "\");'>" + method + "</span>";
                            },
							"sWidth": "400px"});
        headers.push({sTitle:"Count","sWidth": "150px"});
        headers.push({sTitle:"Avg. Duration", "sType":"number-with-ms", "sWidth": "250px"});
        headers.push({sTitle:"Max. Duration", "sType":"number-with-ms", "sWidth": "250px"});
        headers.push({sTitle:"Errors",
	        	fnRender: function(obj) {
		        	var router = obj.aData[0];
		        	var method = obj.aData[1];
					var errorCount = obj.aData[5];
					if (errorCount>0){
						return "<span style='cursor:pointer;color:blue;text-decoration:underline;' onclick='ServicesSummaryTable.showServiceErrorsDialog(\"" + router + "\",\"" + method + "\");'>" + errorCount + "</span>";
					} else {
						return errorCount;
					}
            	},
				"sWidth": "100px"});
        headers.push({sTitle:"Last Call","sWidth": "600px"});

        ServicesSummaryTable._dataTable =
            $("#" + this._elementName).dataTable( {
                "aoColumns": headers,
                "bAutoWidth": false,
                "bPaginate": false,
                "bInfo": false,
                "bStateSave": true,
                "bJQueryUI": true
            } );
    }

    ServicesSummaryTable._slowServicesDialog =
        $("<div id='slowServicesDialog'><div id='slowServicesTable'></div></div>")
            .dialog({
                autoOpen: false,
                title: 'Slow Services',
                modal: true,
                width: 1000,
                height: 800
            });

    ServicesSummaryTable._serviceErrorsDialog =
        $("<div id='serviceErrorsDialog'><div id='serviceErrorsTable'></div></div>")
            .dialog({
                autoOpen: false,
                title: 'Service Errors',
                modal: true,
                width: 1000,
                height: 800
            });

};


/**
 * static method to show the slow services dialog
 * @param methodName to show services for
 */
ServicesSummaryTable.showSlowServicesDialog = function(routerName,methodName) {
    var slowServicesTable = new SlowServicesTable("slowServicesTable")
    $('#slowServicesDialog').dialog({title:"Slow Services for " + routerName + "." + methodName});
    //ServicesSummaryTable._slowServicesDialog.title(routerName);
    slowServicesTable.clearData();
    ServicesSummaryTable._slowServicesDialog.dialog('open');
    slowServicesTable.refresh(methodName);
};


ServicesSummaryTable.showServiceErrorsDialog = function(routerName,methodName) {
    var serviceErrorsTable = new ServiceErrorsTable("serviceErrorsTable")
    $('#_serviceErrorsDialog').dialog({title:"Service Errors for " + routerName + "." + methodName});

    serviceErrorsTable.clearData();
    ServicesSummaryTable._serviceErrorsDialog.dialog('open');
    serviceErrorsTable.refresh(methodName);
};

/**
 * callback method
 */
ServicesSummaryTable.prototype.refreshed = function() {};

/**
  *  refresh the table
  */
ServicesSummaryTable.prototype.refresh = function() {
    ServicesSummaryTable._refresh();
};
ServicesSummaryTable._refresh = function() {
    var _dataTable = ServicesSummaryTable._dataTable;
    _dataTable.fnClearTable( 0 );
    var _this = this;
    $.get(service("services/stats"), function(data){
        $(data).find("entry").each(function(){
            var row = [];
            var actionName = $(this).find("methodName").text();
            if (!actionName ||
                (!(actionName=="getThreadInfos") &&
                 !(actionName=="getServerStatsOverTimeWithParams") &&
                 !(actionName=="getServerStats") &&
                 !(actionName=="getServiceStats") &&
                 !(actionName=="clearServicesData") &&
                 !(actionName=="getServerStatsOverTimeWithParams") &&
                 !(actionName=="getSlowestServices"))) {

                row.push($(this).find("routerName").text());
                row.push(actionName);
                row.push($(this).find("invocationCount").text());
                row.push($(this).find("avgDurationDescription").text());
                row.push($(this).find("maxDurationDescription").text());
                row.push($(this).find("errorCount").text());
                row.push($(this).find("lastUsageTimeDescription").text());
                //for (var i=0; i<10; i++) {
                _dataTable.fnAddData(row);
                //}
            }
        });
        ServicesSummaryTable._this.refreshed();
    });
};
