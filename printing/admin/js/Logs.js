/**
 * ajax show tomcat logs on server
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
		/* Initialise button "View" & add handler */
		$('button.view').button().click(function(event) {
			if (gaiSelected != ''){
				for (var i=0; i<gaiSelected.length; i++) {
					viewFile(gaiSelected[i]);
				};
			}
			return false;
		});
		
		/* Initialise button "Download" & add handler */
		$('button.download').button().click(function(event) {
			event.preventDefault();  //stop the browser from following
			if (gaiSelected != ''){
				for (var i=0; i<gaiSelected.length; i++) {
					downloadFile(gaiSelected[i]);
				};
			}
			return false;
		});		
		
		/* Initialise button "DownloadAll" & add handler */
		$('button.downloadall').button().click(function(event) {
			event.preventDefault();  //stop the browser from following
            downloadAll();
			return false;
		});

		/**
		 * View log file details 
		 */
		function viewFile(sLogFileName){
			// redirect to another page to view file
			var url = URLS.OPEN_LOG_DETAIL_PAGE(sLogFileName, 1000);
			$(location).attr('href', url);
		}
		
		/**
		 * Download log file content
		 */
		function downloadFile(sLogFileName){
			var url = URLS.DOWNLOAD_LOG_FILE(sLogFileName);
			$.download(url, 'fileName='+sLogFileName, 'POST');
		}
		
        function downloadAll(){
            var url = URLS.DOWNLOAD_ALL_LOGS();
            $.download(url, 'a=1', 'POST');
        }

		/* Draw data */
		draw();

	}
	
});


function draw(){

	var dtData = [];
	var url = URLS.GET_ALL_LOGS();
	$.getJSON(url, null, function( jsonObject ){
		$.each(jsonObject, function(){
			dtData.push([
				this.name,
				this.sizeKb,
				this.lastModified,
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

			oTableMaster = $('#table-loglist').dataTable({
				'aoColumns': [
								{sClass: ''}, /* Log File Name */
								{sClass: 'column align-right'}, /* Size Kb */
								{sClass: 'column align-center'}, /* Last Modified */
								{bVisible: false}, /* Path */
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
					$('#table-loglist tbody td').live('mouseenter', function(){ 
						$(this).parent().children().each(function(){
							$(this).addClass('datatablerowhighlight');
						});
					});
					$('#table-loglist tbody td').live('mouseleave', function(){ 
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
		$('#table-loglist tbody tr').live('click', function () {
			var aData = oTableMaster.fnGetData( this );
			var sLogFileName = aData[0];
			
			if ( $.inArray(sLogFileName, gaiSelected) == -1 ) {
				gaiSelected[gaiSelected.length++] = sLogFileName;
			} else {
				gaiSelected = $.grep(gaiSelected, function(value) {
					return value != sLogFileName;
				} );
			}
			
			$(this).toggleClass('row_selected');
		} );
		
		/* Double click event handler - equivalent to view file event */
		$('#table-loglist tbody tr').live('dblclick', function() {
			var aData = oTableMaster.fnGetData(this);
			var sLogFileName = aData[0];
			// redirect to another page to view file
			var url = URLS.OPEN_LOG_DETAIL_PAGE(sLogFileName);
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