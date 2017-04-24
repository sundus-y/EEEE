/**
 * Shows the slow services for a specific method
 * @param elementName - the name of the element on which the table should reside
 */
function SlowServicesTable(elementName) {
    this._elementName = elementName;
    this.init();
}

SlowServicesTable._dataTable;

/**
 * init the component
 */
SlowServicesTable.prototype.init = function() {
    if (!SlowServicesTable._dataTable) {
        var headers = [];
        headers.push({sTitle:"Username", "sWidth": "15%"});
        headers.push({sTitle:"Start At", "sWidth": "15%"});
        headers.push({sTitle:"Duration", "sType":"number-with-ms", "sWidth": "15%"});
        headers.push({sTitle:"Had error", "sWidth": "10%"});
        headers.push({sTitle:"Parameters", "sWidth": "100%","fnRender": function ( oObj ) {return "<pre>"+Encoder.htmlEncode(oObj.aData[4])+"</pre>";}});
        SlowServicesTable._dataTable =
            $('#' + this._elementName).dataTable( {
                "aoColumns": headers,
                "aaSorting": [[ 1, "desc" ]],
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
SlowServicesTable.prototype.clearData = function() {
    SlowServicesTable._clearData();
};
SlowServicesTable._clearData = function() {
    SlowServicesTable._dataTable.fnClearTable( 0 );
};

/**
  *  refresh the table to show slow services of a specific method
  */
SlowServicesTable.prototype.refresh = function(methodName) {
    var _dataTable = SlowServicesTable._dataTable;
    $.get(service("admin/services/slow/" + methodName), function(data){
        SlowServicesTable._clearData();
        $(data).find("service").each(function(){
            var row = [];
            row.push($(this).find("username").text());
            row.push($(this).find("startAt").text());
            row.push($(this).find("duration").text() + " ms.");
			var hadError = $(this).find("hadError");
			row.push(hadError.text());
            row.push($(this).find("parametersAsString").text());
            _dataTable.fnAddData(row);
        });
    });
};