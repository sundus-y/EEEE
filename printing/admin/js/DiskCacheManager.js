/**
 * This script is calling disk cache management web service then rendering data into data table 
 * defined in 'diskcachemanager.html'
 * 
 * @author: mbang
 */


/*
 * Initialize global variables
 */
var oTableMaster;
var gaiSelected = [];
var fullpath;

function toggleAutoRefresh() {
	toggleAutoRefreshOnElement(this);
}

$(document).ready(function (){

	/* get parameters from url */
	fullpath = getUrlVars()["fullpath"];
	
	init();

	/**
	 * Initialise all 
	 */
	function init(){

		$('button.flush').button().click(function(event) {
			$('#selector').html(fullpath);
			if (fullpath != '' && fullpath != 'undefined') {
				flushCache(fullpath);
			} else {
				$("#errorMessage").html('No cache is selected!');
			}
			// reset row selection
			for (var i=0; i<gaiSelected.length; i++) {
				gaiSelected[i] = '';
			};
			
			return false;
		});
		
		$('button.flush').button().click().confirm({
			msg: 'Are you sure to flush the selected cache (look in status bar)?    ',
			stopAfter: 'ok',
			eventType:'click',
			timeout: 7000,  // 7 seconds
			buttons: {
				ok: 'Yep',
				cancel: 'Nope',
				separator: '  |  '
			}
		});
		
		/* Initialise button "Run Janitor" & add handler */
		$('button.janitor').button().click(function(event) {
			$.ajax({
				type: "GET",
				url: URLS.RUN_DISK_CACHE_JANITOR(),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(response){
					$("#schedule").html(response.scheduleAgenda);
					$("#status").html(response.statusMessage);
					fullpath = 'undefined';
					draw();
				},
				error: function(errMsg){
					$("#errorMessage").html(errMsg);
				}
			});
			return false;
		});	
		
		/* Draw data */	
		draw();
		
		
		/**
		 * Flush selected cache
		 * @param {Object} cacheName
		 */
		function flushCache(path){
			$.ajax({
				type: "GET",
				url: URLS.FLUSH_DISK_CACHE(path),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(response){
					draw();
				},
				error: function(errMsg){
					$("#errorMessage").html(errMsg);
				}
			});
		}
		
	}
	
});


function draw(){

	/* Display schedule details */
	var scheduleInfoUrl = URLS.GET_DISK_CACHE_STATS();
	$.getJSON(scheduleInfoUrl, null, function( jsonObject ){
		$("#schedule").html(jsonObject.scheduleAgenda);
		$("#status").html(jsonObject.statusMessage);
	});
	
	/* Pull disk cache items data and render into table */
	var dtData = [];
	var url = URLS.GET_DISK_CACHES_DATA(fullpath);
	$.getJSON(url, null, function( jsonObject ){
		$.each(jsonObject, function(){
			dtData.push([
				this.name,
				this.sizeInKB,
				this.lastAccessed,
				this.path
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
		if (typeof oTableMaster == 'undefined') {

			oTableMaster = $("#tbl_cachelist").dataTable({
				'aoColumns': [
								{sClass: ''}, /* Cache Name */
								{sClass: 'column align-center'}, /* Size */
								{sClass: ''}, /* Last accessed timestamp */
								{bVisible: false} /* Full path */
							],
				'aaData': dtData,
				'bPaginate': true,
				'bInfo': true,
				'bFilter': true,
				'b$UI': true,
				'iDisplayLength': 100,
				'bLengthChange': false,
				'aaSorting': [[0, "asc"]],
				'fnDrawCallback': function(oSettings){
					$('#tbl_cachelist tbody td').bind('mouseenter', function(){ 
							$(this).parent().children().each(function(){
								$(this).addClass('datatablerowhighlight');
							});
						});
					$('#tbl_cachelist tbody td').bind('mouseleave', function(){ 
							$(this).parent().children().each(function(){
								$(this).removeClass('datatablerowhighlight');
							});
						});	
				},
				'fnRowCallback': function(nRow, aData, iDisplayIndex){
					return nRow;
				}
			});
		} else {
			oTableMaster.fnClearTable(0);
			$(dtData).each(function(){
				oTableMaster.fnAddData($(this));
			});
		}
		
		/* Click event handler */
		$('#tbl_cachelist tbody tr').live('click', function () {
			var aData = oTableMaster.fnGetData( this );
			fullpath = aData[3];
			$('#selector').html(fullpath);
			if ( $.inArray(fullpath, gaiSelected) == -1 ) {
				gaiSelected[gaiSelected.length++] = fullpath;
			} else {
				gaiSelected = $.grep(gaiSelected, function(value) {
					return value != fullpath;
				} );
			}
			
			$(this).toggleClass('row_selected');
		} );
		
		/* Double click event handler */
		$('#tbl_cachelist tbody tr').live('dblclick', function() {
			var aData = oTableMaster.fnGetData(this);
			fullpath = aData[3];
			$('#selector').html(fullpath);
			draw();
		});
	}

	
	/**
	 * Get the rows which are currently selected
	 * @param {Object} oTableMasterLocal
	 */
	function fnGetSelected( oTableMasterLocal ) {
		var aReturn = new Array();
		var aTrs = oTableMasterLocal.fnGetNodes();
		
		for ( var i=0 ; i<aTrs.length ; i++ )
		{
			if ( $(aTrs[i]).hasClass('row_selected') )
			{
				aReturn.push( aTrs[i] );
			}
		}
		return aReturn;
	}
	
}

