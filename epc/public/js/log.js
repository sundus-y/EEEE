
function setRowClass(className, rowNum) {
	var names = new Array();
	names.push('Date');
	names.push('Type');	
	names.push('Class'); 
	names.push('Message'); 	
	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;	
	}
	
	// Also change the Show/Hide Row (if hidden)
	var e1 = document.getElementById('tdInvert_' + rowNum + 'a');
	if (e1 != null && e1.innerHTML.indexOf("Show") > -1) {
		if (className.indexOf('Over') > -1) {
			setRowClass1('logFileOpenCloseCellOver', rowNum + 'a');			
		} else {
			setRowClass1('logFileOpenCloseCell', rowNum + 'a');
		}
	}
}

function setRowClass1(className, rowNum) {
	var names = new Array();
	names.push('Invert');
	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;	
	}	
}


function setLogsRowClass(className, rowNum) {
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

var qStringValues = new Array();
var query = window.location.search.substring(1);
var vars = query.split("&");
for(var i=0; i< vars.length;i++) {
	if (vars[i].indexOf('file=') > -1) {
		jspName = jspName + "?" + vars[i];
		break;
	}
}

function getWindowURL() {
	var url = jspName;
	
	// get event filter
	var ef = document.getElementById('typeSelect');
	if (ef) {
		var efVal = ef.value;
		if (efVal != '0') {
			url = url + '&typefilter=' + efVal;
		}
	}
	// get package filter
	var pf = document.getElementById('packageSelect');
	if (pf) {
		var pfVal = pf.value;
		if (pfVal != 'NONE') {
			url = url + '&packagefilter=' + pfVal;
		}
	}
	// get message filter
	var mf = document.getElementById('messageInput');
	if (mf) {
		var mfVal = mf.value;
		if (mfVal != '') {
			url = url + '&messagefilter=' + mfVal;
		}
	}
	// get sortby
	var sb = document.getElementById('sortSelect');
	if (sb) {
		var sbVal = sb.value;
		if (sbVal != '') {
			url = url + '&sortby=' + sbVal;
		}
	}
	
	// get Remove Filtered Check Value
	var sb = document.getElementById('removeFilteredCheckbox');
	if (sb) {		
		if (sb.checked == true) {
			url = url + '&removefiltered=1';
		}
	}
	
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

function invertEventVisibility(rowNum) {
	var e= document.getElementById('tdInvert_' + rowNum + 'a');
	if (e) {
		if (e.innerHTML.indexOf("Hide") > -1) {
			e.innerHTML = "Show this event";
			setRowCellsVisibility(rowNum, "none");
		} else {
			e.innerHTML = "Hide this event";
			setRowCellsVisibility(rowNum, "block");
		}
	}
}

function invertEventVisibilityIfHidden(rowNum) {
	var e= document.getElementById('tdInvert_' + rowNum + 'a');
	if (e) {
		if (e.innerHTML.indexOf("Show") > -1) {
			setRowCellsVisibility(rowNum, "block");
		}
	}
}

function setRowCellsVisibility(rowNum, visVal) {
	var names = new Array();
	names.push('Date');
	names.push('Type');	
	names.push('Class'); 
	names.push('Message'); 	
	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('div' + name + '_' + rowNum);
		if (e) {
			e.style.display = visVal;
		}
	}
}

function showAllEvents() {
	for(i=0; i < totalEvents; i++) {
		var e= document.getElementById('tdInvert_' + i + 'a');
		e.innerHTML = "Hide this event";
		setRowCellsVisibility(i, "block");
	}
}


function hideAllEvents() {
	for(i=0; i < totalEvents; i++) {
		var e= document.getElementById('tdInvert_' + i + 'a');
		e.innerHTML = "Show this event";
		setRowCellsVisibility(i, "none");
	}
}

function showHideDiv(divName) {
	var e = document.getElementById(divName);
	if (e) {
		if (e.style.display == 'none') {
			e.style.display = 'block';
		} else e.style.display = 'none';
	}
}