
/*
 * Initialize global variables
 */
var oTable;
var includeoverriden;

function toggleAutoRefresh() {
	toggleAutoRefreshOnElement(this);
}

$(document).ready(function () {

	/* get parameters from url */
	includeoverriden = getUrlVars()["includeoverriden"];
	if (includeoverriden == 'undefined') {
		includeoverriden = false;
	}
	
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
	
	/* Pull disk cache items data and render into table */
	var dtData = [];
	var url = URLS.GET_SETTINGS(includeoverriden);
	$.getJSON(url, null, function( jsonObject ){
		$.each(jsonObject, function(){
			dtData.push([
				this.name,
				this.value
			]);
		});	
		
		/* Initialise data table */
		if (dtData){
			initTable(dtData);
		}
	});
	
	
	/**
	 * Initialise data table with ready to render data
	 * @param {Object} dtData
	 */
	function initTable(dtData){
	
		/* Init the table */
		if (typeof oTable == 'undefined') {
			oTable = $("#table-properties").dataTable({
				aoColumns: [{sClass: ''},
				            {sClass: ''}], 
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
				aaSorting: [[0, 'asc']],
				fnDrawCallback: function(oSettings){
					$('#table-properties tbody td').bind('mouseenter', function(){
						$(this).parent().children().each(function(){
							$(this).addClass('datatablerowhighlight');
						});
					});
					$('#table-properties tbody td').bind('mouseleave', function(){
						$(this).parent().children().each(function(){
							$(this).removeClass('datatablerowhighlight');
						});
					});
				},
				fnRowCallback: function(nRow, aData, iDisplayIndex){
					return nRow;
				}
			});
			
		}
		else {
			oTable.fnClearTable(0);
			$(dtData).each(function(){
				oTable.fnAddData($(this));
			});
			oTable.fnDraw();
		}
		
	}
	
}  // end draw()
