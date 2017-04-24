
function setRowClass(className, rowNum) {
	var names = new Array();
	names.push('Image');
	names.push('Name');	
	names.push('Type'); 
	names.push('State'); 
	names.push('TimeInState'); 
	names.push('LastErr');
	names.push('Notes');
	names.push('ForceRecheck');
	names.push('InvertWatch');
	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;	
	}
}

var autoRefresh = true;
var reloadInterval = 1000;
var timeToReload = 20;
var jspName = "Dashboard.jsp";

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



function checkConnection(connectionName, cell) {
	var e = document.getElementById(cell);
	if (e) {
		e.innerHTML = 'Checking now...';
	}
	window.location = jspName + "?action=check&connection=" + connectionName + (configurationName.value!=""?"&"+getConfigurationNameParameter():"");
}

function getConfigurationNameParameter() {
    return "configurationName=" + configurationName.value;
}
function selectConfiguration() {
    window.location = jspName + "?" + getConfigurationNameParameter();
}

function invertWatch(connectionName, cell) {
	var e = document.getElementById(cell);
	if (e) {
		e.innerHTML = 'working...';
	}
	window.location = jspName + "?action=invertwatch&connection=" + connectionName;
}
