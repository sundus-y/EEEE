
function setRowClass(className, rowNum) {
	var names = new Array();
	names.push('Image');
	names.push('Component');
	names.push('Location');
	names.push('Port');	
	names.push('Ping');
	names.push('Version'); 
	names.push('Type');
	names.push('PingAction');
	names.push('UnregisterAction');
	
	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;	
	}
}

var autoRefresh = false;
var reloadInterval = 1000;
var timeToReload = 20;
var jspName = "componentRegistryManager.jsp";

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


function pingAllRegistrations() {
	var e = document.getElementById('divTheContent');
	if (e) {
		e.innerHTML = '<img src="resources/public/images/progress.gif" /><b>Pinging all Registrations, please wait...</b>';
		window.location = jspName + "?action=pingallreg";
	} else {
		alert('Could not Ping all Registrations\n\nPage Failure - please reload this page!!');
	}
}


function pingRegistration(name, location, port, type, version) {
	var e = document.getElementById('divTheContent');
	if (e) {
		e.innerHTML = '<img src="resources/public/images/progress.gif" /><b>Pinging Registration [' + name + '] at ' + location + ':' + port + ', please wait...</b>';
		window.location = jspName + "?action=ping&component=" + name + "&type=" + type + "&location=" + location + "&port=" + port + "&version=" + version;
	} else {
		alert('Could not Ping Registration\n\nPage Failure - please reload this page!!');
	}
}

function unregisterRegistration(name, location, port, type, version) {
	var e = document.getElementById('divTheContent');
	if (e) {
		e.innerHTML = '<img src="resources/public/images/progress.gif" /><b>Removing Registration [' + name + '] for: ' + location + ':' + port + ', please wait...</b>';
		window.location = jspName + "?action=unregister&component=" + name + "&type=" + type + "&location=" + location + "&port=" + port + "&version=" + version;
	} else {
		alert('Could not Ping Registration\n\nPage Failure - please reload this page!!');
	}
}

function restartRmiServer() {
	if (confirm('Click OK to Confirm you want to Restart the RMI Server\n\nNB: This will clear ALL existing registrations, and reissue all registrations')) {
		var e = document.getElementById('divTheContent');
		if (e) {
			e.innerHTML = '<img src="resources/public/images/progress.gif" /><b>Restarting the RMI Server, please wait...</b>';
			window.location = jspName + "?action=restartrmi";
		} else {
			alert('Could not Restart the RMI Server\n\nPage Failure - please reload this page!!');
		}	
	}
}
		