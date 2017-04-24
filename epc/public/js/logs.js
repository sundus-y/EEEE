
function setRowClass(className, rowNum) {
	var names = new Array();
	names.push('Name');
	names.push('Size');	
	names.push('Date'); 
	names.push('Download');
	names.push('Open');
	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;	
	}
}

var autoRefresh = false;
var reloadInterval = 1000;
var timeToReload = 20;
var jspName = 'log.jsp';

function getWindowURL() {
	var url = jspName;	
	return url;
}

function switchAutoRefresh(preventSwitch) {
	if (!preventSwitch) {
		 autoRefresh = !autoRefresh;
	}
	
	var e = document.getElementById('refreshButton');
	if (autoRefresh) {
		e.style.backgroundColor='green';
		e.style.color='white';
		e.innerHTML='ON';
	} else {
		e.style.backgroundColor='maroon';
		e.style.color='white';
		e.innerHTML='OFF';
	}
}

function executeUpdateTimer() {	
	if (autoRefresh) {	
//		alert(timeToReload + " secs");
		var e = document.getElementById('refreshIn');
		if (e) {
			timeToReload--;
			if (timeToReload > 0) {
				e.innerHTML = timeToReload + " secs";
			} else {
				e.innerHTML = "reloading...";
				window.location = getWindowURL();
			}
		}
	}
}



function forceRefresh() {
	var e = document.getElementById('forceRefresh');
	e.innerHTML = "refreshing...";
	var url = getWindowURL();
	//alert(url);
	window.location = url;
}



function gotoPage(url, message) {
	var e = document.getElementById('divTheContent');
	if (e) {
		e.innerHTML = '<div style="margin-left:23px;"><h3>' + message + '</h3><br/><p>Please wait...</p></div>';
	}
	window.location = url;
}
