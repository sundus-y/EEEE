/**
 * Show errors table when clicking on a service which contains any error
 * @param {Object} elementName
 */
function ServiceErrorsTable(elementName) {
    this._elementName = elementName;
    this.init();
}

ServiceErrorsTable._dataTable;
ServiceErrorsTable._this;
ServiceErrorsTable.prototype._elementName;

/**
 * Init component
 */
ServiceErrorsTable.prototype.init = function() {
    if (!ServiceErrorsTable._dataTable) {
        var headers = [];
		headers.push({sTitle:"Time occur", "sWidth": "10%",
			"fnRender": function ( oObj ) {
				return "<span style='font-size:12;'>" + oObj.aData[0] + "</span>";
		}});
		headers.push({sTitle:"User", "sWidth": "10%",
			"fnRender": function ( oObj ) {
				return "<span style='font-size:12;'>" + oObj.aData[1] + "</span>";
		}});
        headers.push({sTitle:"Exceptions", "sWidth": "100%",
			"fnRender": function ( oObj ) {
				return "<span style='font-size:12;'>" + "<pre>"+Encoder.htmlEncode(oObj.aData[2])+"</pre></span>";
		}});
		headers.push({sTitle:"Parameters", "sWidth": "10%",
			"fnRender": function ( oObj ) {
				return "<span style='word-wrap: break-word;'><pre>"+Encoder.htmlEncode(oObj.aData[3])+"</pre></span>";
		}});

        ServiceErrorsTable._dataTable =
            $('#' + this._elementName).dataTable( {
                "aoColumns": headers,
                "bAutoWidth": false,
                "bPaginate": false,
                "bInfo": false,
                "bStateSave": true,
                "bJQueryUI": true
            } );
    }
};

/**
 * clear the data in the table (if exists)
 */
ServiceErrorsTable.prototype.clearData = function() {
	ServiceErrorsTable._clearData();
};
ServiceErrorsTable._clearData = function() {
	ServiceErrorsTable._dataTable.fnClearTable( 0 );
};

/**
  *  refresh the table to show service errors of a specific service
  */
ServiceErrorsTable.prototype.refresh = function(methodName) {
    var _dataTable = ServiceErrorsTable._dataTable;
    $.get(service("admin/services/error/" + methodName), function(data){
        ServiceErrorsTable._clearData();
		$(data).find("serviceerror").each(function(){
			var row = [];
			row.push($(this).find("timeOccur").text());
			row.push($(this).find("user").text());
			row.push($(this).find("errorString").text());
			row.push($(this).find("parametersAsString").text());
			_dataTable.fnAddData(row);
		});
    });
};
