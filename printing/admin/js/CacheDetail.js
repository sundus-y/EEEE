/**
 * Show details of a selected cache
 * 
 * @author: mbang
 */

/*
 * Initialize global variables
 */
var oTableDetail;
var gaiSelected = [];
var cacheName;

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function toggleAutoRefresh() {
	toggleAutoRefreshOnElement(this);
}

/* Formating function for row details */
function fnFormatDetails ( oTable, nTr ) {
	var aData = oTable.fnGetData( nTr );
	var indented = aData[8];
	
	var sOut = '<table class="tbl_expanding">';
	sOut += '<tr class="prettyprint"><td>'+ indented + '</td></tr>';
	sOut += '</table>';

	return sOut;
}

$(document).ready(function () {
	/* get cache name from url */
	cacheName = getUrlVars()["cacheName"];
	
	init();
	
	
	/**
	 * Initialise all 
	 */
	function init(){
		/* Initialise button "Remove" & add handler */
		$('button.remove').button().click(function(event) {
			if (gaiSelected != ''){
				for (var i = 0; i < gaiSelected.length; i++) {
					removeCacheItem(gaiSelected[i]);
				}
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
		 * Remove selected cache item
		 * @param {Object} cacheName
		 */
		function removeCacheItem(itemKey){
			$.ajax({
				data: itemKey,
				type: "POST",
				url: URLS.REMOVE_CACHE_ITEM(cacheName),
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
	
	var url = URLS.GET_CACHE_DETAILS(cacheName);
	$.getJSON(url, null, function( jsonObject ){
		$.each(jsonObject, function(){
			dtData.push([
				this.key,
				this.creationTime,
				this.expirationTime,
				this.hitCount,
				this.lastAccessed,
				this.lastUpdated,
				this.timeToLive + ' ms',
				this.objectType,	
				indentJson(JSON.stringify(this.value))
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
		if (typeof oTableDetail == 'undefined') {
			oTableDetail = $("#tbl_cachedetail").dataTable({
				aoColumns: [  
								{sClass: 'column nowrap'}, /* Item */
								{sClass: 'column align-center', sType: 'date'}, /* Creation Time */
								{sClass: 'column align-center', sType: 'date'}, /* Expiration Time */
								{sClass: 'column align-center', sType: 'numeric'}, /* Hit Count */
								{sClass: 'column align-center', sType: 'date'}, /* Last Accessed */
								{sClass: 'column align-center', sType: 'date'}, /* Last Updated */
								{sClass: 'column align-center', sType: 'numeric'}, /* Time To Live */
								{sClass: 'column align-center'}, /* Object Type*/
								{bVisible: false} /* Object Value */
							],							
				aaData: dtData,
				bPaginate: true,
				bInfo: true,
				bFilter: true,
				b$UI: true,
				iDisplayStart: 0,
				iDisplayLength: 50,
				sPaginationType: 'full_numbers',
				bLengthChange: false,
				aLengthMenu: [[50, 100, -1], [50, 100, "All"]],
				aaSorting: [[0, 'asc']],
				fnDrawCallback: function(oSettings){
					$('#tbl_cachedetail tbody td').bind('mouseenter', function(){ 
							$(this).parent().children().each(function(){
								$(this).addClass('datatablerowhighlight');
							});
						});
					$('#tbl_cachedetail tbody td').bind('mouseleave', function(){ 
							$(this).parent().children().each(function(){
								$(this).removeClass('datatablerowhighlight');
							});
						});	
				},
				fnRowCallback: function(nRow, aData, iDisplayIndex){
					return nRow;
				}
			});
		} else {
			oTableDetail.fnClearTable(0);
			$(dtData).each(function(){
				oTableDetail.fnAddData($(this));
			});
			oTableDetail.fnDraw();
		}
		
		/* Click event handler for selecting rows */
		$('#tbl_cachedetail tbody tr').live('click', function() {
			var aData = oTableDetail.fnGetData( this );
			var itemKey = aData[0];
			
			if ( $.inArray(itemKey, gaiSelected) == -1 ) {
				gaiSelected[gaiSelected.length++] = itemKey;
			} else {
				gaiSelected = $.grep(gaiSelected, function(value) {
					return value != itemKey;
				} );
			}
			
			$(this).toggleClass('row_selected');
		} );
		
		/* Dbl Click event to open details of item */
		$('#tbl_cachedetail tbody tr').live('dblclick', function() {
			var nTr = this;
			if ( $(nTr).hasClass('details_expanding') ) {
				/* This row is already open - close it */
				oTableDetail.fnClose( nTr );
			} else {
				/* Open this row */
				oTableDetail.fnOpen( nTr, fnFormatDetails(oTableDetail, nTr), 'details' );
				$('#tbl_expanding tr').each(function(){
					this.prettyPrint();
				});
			}
						
			$(nTr).toggleClass('details_expanding');
		});
	}

	
	/**
	 * Get the rows which are currently selected
	 * @param {Object} oTableDetailLocal
	 */
	function fnGetSelected( oTableDetailLocal ) {
		var aReturn = new Array();
		var aTrs = oTableDetailLocal.fnGetNodes();
		
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
