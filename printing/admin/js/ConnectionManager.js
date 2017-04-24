/**
 * This script is calling connection management web service then rendering data into data table 
 * defined in 'connectionmanager.html'
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


/* Formating function for row details */
function fnFormatDetails ( oTable, nTr ) {
    var aData = oTable.fnGetData( nTr );
    var indented = aData[5];
    var sOut = '<table class="tbl_expanding">';
    sOut += '<tr class="prettyprint"><td>'+ indented + '</td></tr>';
    sOut += '</table>';

    return sOut;
}


$(document).ready(function (){
    draw();
});

function draw(){
    var dtData = [];
    var url = URLS.GET_ALL_CONNECTIONS();
    $.getJSON(url, null, function( jsonObject ){
        $.each(jsonObject, function(){
        	var dataSourceConfig;
        	if (this.dataSourceConfiguration){
        		dataSourceConfig = indentJson(JSON.stringify(this.dataSourceConfiguration));
        	}
        	
            dtData.push([
                this.name,
                this.type,
                this.state,
                this.currentStateDuration,
                this.lastException,
                dataSourceConfig
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
            oTableMaster = $("#tbl_connlist").dataTable({
                'aoColumns': [
                                {sClass: ''}, /* Connection Name */
                                {sClass: 'column align-center'}, /* Connection Type */
                                {sClass: 'column align-center'}, /* Connection State */
                                {sClass: 'column align-center'}, /* Current State Duration */
                                {sClass: 'column align-center'}, /* Last Exception */
                                {bVisible: false} /* Configuration details */
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
                	
                    $('#tbl_connlist tbody td').bind('mouseenter', function(){ 
                            $(this).parent().children().each(function(){
                                $(this).addClass('datatablerowhighlight');
                            });
                        });

                    $('#tbl_connlist tbody td').bind('mouseleave', function(){ 
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
        $('#tbl_connlist tbody tr').live('click', function () {
            var aData = oTableMaster.fnGetData( this );
            var sConnectionName = aData[0];
            if ( $.inArray(sConnectionName, gaiSelected) == -1 ) {
                gaiSelected[gaiSelected.length++] = sConnectionName;
            } else {
                gaiSelected = $.grep(gaiSelected, function(value) {
                    return value != sConnectionName;
                } );
            }
            $(this).toggleClass('row_selected');

        } );

        

        /* Double click event handler */
        $('#tbl_connlist tbody tr').live('dblclick', function() {
            var nTr = this;
            if ( $(nTr).hasClass('details_expanding') ) {
                /* This row is already open - close it */
                oTableMaster.fnClose( nTr );
            } else {
                /* Open this row */
                oTableMaster.fnOpen( nTr, fnFormatDetails(oTableMaster, nTr), 'details' );
                $('#tbl_expanding tr').each(function(){
                    this.prettyPrint();
                });
            }
            $(nTr).toggleClass('details_expanding');            
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
