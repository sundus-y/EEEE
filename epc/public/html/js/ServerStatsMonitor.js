/**
 * Shows the active threads
 * @param elementName - the name of the element on which the table should reside
 * @param minimal - should it show in a minimal mode (no slider, no legend)
 */
function ServerStatsMonitor(elementName, minimal) {
    this._elementName = elementName;
    this._minimal = minimal;
    this._from = -3;
    this._to = 0;
    this.init();
}

ServerStatsMonitor.prototype._elementName;
ServerStatsMonitor.prototype._minimal;
ServerStatsMonitor.prototype._from;
ServerStatsMonitor.prototype._to;

/**
 * init the component
 */
ServerStatsMonitor.prototype.init = function() {
    var html = "<br/>" +
               "<span style='margin-left:30px;'/>Range: </span><span id='ServerStatsMonitor_rangeValue'></span><br/>" +
               "<div id='ServerStatsMonitor_slider' style='margin-top:10px;margin-left:30px;width:40%'></div>" +
               "<br/>";
    var chartDiv = "<div id='ServerStatsMonitor_chart' style='width:100%;height:90%'></div>";

    if (!this._minimal) {
        html = html + chartDiv;
    } else {
        html = chartDiv;
    }
    $("#"+this._elementName).html(html);

    if (!this._minimal) {
        var _this = this;
        $(function() {
            $("#ServerStatsMonitor_slider").slider(
                {range:true,
                 min:-72,
                 max:0,
                 values:[_this._from,_this._to],
                 slide: function(event, ui) {
                    var from = Math.abs(ui.values[0]);
                    var to = Math.abs(ui.values[1]);
                    $("#ServerStatsMonitor_rangeValue").html("<span>"+ from + ' hours ago to ' + to +" hours ago.</span>");
                 },
                 change: function(event, ui) {
                    _this._from = ui.values[0];
                    _this._to = ui.values[1];
                    _this.refresh();
                }});
        });
    }
};

/**
 * callback method
 */
ServerStatsMonitor.prototype.refreshed = function() {};

/**
  *  refresh the data
  */
ServerStatsMonitor.prototype.refresh = function() {

    var _this = this;

    var from = Math.abs(this._from);
    var to = Math.abs(this._to);

    var minimal = this._minimal;
    var showLegend = !this._minimal;
    var hoverable = !this._minimal;
    var clickable = !this._minimal;

    $("#ServerStatsMonitor_rangeValue").html("<span>"+ from + ' hours ago to ' + to +" hours ago.</span>");

    $.get(service("admin/statsovertime/" + from + "/" + to), function(data){

        var memoryValues = [];
        var threadValues = [];
        var gcValues = [];
        $(data).find("data").each(function(){
            var time = $(this).find("timestamp").text();
            var memoryValue = (((Number)($(this).find("memory").text()))/(1024*1024));
            memoryValues.push([time, memoryValue]);
            var threadValue = (((Number)($(this).find("thread").text())));
            threadValues.push([time, threadValue]);
            var gcValue = (((Number)($(this).find("gcTimeSinceLastDataPoint").text()))/1000);
            gcValues.push([time, gcValue]);
        });

        var options = {
            series: { lines: { show: true }, shadowSize: 0 },
            xaxis: { mode: "time"},
            yaxis: {  },
            grid: { hoverable: hoverable, clickable: clickable },
            legend: {show:showLegend, position: "nw"}
        };

         $.plot($("#ServerStatsMonitor_chart"), [ { data: memoryValues, label: "Memory"}, { data: gcValues, label: "GC time", yaxis: 2} ], options);
         //$.plot($("#ServerStatsMonitor_chart"), [ [[0, 0], [1, 1]] ], { yaxis: { max: 1 } });

         if (!minimal) {
            var previousPoint = null;
            $("#ServerStatsMonitor_chart").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));

                if (item) {
                    if (previousPoint != item.datapoint) {
                        previousPoint = item.datapoint;

                        $("#tooltip").remove();
                        var x = item.datapoint[0],
                            y = item.datapoint[1].toFixed(0);

                        var date = (new Date(x));
                        var dateToString = date.toString();
                        dateToString = dateToString.substring(0,dateToString.indexOf("GMT"));

                        showTooltip(item.pageX, item.pageY,
                                    "Time: " + dateToString + "<br/>" + item.series.label + ": <b>" + y + "</b>" + (item.series.label=="Memory"?" MB":""));
                    }
                }
                else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });

            $("#placeholder").bind("plotclick", function (event, pos, item) {
                if (item) {
                    $("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label + ".");
                    plot.highlight(item.series, item.datapoint);
                }
            });
        }

        _this.refreshed();

    });
};

function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            //border: '1px solid cyan',
            padding: '2px',
            'background-color': 'lightcyan',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }
/**
 * get the legent Html for the passed text and value
 */
ServerStatsMonitor._getLegendHtml = function(text, value) {
    return "<span style='font-weight:bold;'>" + value + "</span><span style='padding-left:7px'>" + text + "</span>";
};