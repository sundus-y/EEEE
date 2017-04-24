/**
 * Shows the active threads
 * @param elementName - the name of the element on which the table should reside
 */
function ActiveThreadsTable(elementName) {
    this._elementName = elementName;
    this.init();
}

ActiveThreadsTable._dataTable;
ActiveThreadsTable._dialog;
ActiveThreadsTable._shortThreadDumpsAsString;
ActiveThreadsTable._fullThreadDumpsAsString;
ActiveThreadsTable.prototype._elementName;

/**
 * init the component
 */
ActiveThreadsTable.prototype.init = function() {
    if (!ActiveThreadsTable._dataTable) {
        var headers = [];
        headers.push({sTitle:"Thread","sWidth": "10%"});
        headers.push({sTitle:"State","sWidth": "10%"});
        headers.push({sTitle:"Username","sWidth": "10%"});
        headers.push({sTitle:"Action","sWidth": "10%"});
        headers.push({sTitle:"Duration", "sType":"number-with-ms", "sWidth": "10%"});
        headers.push({sTitle:"Stack Trace","sWidth": "50%"});
        ActiveThreadsTable._dataTable =
            $("#"+this._elementName).dataTable( {
                "aoColumns": headers,
                "aaSorting": [[ 0, "asc" ]],
                "bPaginate": false,
                //"sPaginationType": "full_numbers",
                "bInfo": false,
                "bStateSave": true,
                "bJQueryUI": true
            } );

    }

    ActiveThreadsTable._dialog =
        $("<div id='fullThreadDumpDialog'><div id='fullThreadDumpTable'></div></div>")
            .dialog({
                autoOpen: false,
                title: 'Full Stack trace',
                modal: true,
                width: 1200,
                height: 800
            });
};

/**
 * callback method
 */
ActiveThreadsTable.prototype.refreshed = function() {};

/**
  *  refresh the table
  */
ActiveThreadsTable.prototype.refresh = function(methodName) {
    ActiveThreadsTable._shortThreadDumpsAsString = {};
    ActiveThreadsTable._fullThreadDumpsAsString = {};
    var _dataTable = ActiveThreadsTable._dataTable;
    var _this = this;
    $.get(service("admin/services/threads/"), function(data){
        _dataTable.fnClearTable( 0 );
        var rowCount = 0;
        $(data).find("thread").each(function(){
            var clientInfoElement = $(this).find("clientInfo");
            var clientInfoArray;
            if (clientInfoElement) {
                clientInfoArray = clientInfoElement.text().split(",");
            }
            var username = (clientInfoArray&&clientInfoArray.length>0?clientInfoArray[0].trim():"");
            if (username=="UNKNOWN") {
                username="";
            }
            var actionName = (clientInfoArray&&clientInfoArray.length>1?clientInfoArray[1].trim():"");
            if (actionName=="running") {
                actionName = "";
            }
            if (!(actionName=="getThreadInfos") &&
                !(actionName=="getServerStatsOverTimeWithParams") &&
                !(actionName=="getServerStats") &&
                !(actionName=="getServiceStats") &&
                !(actionName=="getServerStatsOverTimeWithParams") &&
                !(actionName=="getServerStatsOverTimeWithParams") &&
                !(actionName=="getSlowestServices")) {

                var row = [];
                var threadName = $(this).find("threadName").text();
                row.push(threadName);
                row.push($(this).find("stateName").text());
                row.push(username);
                row.push(actionName);
                row.push($(this).find("duration").text() + " ms.");
                var stackTraceElement = $(this).find("stackTrace");
                var stackTraceElements = ActiveThreadsTable._getStackTraceElements(stackTraceElement);
                var fullStackTraceString =  stackTraceElements[0];
                var shortStackTraceString =  stackTraceElements[1];
                var currentTraceItem =  "<span style='padding-left:10px;'>" + stackTraceElements[2] + "</span>";
                row.push("<img class='threadImage' src='/epc/resources/public/images/list.png' style='cursor:pointer;margin-top:3px' threadName='" + threadName + "' onclick='ActiveThreadsTable._showDialog(\"" + threadName + "\");'/>" + currentTraceItem);
                ActiveThreadsTable._shortThreadDumpsAsString[threadName] = shortStackTraceString;
                ActiveThreadsTable._fullThreadDumpsAsString[threadName] = fullStackTraceString;
                //for (var i=0; i<30; i++) {
                _dataTable.fnAddData(row);
                rowCount = rowCount + 1;
                //}

                $('.threadImage').tipsy({gravity: 'n', fade: true, html: true, title: function() { return ActiveThreadsTable._shortThreadDumpsAsString[this.getAttribute('threadName')]; } });
            }
        });

        if (rowCount==0) {
            _dataTable.fnAddData(["","","","","",""]);
        }

        _this.refreshed();

    });
};

/**
  * get the stack trace as HTML string
  */
ActiveThreadsTable._getStackTraceElements = function(element) {
    var fullInnerHtml = "";
    var shortInnerHtml = "";
    var currentTraceItem = "";
    var stop = false;
    var nonInfomedia = [];
    var first = true;
    $(element).find("trace").each(function(){
        if (!stop) {
            var trace = $(this).text();
            if (trace.indexOf(".infomedia.")>=0) {
                if (nonInfomedia.length>0) {
                    var alreadyUsedEllipsys = false;
                    // flush all the non infomedia to the html, while shortening what's needed
                    for (var i=0; i<nonInfomedia.length; i++) {
                        fullInnerHtml = fullInnerHtml +  "<tr><td>" + nonInfomedia[i] + "</td></tr>";
                        // flush only the first and last two
                        if (i<2) {
                            shortInnerHtml = shortInnerHtml +  "<tr><td>" + nonInfomedia[i] + "</td></tr>";
                        } else if (i>nonInfomedia.length-2) {
                            shortInnerHtml = shortInnerHtml +  "<tr><td>" + nonInfomedia[i] + "</td></tr>";
                        } else {
                            if (!alreadyUsedEllipsys) {
                                shortInnerHtml = shortInnerHtml +  "<tr><td>...</td></tr>";
                                alreadyUsedEllipsys = true;
                            }
                        }
                    }
                    nonInfomedia = [];
                }
                if (currentTraceItem=="") {
                    currentTraceItem = trace;
                }
                trace = "<span style='color:white'>" + trace + "</span>";
                shortInnerHtml = shortInnerHtml +  "<tr><td>" + trace + "</td></tr>";
                fullInnerHtml = fullInnerHtml +  "<tr><td>" + trace + "</td></tr>";
            } else {
                trace = "<span style='color:gray'>" + trace + "</span>";
                if (first || nonInfomedia.length>0) {
                    nonInfomedia.push(trace);
                } else {
                    shortInnerHtml = shortInnerHtml +  "<tr><td>" + trace + "</td></tr>";
                }
                fullInnerHtml = fullInnerHtml +  "<tr><td>" + trace + "</td></tr>";
            }
            first = false;
            if (trace.indexOf("processHttp")>=0) {
                // minimise the output to just everything after the processHttp call
                stop = true;
            }
        }
    });
    fullInnerHtml = "<table style='text-align:left'>" + fullInnerHtml + "</table>"
    shortInnerHtml = "<table style='text-align:left'>" + shortInnerHtml + "</table>"
    return [fullInnerHtml,shortInnerHtml,currentTraceItem];
};

/**
 * static method to show the dialog with the full track trage
 * @param threadName of the stack trace in the static map
 */
ActiveThreadsTable._showDialog = function(threadName) {
    var fullInnerHtml = ActiveThreadsTable._fullThreadDumpsAsString[threadName];
    fullInnerHtml = fullInnerHtml.replace(/white/g,"black");
    ActiveThreadsTable._dialog.html(fullInnerHtml).dialog('open');
};
