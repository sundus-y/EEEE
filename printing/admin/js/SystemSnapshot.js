/**
 * This script is calling system snapshot web service then rendering data into data table 
 * defined in 'index.html'
 * 
 * @author: mbang
 */

$(document).ready(function (){
	
	/* Shows system snapshot */
    var systemsnapshot_url = URLS.GET_SYSTEM_SNAPSHOT();
    $.getJSON(systemsnapshot_url, null, function( jsonObject ){
    	$("#tdUsedMem").html(jsonObject.freeTotalMemoryMb);
    	$("#tdFreeMem").html(jsonObject.usedMemoryMb);
    	$("#tdCurrentAlloMem").html(jsonObject.allocatedMemoryMb);
    	$("#tdMaxMem").html(jsonObject.maximumMemoryMb);
    	$("#tdTotalGCTime").html(jsonObject.totalGCTime);
      	$("#tdTotalProccesors").html(jsonObject.totalProcessors);
      	$("#tdNumExecThreads").html(jsonObject.numExecutingThreads);
    });
    
    /* Shows server snapshot, currently only displays server uptime */
    var serversnapshot_url = URLS.GET_SERVER_SNAPSHOT();
    $.getJSON(serversnapshot_url, null, function( jsonObject ){
    	$("#tdHours").html(jsonObject.upTimeHours);
    	$("#tdMinutes").html(jsonObject.upTimeMinutes);
    	$("#tdSeconds").html(jsonObject.upTimeSeconds);
    	$("#tdSince").html(jsonObject.upTimeSince);
    });
    
    /* Initialise button "LOOKUP" & add handler */
	$('button.lookup').button().click(function(event) {
	    var settingFullpath = $("input#txSettingFullPath").attr("value");
	    var settingLookup_url = URLS.LOOKUP_SETTING(settingFullpath);
	    $.post(settingLookup_url, settingFullpath, function( jsonObject ){
	    	$("input#txSettingValue").val(jsonObject.value);
	    });
	});

    /* Initialise button "VIEW CONFIG" & add handler */
	$('button.viewConfig').button().click(function(event) {
		var url = URLS.OPEN_CONFIG_PAGE(false);
		$(location).attr('href', url);
	});
});

    