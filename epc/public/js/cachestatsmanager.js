
function setRowClass(className, rowNum) {
	var names = new Array();
	names.push('Sequence');
	names.push('Category');
	names.push('Name');
	names.push('TopHits');
	names.push('PrewarmHits');
	names.push('DiskHits');
	names.push('Reset');

	for(var i = 0; i < names.length; i++) {
		var name = names[i];
		var e = document.getElementById('td' + name + '_' + rowNum);
		if (e) e.className = className;
	}
}

var autoRefresh = false;
var reloadInterval = 1000;
var timeToReload = 20;
var jspName = "epcCacheStatsView.jsp";

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

function executeUpdateTimer(cachecategory) {
	if (autoRefresh) {
//		alert(timeToReload + " secs");
		var e = document.getElementById('refreshIn');
		if (e) {
			timeToReload--;
			if (timeToReload > 0) {
				e.innerHTML = timeToReload + " secs";
			} else {
				e.innerHTML = "reloading...";
				openCacheCategory(cachecategory);
			}
		}
	}
}

function openCacheCategory(cachecategory) {
	window.location = jspName + "?action=open&cachecategory=" + cachecategory;
}

function resetHitCount(cache, cachecategory) {
//	alert(cache);
	if (confirm('Are you sure you want to reset hitcount for "' + cache + '" cache?\n\nWARNING: THIS WILL REMOVE ALL HITCOUNTS FROM THIS CACHE!')) {
		window.location = jspName + "?action=reset&cache=" + cache + "&cachecategory=" + cachecategory;
	}
}

function resetAll(cachecategory) {
	if (confirm('Are you sure you want to reset all the hitcounts in this category?\n\nWARNING: THIS WILL REMOVE ALL HITCOUNTS FROM ALL CACHE ITEMS!')) {
		window.location = jspName + "?action=resetall&cachecategory=" + cachecategory;
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
