
function setRowClass(className, rowNum) {
	var names = new Array();
	names.push('Name');
	names.push('Count');
	names.push('Size');
	names.push('Hits');
	names.push('Accuracy');
	names.push('Open');
	names.push('QF');

	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;
	}
}

function setRowClass1(className, rowNum) {
	var names = new Array();
	names.push('Key');
	names.push('CreationTime');
	names.push('ExpirationTime');
	names.push('HitCount');
	names.push('LastAccess');
	names.push('LastUpdate');
	names.push('TimeToLive');
	names.push('Type');
	names.push('Val');
	names.push('QF');

	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;
	}
}


var autoRefresh = false;
var reloadInterval = 1000;
var timeToReload = 20;
var jspName = "cachemanager.jsp";

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

function openCache(cache) {
	window.location = jspName + "?action=open&cache=" + cache;
}

function quickFlush(cache) {
	if (confirm('Are you sure you want to flush the "' + cache + '" cache?\n\nWARNING: THIS WILL REMOVE ALL OBJECTS FROM THIS CACHE!')) {
		window.location = jspName + "?action=qf&cache=" + cache;
	}
}

function flushAll() {
	if (confirm('Are you sure you want to flush all the caches in this list?\n\nWARNING: THIS WILL REMOVE ALL OBJECTS FROM ALL CACHE!')) {
		window.location = jspName + "?action=fa";
	}
}

function removeItemFromCache(cache, key) {
	if (confirm('Are you sure you want to this item ["' + key + '"] from the cache ["' + cache + '"]?')) {
		window.location = jspName + "?action=cifc&cache=" + cache + "&key=" + key;
	}
}



function invertVisibility(divName) {
	var e = document.getElementById(divName);
	if (e) {
		if (e.style.display == 'block') {
			e.style.display = 'none';
		} else {
			e.style.display = 'block';
		}
	}
}
