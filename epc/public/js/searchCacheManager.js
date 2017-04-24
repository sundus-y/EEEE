
function setRowClass(className, rowNum) {
	var names = new Array();
	names.push('Image');
	names.push('Name');
	names.push('Status');
    names.push('Loading');
	names.push('Note');
	names.push('Switch');
	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;
	}
}

var autoRefresh = false;
var reloadInterval = 1000;
var timeToReload = 20;
var jspName = "searchCacheManager.jsp";

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
				window.location = jspName;
			}
		}
	}
}



