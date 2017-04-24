/**
 * get the service location
 * @param url to get location for
 * @returns service url
 */
function service(url) {
    return '../services/monitoring/' + url + '.xml';
}

function setClass(e, className) {
	if (e) e.className = className;
}

function gotoPage(url, message) {
	var e = document.getElementById('divTheContent');
	if (e) {
		e.innerHTML = '<div style="margin-left:23px;"><h3>' + message + '</h3><br/><p>Please wait...</p></div>';
	}
	window.location = url;
}

var intervalId;

/**
 * Toggle auto refresh
 */
function toggleAutoRefreshOnElement(elementClassName){

	var autoRefresh = $('#refreshButton').text() == 'ON';
	autoRefresh = !autoRefresh;
	if (autoRefresh == true){
		$('#refreshButton').text('ON');
		$('#refreshButton').removeClass('toggleAutoRefreshOff');
		$('#refreshButton').addClass('toggleAutoRefreshOn');
		
		/* Auto refresh every 20 seconds */
		intervalId = setInterval(function(){
			elementClassName.draw();
		}, 20000); 
		
	} else {
		$('#refreshButton').text('OFF');
		$('#refreshButton').removeClass('toggleAutoRefreshOn');
		$('#refreshButton').addClass('toggleAutoRefreshOff');
		
		clearInterval(intervalId);
	}
	
}

/**
 * Get URL path parameters
 * @returns {Array}
 */
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