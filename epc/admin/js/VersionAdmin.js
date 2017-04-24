/**
 * This script is calling api version web service then rendering data into data table 
 * defined in 'index.html'
 * 
 * @author: mbang
 */
$(document).ready(function (){
    var url = URLS.GET_VERSIONS();
    $.getJSON(url, null, function( jsonObject ){
    	$('#versionDesc').html(jsonObject.specificationTitle 
				+ ', Version ' + jsonObject.specificationVersion 
				+ ', Build ' + jsonObject.build);
    });
    
});
