/**
	Error handling for service issues. The key is to identify if the connection has been lost to either Infomedia services
	or internet from the users client internet connection (at times via a proxy).
	
	Main item names for object is:
	- infomediaService
	
	... so properties are:
	name = name of item call e.g. infomedia services (as above)
	type = type of text status e.g. timeout
	headers = all the infomation in the returning headers
	status = response status 404
	
	Known Issue: Cross Domain AJAX calling may not work as exspected (Access-Control-Allow-Origin).
	
	To resolve the cross domain issue the plug of flXHR has been implemented.
	
	@Author Marsh Pat
	@Copyright Infomedia Pty Ltd 2011
**/

/**
 * Document ready load js dynamically for the error handling
 */

$(document).ready(function() {
	
	// Load js 
	loadScripts([
	             "js/checkplayer.js",
	             "js/flXHR.js"
	          ],function(){
	            // Debug items below  
				//alert('All things are loaded');
	          });

});

// Application Start -------------------------------------------------------------------------

// Main result object, holds two calls, one for Infomedia Service the other the outside world.
var returnAry = new Array();

// This is the individual object which will be returning to returnObject
var resultObj = new Object();

// Globals vars
var urlStr, obj, gServiceErrDetail, gFaultCode;

// The FlxXHR instance and use count
var flproxy;
var usecount = 0;

/**
 * Error check method called by Flex
 * 
 * @param serviceUrl String
 * @param serviceErrDetail String
 * @param faultCode String
 * 
 * @returns {Array}
 */

function errorCheck(serviceUrl, serviceErrDetail, faultCode) {

	flproxy = new flensed.flXHR({ autoUpdatePlayer:true, instanceId:"infomediaService", xmlResponseText:false, onerror:handleError, onreadystatechange:handleLoading, loadPolicyURL:serviceUrl });
	
	// Name of the object relates to the parent object
	resultObj["name"] = flproxy.instanceId;
	
	// URL string that is being called
	resultObj["url"] = serviceUrl; 
	
	// Globel setter and getter (just globel vars)
	gServiceErrDetail = serviceErrDetail;
	gFaultCode = faultCode;
	
	// This is the magic that happens, using the plugins to get more information
	flproxy.open("POST",serviceUrl);
	flproxy.send(flproxy.instanceId);
}	

/**
	Check if online or offline
	
	@returns boolean
**/

function checkIfOnline() {
	var a = navigator.onLine;
	
	if(a) {
		return true;
	} else {
		return false;
	}			
}

/**
 * This returns the object of the Flex application
 * 
 * @param appName
 * @returns void
 */

function getFlexApp(appName) { 
	if (navigator.appName.indexOf ("Microsoft") !=-1) { 
		return window[appName]; 
	} else { 
		return document[appName]; 
	} 
}

/**
 * This will handle the loading on the request for the remote service.
 * 
 * @param XHRobj
 * @returns void
 */

function handleLoading(XHRobj) {
	
	if (XHRobj.readyState == 4) {
		
		// Leave for debugging
		
		/* alert("readyState:"+XHRobj.readyState
			+"\nresponseText:"+XHRobj.responseText
			+"\nstatus:"+XHRobj.status
			+"\nstatusText:"+XHRobj.statusText
			+"\nSource Object Id: "+XHRobj.instanceId
		); */
						
		// First check if the client is online
		resultObj["online"] = checkIfOnline();

		// Request the AJAX headers to add to the local object
		var headers = XHRobj.getAllResponseHeaders();

		// Types are: "success", "notmodified", "error", "timeout", "abort", or "parsererror"
		resultObj["type"] = XHRobj.statusText;
		
		// headers information
		resultObj["headers"] = headers;
		
		// On success will be the result e.g. 202
		resultObj["status"] = XHRobj.status;
		
		// This is to tell Flex if the jQuery worked
		resultObj["description"] = XHRobj.responseText;
		
		/* Ready state, defines the state of the request
			0 Uninitated
			1 Loading
			2 Loaded
			3 Interactive
			4 Complete */
		resultObj["readystate"] = XHRobj.readyState;
		
		// Network issue here
		if (XHRobj.readyState == 4 && XHRobj.status == 0) {
			resultObj["description"] += ' "error flag\" is true. There is a network error with Origin Policy restrictions'; 
		}
		
		// Assign the object to the array which returns to Flex
		returnAry[0] = resultObj;
		
		// Go back to Flex
		sendBack(returnAry);		
	}
}

/**
 * Handle any error in the Ajax Call, this is also very important to let users understand what 
 * the error may be.
 * 
 * @param errObj
 * @returns void
 */

function handleError(errObj) {
	
	// This is great for debugging
	
	/* alert("Error: "+errObj.number
		+"\nType: "+errObj.name
		+"\nDescription: "+errObj.description
		+"\nSource Object Id: "+errObj.srcElement.instanceId
	); */
		
	// This is to tell Flex if the jQuery worked
	resultObj["description"] = errObj.description;
	
	// Types are: "success", "notmodified", "error", "timeout", "abort", or "parsererror"
	resultObj["type"] = errObj.name;
	
	// On success will be the result e.g. 202
	resultObj["status"] = errObj.number;
	
	// First check if the client is online
	resultObj["online"] = checkIfOnline();

	// Assign value to the array 
	returnAry[0] = resultObj;
	
	// Send it back to Flex
	sendBack(returnAry);
}

/**
 * Load script dynamically, this saves the landing page involvement.
 * 
 * @param array
 * @param callback
 * @returns void
 */

function loadScripts(array,callback){
    var loader = function(src,handler){
        var script = document.createElement("script");
        script.src = src;
        script.onload = script.onreadystatechange = function(){
        script.onreadystatechange = script.onload = null;
                handler();
        }
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( script );
    };
    (function(){
        if(array.length!=0){
                loader(array.shift(),arguments.callee);
        }else{
                callback && callback();
        }
    })();
}

/**
 * Send back to Flex the return array. gServiceErrDetail and gFaultCode are globel setters and getter
 * of the what the Flex is saying, these vars have made the complete round trip.
 * 
 * @param returnAry
 * @returns void
 */

function sendBack(returnAry)
{
	// Let Flex know about the result. Get the Flex id by getFlexId method, note 'mediaControl' for login page integration
	// Use this for intDev, stage or production
	// once being deploy the id is not needed 'mediaControl'
	// MediaControl is what the ASP.NET is using as an Id for the Object tag
	// Use this when on DEV
	if(getFlexApp('mediaControl').errorCheckReturn(returnAry, gServiceErrDetail, gFaultCode)){
		getFlexApp('mediaControl').errorCheckReturn(returnAry, gServiceErrDetail, gFaultCode);
	} else {
		getFlexApp(getFlexId().id).errorCheckReturn(returnAry, gServiceErrDetail, gFaultCode);
	}
}
