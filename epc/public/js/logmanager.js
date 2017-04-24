
function setRowClass(className, rowNum) {
	var names = new Array();	
	names.push('Image');
	names.push('Level');
	names.push('Package');	
	names.push('Info');
	names.push('Debug'); 
	names.push('Trace');
	names.push('Inherit');
	
	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;	
	}
}

var autoRefresh = false;
var reloadInterval = 1000;
var timeToReload = 20;
var jspName = "logmanager.jsp";

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



function setLogLevel(logName, level, cell) {
	var e = document.getElementById(cell);
	if (e) {
		e.innerHTML = 'Setting Level...';
	}
	window.location = jspName + "?action=setlevel&level=" + level + "&log=" + logName;
}
