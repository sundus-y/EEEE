/**
 * This script is calling cache management web service then rendering data into data table 
 * defined in 'cachemanager.html'
 * 
 * @author: mbang
 */


/*
 * Initialize global variables
 */
var oTableMaster;
var gaiSelected = [];
	
function toggleAutoRefresh() {
	toggleAutoRefreshOnElement(this);
}

$(document).ready(function (){

	init();

	/**
	 * Initialise all 
	 */
	function init(){
		/* Initialise button "Flush" & add handler */
		$('button.flush').button().click(function(event) {
			if (gaiSelected != ''){
				for (var i=0; i<gaiSelected.length; i++) {
					flushCache(gaiSelected[i]);
				};
				// reset row selection
				for (var i=0; i<gaiSelected.length; i++) {
					gaiSelected[i] = '';
				};
			}
			return false;
		});
		
		/* Initialise button "Flush All" & add handler */
		$('button.flushall').button().click(function(event) {
			flushAll();
			if (gaiSelected != ''){			
				// reset row selection
				for (var i=0; i<gaiSelected.length; i++) {
					gaiSelected[i] = '';
				};
			}
			return false;
		});	
		
		/* Draw data */	
		draw();
		
		
		/**
		 * Flush selected cache
		 * @param {Object} cacheName
		 */
		function flushCache(sCacheName){
			$.ajax({
				type: "GET",
				url: URLS.FLUSH_CACHE(sCacheName),
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
		
		/**
		 * Flush all caches
		 */
		function flushAll(){
			$.ajax({
				type: "GET",
				url: URLS.FLUSH_ALL_CACHES(),
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

	var dtData = [];
	var url = URLS.GET_ALL_CACHES();
	$.getJSON(url, null, function( jsonObject ){
		$.each(jsonObject, function(){
			dtData.push([
				this.name,
				this.objectCount,
				this.inMemoryHits,
				this.onDiskHits,
				this.totalHits,
				this.averageGetTime
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
								{sClass: 'column align-center'}, /* Object Count */
								{sClass: 'column align-center'}, /* In Memory Hits */
								{sClass: 'column align-center'}, /* On Disk Hits */
								{sClass: 'column align-center'}, /* Total Hits */
								{sClass: 'column align-center'} /* Average Get Time */
							],
				'aaData': dtData,
				'bPaginate': true,
				'bInfo': true,
				'bFilter': true,
				'b$UI': true,
				'iDisplayLength': 50,
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
			var sCacheName = aData[0];
			
			if ( $.inArray(sCacheName, gaiSelected) == -1 ) {
				gaiSelected[gaiSelected.length++] = sCacheName;
			} else {
				gaiSelected = $.grep(gaiSelected, function(value) {
					return value != sCacheName;
				} );
			}
			
			$(this).toggleClass('row_selected');
		} );
		
		/* Double click event handler */
		$('#tbl_cachelist tbody tr').live('dblclick', function() {
			var aData = oTableMaster.fnGetData(this);
			var sCacheName = aData[0];
			// redirect to another page to open cache
			var url = URLS.OPEN_CACHE_DETAIL_PAGE(sCacheName);
			$(location).attr('href', url);
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

