/**
 * Functions to support the logon page.
 *
 * User: lthompson
 * Date: 2/08/11
 * Time: 2:37 PM
 */

$(document).ready(function() {
    window.onbeforeunload = clean_up;
    $("#startMicrocatLink").click(showApplication);
//    $("#showLowerLoginPanel").click(showLowerLoginPanel);
    $("#downloadLatestData").click(downloadLatestData);
    $("#forgotPasswordButton").click(forgottenPassword);
    $("#forgotPasswordLink").click(forgottenPassword);
    $("#page").click(clearPopups)
    if( usernamePasswordError ){
        var usernameInput = $("#userName");
        usernameInput.focus();
    }
    
});

function forgottenPassword(clickEvent) {
    var forgotPasswordButton = $("forgotPasswordButton");
    $("<form method='POST'/>")
        .attr({action:onlineUrlPrefix + "ForgottenPassword.aspx"})
        .append($("<input type='hidden' name='language'/>")
            .attr({value: currentLanguage}))
        .appendTo('body')
        .submit();
    return false;
}

function openLink(url) {
    window.open(url,'mywin','left=20,top=20,width=800,height=500,toolbar=0,resizable=0,scrollbars=1,resizable=0');
}

function downloadLatestData(clickEvent) {
    if( updateInfo.isUpdateAvailable ){
        $.ajax({
                  url: "updateVersion.jsp?version=" + updateInfo.version,
                  success: downloadLatestDataCallback
                });
    }
    return false;
}

function downloadLatestDataCallback(data, textStatus, jqXHR) {
    if( jqXHR.status == 200 ){
        window.location.href = updateInfo.updateUrl;
    }
}

//function showLowerLoginPanel(clickEvent){
//    var lowerLoginPanel = $("#lowerLoginPanel");
//    lowerLoginPanel.toggle('fast');
//
//    var usernameInput = $("#userName");
//    usernameInput.focus();
//
//    return false;
//}

/*
* Generated object on the online site:
* <object name="mediaControl" width="100%" height="100%" align="top" id="mediaControl" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codeBase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0">
*   <param name="movie" value="http://fap.ifmsystems.com/fordV6.swf" />
*   <param name="flashVars" value="host=fap.ifmsystems.com&siteUrl=login.ifmsystems.com/&csaId=DYN00000000000C1C3&epcDomain=fap.ifmsystems.com&sessionId=hvsdrezuzoaxfc55voqewku1&userName=lthompson@infomedia.com.au&retUrl=%2fDefault.aspx" />
*   <param name="quality" value="high" />
*   <param name="play" value="true" />
*   <param name="loop" value="false" />
*   <param name="scale" value="noScale" />
*   <param name="wmode" value="window" />
*   <param name="devicefont" value="false" />
*   <param name="menu" value="true" />
*   <param name="allowFullScreen" value="true" />
*   <param name="allowScriptAccess" value="always" />
*   <param name="salign" value="middle" />
* </object>
*
* Current output:
* <object name="microcat" width="100%" height="100%" id="microcat" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" style="visibility: visible;">
*       <param name="allowFullScreen" value="true" />
*       <param name="allowScriptAccess" value="always" />
*       <param name="wmode" value="window" />
*       <param name="flashvars" value="epcDomain=me.ifmsystems.com:8081" />
*       <param name="movie" value="microcat/V6.swf" />
*  </object>
**/
 function showApplication(clickEvent){
    var hostname = $(location).attr('hostname');
    var port = $(location).attr('port');

     var query = getQueryParams(document.location.search);
     var wmodeValue = query.wmode;
     if (!wmodeValue) {
         wmodeValue = 'opaque';
     }

    //hide the logon controls
    var page = $("#page").hide();

    //embed the flash movie
    var flashvars = {
        epcDomain: hostname + ":" + port
    };
    var params = {
        allowFullScreen: true,
        allowScriptAccess: 'always',
        wmode: wmodeValue
    };
    var attributes = {
        name: 'microcat'
    };
    swfobject.embedSWF("microcat/V6.swf", "microcat", "100%", "100%", "10.0.0", "flash/expressInstall.swf", flashvars, params, attributes);
    document.title = 'Microcat V6 ' + franchiseInfo.name;

    setInterval(keepAliveClientCallback, 10000);

    return false;
}

function keepAliveClientCallback() {
    var ajaxOptions = {
        url: "epc/services/user/haslicense",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: null,
        success: keepAliveClientCallbackSuccess,
        error: keepAliveClientCallbackFailure
    };

    $.ajax(ajaxOptions);
}
function keepAliveClientCallbackFailure() {
}
function keepAliveClientCallbackSuccess() {
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

//inconsistent return types required for cross-browser compatibility as returning anything from this function will result in a popup (even null or false)
//noinspection FunctionWithInconsistentReturnsJS
function clean_up(evt) {
    try {
        var flex = document.microcat || window.microcat;
        if (flex) {
            var warning = flex.myFlexExitFunction();

            if (warning != "") {
                return warning;
            }
            else {
                return;
            }
        }
    } catch (e) { }
}

function errorCheck(serviceUrl, serviceErrDetail, faultCode) {
    //stub method to prevent offline SWF having an exception when there is a service error and it tries to use this to detect Internet connectivity
}

function rememberUserNameinCookie()
{
	if ($('#remember').attr('checked')) {
		var username = $('#userName').attr("value");
		// set cookies to expire in 14 days
		$.cookie('usernameInfomediaMV6', username, { expires: 60 });
		$.cookie('rememberInfomediaMV6', true, { expires: 60 });
	} 
	else {
		// reset cookies
		$.cookie('usernameInfomediaMV6', null);
		$.cookie('rememberInfomediaMV6', null);
	}
}

function readUsernameFromCookie()
{
	 var remember = $.cookie('rememberInfomediaMV6');
	 if ( remember == 'true' ) 
	 {
		 var username = $.cookie('usernameInfomediaMV6');
		 // autofill the fields
		 $('#userName').attr("value", username);
	 }
}

function setSelectedLanguage()
{
    var combo = $("select[name='language']");
    combo.val(currentLanguage);
}