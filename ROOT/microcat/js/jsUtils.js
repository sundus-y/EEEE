function getHttpRequest(url, method, asynch, callback, postdata, contentType, charSet) {
	// Test for the CrossBrowser Request Object...
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Msxml2.XMLHTTP");
		if (!request) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	// Only continue if we have a request... 
	if (request) {
		if (contentType) {
			if (!charSet) {
				charSet = "UTF-8";
			}
			request.setRequestHeader("Content-Type", contentType + "; charset=" + charSet);
		}
		
		if (!method) {
			method = "GET";
		}
		
		if (callback) {
			request.onreadystatechange = callback;
		}
		
		request.open("POST", url, asynch);
		
		try {
			request.send(postdata);
			return request;
		} catch(e) {
			throw e;
		}
	}
	
	// Failed to create the request --> Return NULL
	return null;
}

function setCookie(name, value, domain, path, expiry, secure)
{
 	var cookieData = escape(name) + '=' 
 	cookieData += value ? escape(value) : "";
 	cookieData += domain ? '; DOMAIN=' + domain : '';
 	cookieData += path ? '; PATH=' + path : '';
 	if (expiry) {
 		if (typeof expiry == 'object') {	// Assume a Date...
 			cookieData += expiry ? '; EXPIRES=' + expiry.toGMTString() : '';
 		} else {	// Assume a string...
 			cookieData += expiry ? '; EXPIRES=' + expiry : '';
 		}
 	}
 	
 	cookieData += secure ? '; SECURE=1' : '';
	document.cookie = cookieData;
}

function getCookie(name) {
 	var cookieData = null;
	if(document.cookie) {
       	var arr = document.cookie.split((escape(name) + '=')); 
       	if(arr.length > 1) {
       		cookieData = arr[1].split(';');
       		if (cookieData) {
       			return cookieData[0];
       		}
    	}
	}
	return null;
}

function deleteCookie(name)
{
 	var tmp = getCookie(name);
	if(tmp)  {
		setCookie(name, "", "", "", new Date(1), "");
	}
}

// *** DO NOT REMOVE THE FOLLOWING LINE - IT IS USED BY THE CHECK LOGIN METHOD!! *** 
// CHECKLOGIN=TRUE
function checkLogin() {
	try {
		var loginReq = getHttpRequest('jsUtils.js', 'GET', false, null, null, null, null);
		if (loginReq && loginReq.responseText) {
			var rt = loginReq.responseText.toUpperCase();
			if (rt.indexOf("CHECKLOGIN=TRUE") > 0) {
				return true;
			} else return false;
		} else {
			return false;
		}
	} catch(e) {		// Redirected to a site that is outside this domain - hence - logged out!!
		return false;
	}
}

