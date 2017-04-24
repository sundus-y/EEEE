/**
 * Show content of selected log file
 * 
 * @author: mbang
 */

/*
 * Initialize global variables
 */
var oTableDetail;
var fileName;
var rowCount;

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

$(document).ready(function () {
	/* get file name from url */
	fileName = getUrlVars()['fileName'];
	rowCount = getUrlVars()['rowCount'];
	init();
	
	/**
	 * Initialise all 
	 */
	function init(){	
		/* Initialise button "Quick View" & add handler */
		$('button.view').button().click(function(event) {
			rowCount = 1000;
			// redirect to another page to view file
			var url = URLS.OPEN_LOG_DETAIL_PAGE(fileName, rowCount);
			$(location).attr('href', url);
		});
		/* Initialise button "View Whole File" & add handler */
		$('button.viewAll').button().click(function(event) {
			rowCount = 0;
			// redirect to another page to view file
			var url = URLS.OPEN_LOG_DETAIL_PAGE(fileName, rowCount);
			$(location).attr('href', url);
		});
		
		/* Draw data */	
		draw();
	}
});

/**
 * Draw UI elements
 */	
function draw(){

	var dtData = [];
	var startRow = 0;
	if (typeof rowCount == 'undefined'){
		rowCount = 1000;
	} 
	var url = URLS.VIEW_LOG_DETAILS(startRow, rowCount);
	if (rowCount == 0){
		url = URLS.VIEW_ALL_LOG_DETAILS();
	}
	
	$.post(url, fileName, function(jsonObject){
		var id = 1;
		$.each(jsonObject, function(){
			var fullDescription = this.description;
			var brief = fullDescription;
			var hasMoreDetails = false;
			if (fullDescription && fullDescription.length > 120) {
				brief = fullDescription.substring(0, 120);
				hasMoreDetails = true;
			}
			var divId = 'detailhtml' + id;
			var tdHtml = brief;
			if (hasMoreDetails) {
				tdHtml = brief + "<img class=\"arrow\" src=\"\"/>" +
						"<div id=\"" + divId + "\" class=\"showdetails\"></div>";
			}
			
			dtData.push([this.eventDateTime, this.className, this.eventType, tdHtml, fullDescription, divId]);
			
			id++;
		});
		
		/* Initialise data table */
		if (dtData){
			initTable(dtData, startRow, rowCount);	
		}
		
	}, "json");
	
	
	/**
	 * Initialise data table with ready to render data
	 * @param {Object} dtData
	 */
	function initTable(dtData, startRow, rowCount){
	
		/* Init the table */
		if (typeof oTableDetail == 'undefined') {
			oTableDetail = $("#table-logdetail").dataTable({
				aoColumns: [{
					sClass: 'column nowrap'
				}, /* Event Date/Time */ {
					sClass: 'column nowrap'
				}, /* Class Name */ {
					sClass: 'column nowrap'
				}, /* Event Type */ {
					sClass: 'column wrap-breakword'
				}, /* Description */ {
					sClass: 'column wrap-breakword',
					bVisible: false
				}, {
					sClass: 'column wrap-breakword',
					bVisible: false
				}],
				aoColumnDefs: [{
					bSortable: false,
					aTargets: [3]
				}],
				aaData: dtData,
				bPaginate: true,
				bInfo: true,
				bFilter: true,
				b$UI: true,
				iDisplayStart: startRow,
				iDisplayLength: 25,
				sPaginationType: 'full_numbers',
				bLengthChange: true,
				aLengthMenu: [[25, 50, 100, -1], [25, 50, 100, "All"]],
				aaSorting: [[0, 'desc']],
				fnDrawCallback: function(oSettings){
					$('#table-logdetail tbody td').bind('mouseenter', function(){
						$(this).parent().children().each(function(){
							$(this).addClass('datatablerowhighlight');
						});
					});
					$('#table-logdetail tbody td').bind('mouseleave', function(){
						$(this).parent().children().each(function(){
							$(this).removeClass('datatablerowhighlight');
						});
					});
				},
				fnRowCallback: function(nRow, aData, iDisplayIndex){
					return nRow;
				}
			});
			
		    $('#table-logdetail tr').live('dblclick', function(){
		    	var fullDescription = oTableDetail.fnGetData(this)[4];
				var divId = oTableDetail.fnGetData(this)[5];
		        if ($(this).find('.showdetails').hasClass('hide')){ // hide
		        	$('#' + divId).html("");
		        } else { // show
					$('#' + divId).html("<h4>Details</h4>" + fullDescription);
		        }
		        $(this).find('.showdetails').toggleClass('hide');
		    });
		}
		else {
			oTableDetail.fnClearTable(0);
			$(dtData).each(function(){
				oTableDetail.fnAddData($(this));
			});
			oTableDetail.fnDraw();
		}
		
	}
	
}  // end draw()
