
/*
 * Initialize global variables
 */
var oTableLoggers;
var loggerName;

function toggleAutoRefresh() {
	toggleAutoRefreshOnElement(this);
}

$(document).ready(function () {

	init();
	
	
	/**
	 * Initialise all 
	 */
	function init(){			
		/* Draw data */	
		draw();
	}
});

/**
 * Draw UI elements
 */	
function draw(){

	var dtData = [];
	var url = URLS.GET_LOGGER_SETTINGS();
	
	$.get(url, function(jsonObject){
		var id = 1;
		
		$.each(jsonObject, function(){
			var level = '';
			if (this.inherited){
				level = '(Inherited) ';
			} 
			
			var infoChecked = '';
			var debugChecked = '';
			var traceChecked = '';
			var inheritChecked = '';
			var levelColor = 'yellow';
			if (this.level == 'INFO'){
				infoChecked = 'CHECKED';
			} else if (this.level == 'DEBUG'){
				debugChecked = 'CHECKED';
				levelColor = 'green';
			} else if (this.level == 'TRACE'){
				traceChecked = 'CHECKED';
				levelColor = 'red';
			} else if (this.level == 'INHERIT'){
				inheritChecked = 'CHECKED';
			}
			
			dtData.push(["<div class='" + levelColor + "'>", level + this.level, this.name, 
			             "<input type='radio' name='" + id + "' value='INFO-" + this.name + "'" + infoChecked + "/>",
			             "<input type='radio' name='" + id + "' value='DEBUG-" + this.name + "'" + debugChecked + "/>",
			             "<input type='radio' name='" + id + "' value='TRACE-" + this.name + "'" + traceChecked + "/>",
			             "<input type='radio' name='" + id + "' value='INHERIT-" + this.name + "'" + inheritChecked + "/>",
			             ]);
			
			id++;
		});
		
		/* Initialise data table */
		if (dtData){
			initTable(dtData);	
		}
		
	}, "json");
	
	
	/**
	 * Initialise data table with ready to render data
	 * @param {Object} dtData
	 */
	function initTable(dtData){
	
		/* Init the table */
		if (typeof oTableLoggers == 'undefined') {
			oTableLoggers = $("#table-loggers").dataTable({
				aoColumns: [{
					sClass: 'column nowrap'
				}, /* Level Icon */ {
					sClass: 'column align-right nowrap'
				}, /* Log Level */ {
					sClass: 'column nowrap'
				}, /* Package */ {
					sClass: 'column align-center nowrap'
				}, /* Set as INFO */ {
					sClass: 'column align-center nowrap'
				}, /* Set as DEBUG */ {
					sClass: 'column align-center nowrap'
				}, /* Set as TRACE */ {
					sClass: 'column align-center nowrap'
				}], /* Set as INHERIT */ 
				aoColumnDefs: [{
					bSortable: false,
					aTargets: [0,3,4,5,6]
				}],
				aaData: dtData,
				bPaginate: true,
				bInfo: true,
				bFilter: true,
				b$UI: true,
				iDisplayStart: 0,
				iDisplayLength: 50,
				sPaginationType: 'full_numbers',
				bLengthChange: true,
				aLengthMenu: [[50, 100, -1], [50, 100, "All"]],
				aaSorting: [[2, 'asc']],
				fnDrawCallback: function(oSettings){
					$('#table-loggers tbody td').bind('mouseenter', function(){
						$(this).parent().children().each(function(){
							$(this).addClass('datatablerowhighlight');
						});
					});
					$('#table-loggers tbody td').bind('mouseleave', function(){
						$(this).parent().children().each(function(){
							$(this).removeClass('datatablerowhighlight');
						});
					});
				},
				fnRowCallback: function(nRow, aData, iDisplayIndex){
					return nRow;
				}
			});
			
		    $('#table-loggers tbody td').live('click', function(){
		    	var inputElement = this.children[0];
		    	if (inputElement && inputElement.value && inputElement.value != 'undefined'){
			    	var tokens = inputElement.value.split('-');
			    	var level = tokens[0];
			    	var logger = tokens[1];
			    	var url = URLS.SET_LOGGER_LEVEL(level);

                    var divElement = $(this).parent().find('div');
                    var tdElement = $(this).parent().children('td').eq(1);

			    	$.post(url, logger, function(jsonObject){

                        divElement.removeClass();
                        tdElement.text(level);

                        if (level == 'INFO') {
                            divElement.addClass('yellow');
                        } else if (level == 'DEBUG') {
                            divElement.addClass('green');
                        }else if (level == 'TRACE') {
                            divElement.addClass('red');
                        }else if (level == 'INHERIT') {
                            divElement.addClass('yellow');
                        }

                    });
		    	}
		    });
		}
		else {
			oTableLoggers.fnClearTable(0);
			$(dtData).each(function(){
				oTableLoggers.fnAddData($(this));
			});
			oTableLoggers.fnDraw();
		}
		
	}
	
}  // end draw()
