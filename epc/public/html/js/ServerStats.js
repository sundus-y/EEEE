/**
 * Shows the active threads
 * @param elementName - the name of the element on which the table should reside
 */
function ServerStats(elementName) {
    this._elementName = elementName;
    ServerStats._this = this;
    ServerStats._lastUpdateTime = 0;
    this.init();
}

ServerStats.prototype._elementName;
ServerStats._this;
ServerStats._lastUpdateTime;

/**
 * init the component
 */
ServerStats.prototype.init = function() {
    var html = "" +
                  "<span style='padding-left:18px;'>Auto Refresh</span><img id='ServerStats_progress' src='/epc/resources/public/images/progress.gif' style='display:hidden;;padding-left:5px;width:13px;height:13px;'/>" +
                  "<div style='padding-left:18px;' class='on_off'><input type='checkbox' id='ServerStats_on_off' /></div>" +
                  "<table id='ServerStats_table'>" +
                  "<tr><td> </td></tr>" +
                  "<tr><td> </td></tr>" +
                  "<tr><td> </td></tr>" +
                  "<tr><td> </td></tr>" +
                  "<tr><td><span style='padding-left:18px'>Number of executing threads: </span><span id='executingThreads'></span></td></tr>" +
                  "<tr><td><span style='padding-left:18px'>Number of Processors: </span><span id='processors'></span></td></tr>" +
                  "<tr><td><span style='padding-left:18px'>GC time in the last sampled period: </span><span id='gc'></span></td></tr>" +
                  "<tr><td><div id='memoryGraph' class='graph' style='width:200px; height: 150px'></td></tr>" +
               "</table>";

    $("#"+this._elementName).html(html);

    $('.on_off :checkbox').iphoneStyle();

    window.setTimeout("ServerStats._checkRefresh()",1000);
};

ServerStats._checkRefresh = function() {
    if ($("#ServerStats_on_off").attr('checked')) {
        if ((new Date()).getTime()-ServerStats._lastUpdateTime > 1000) {
            ServerStats._this.refresh();
        }
    }
    window.setTimeout("ServerStats._checkRefresh()",700);
};

/**
 * callback method
 */
ServerStats.prototype.refreshed = function() {};

/**
  *  refresh the data
  */
ServerStats.prototype.refresh = function() {

    $("#ServerStats_progress").show();
    var _this = this;

    $.get(service("admin/stats/"), function(data){
            $("#executingThreads").text(($(data).find("executingThreads").text()));
            $("#processors").text(($(data).find("processors").text()));
            $("#gc").text(($(data).find("gcTimeInSeconds").text()) + " (" + ($(data).find("gcPercent").text()) + "%)");

            var usedMemory = ($(data).find("usedMemory").text());
            usedMemory = Number(usedMemory);
            var freeMemory = ($(data).find("freeMemory").text());
            freeMemory = Number(freeMemory);
            var unallocatedMemory = ($(data).find("unallocatedMemory").text());
            unallocatedMemory = Number(unallocatedMemory);

            var values;
            var legendData;
            if (unallocatedMemory>0) {
                values = [usedMemory, freeMemory, unallocatedMemory];
                legendData = [ServerStats._getLegendHtml("Used",usedMemory), ServerStats._getLegendHtml("Free",freeMemory), ServerStats._getLegendHtml("Unallocated",unallocatedMemory)];
            } else {
                values = [usedMemory, freeMemory];
                legendData = [ServerStats._getLegendHtml("Used",usedMemory), ServerStats._getLegendHtml("Free",freeMemory)];
            }

          $('#memoryGraph').tufteBar({
              // For stacked graphs, pass an array of non-cumulative y values
            data: [
              [[usedMemory, freeMemory, unallocatedMemory]]
            ],

            // Bar width in arbitrary units, 1.0 means the bars will be snuggled up next to each other
            barWidth: 0.8,

            // The label on top of the bar - can contain HTML
            // formatNumber inserts commas as thousands separators in a number
            barLabel:  function(index) {
              return "";//$.tufteBar.formatNumber(this[0]) + 'MB'
            },

            // The label on the x-axis - can contain HTML
            axisLabel: function(index) { return "" },

            // Alternatively, you can just override the default colors and keep
            // the built in color functions
            colors: ['blue', 'darkgreen', 'green'],

            // Legend is optional
            legend: {
              // Data can be an array of any type of object, but the default
              // formatter works with strings
              data: legendData,

              // You can customize the element label - can contain HTML
              label: function(index) { return this }
            }

          });

        $("#ServerStats_progress").hide();
        ServerStats._lastUpdateTime = (new Date()).getTime();
        _this.refreshed();
    });
};

/**
 * get the legent Html for the passed text and value
 */
ServerStats._getLegendHtml = function(text, value) {
    return "<span style='font-weight:bold;'>" + value + "</span><span style='padding-left:7px'>" + text + "</span>";
}