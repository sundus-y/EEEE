<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="au.com.infomedia.epc.management.EPCServiceManager"%>
<%@page import="au.com.infomedia.util.RuntimeUtils"%>


<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>

<head><title>Infomedia Ltd. EPC - Service Summary</title>
	<link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
	<style>
		.headerCell {
			font-family:Arial, Helvetica, sans-serif;
			background-color:#acceaa;
			font-weight:bold;
			font-size:14px;
			line-height:170%;
			margin:0px;
			padding:2px;
			border: solid 1px #000099;
			border-top: solid 1px #000066;
			border-bottom: solid 1px #000066;
			border-left: solid 1px #000066;
			border-right: solid 1px #000066;
		}
		.dataCell {
			font-family:Arial, Helvetica, sans-serif;
			font-size:12px;
			line-height:110%;
			margin:0px;
			padding:2px;
			border: solid 1px #000099;
			border-top: solid 1px #000066;
			border-bottom: solid 1px #000066;
			border-left: solid 1px #000066;
			border-right: solid 1px #000066;
		}
		.dataCellError {
			font-family:Arial, Helvetica, sans-serif;
			background-color:#efaaaa;
			font-size:12px;
			font-weight:bold;
			line-height:110%;
			margin:0px;
			padding:2px;
			border: solid 1px #000099;
			border-top: solid 1px #000066;
			border-bottom: solid 1px #000066;
			border-left: solid 1px #000066;
			border-right: solid 1px #000066;
		}
		.dataCellSlow {
			font-family:Arial, Helvetica, sans-serif;
			background-color:#efecaa;
			font-size:12px;
			font-weight:normal;
			line-height:110%;
			margin:0px;
			padding:2px;
			border: solid 1px #000099;
			border-top: solid 1px #000066;
			border-bottom: solid 1px #000066;
			border-left: solid 1px #000066;
			border-right: solid 1px #000066;
		}
		.dataCellSlow2 {
			font-family:Arial, Helvetica, sans-serif;
			background-color:#ffbaaa;
			font-size:12px;
			font-weight:normal;
			line-height:110%;
			margin:0px;
			padding:2px;
			border: solid 1px #000099;
			border-top: solid 1px #000066;
			border-bottom: solid 1px #000066;
			border-left: solid 1px #000066;
			border-right: solid 1px #000066;
		}
		.dataCellSlow3 {
			font-family:Arial, Helvetica, sans-serif;
			background-color:#eea755;
			font-size:12px;
			font-weight:bold;
			line-height:110%;
			margin:0px;
			padding:2px;
			border: solid 1px #000099;
			border-top: solid 1px #000066;
			border-bottom: solid 1px #000066;
			border-left: solid 1px #000066;
			border-right: solid 1px #000066;
		}
		.dataCellSlow4 {
			font-family:Arial, Helvetica, sans-serif;
			background-color:#cca544;
			font-size:12px;
			font-weight:bold;
			line-height:110%;
			margin:0px;
			padding:2px;
			border: solid 1px #000099;
			border-top: solid 1px #000066;
			border-bottom: solid 1px #000066;
			border-left: solid 1px #000066;
			border-right: solid 1px #000066;
		}
		.dataCellSlow5 {
			font-family:Arial, Helvetica, sans-serif;
			background-color:#cca211;
			font-size:12px;
			font-weight:bold;
			line-height:110%;
			margin:0px;
			padding:2px;
			border: solid 1px #000099;
			border-top: solid 1px #000066;
			border-bottom: solid 1px #000066;
			border-left: solid 1px #000066;
			border-right: solid 1px #000066;
		}

	</style>

	<script type="text/javascript">
		function setClass(e, className) {
			if (e) e.className = className;
		}

		function gotoPage(url, message) {
			var e = document.getElementById('divTheContent');
			if (e) {
				e.innerHTML = '<div style="margin-left:23px;"><h3>' + message + '</h3><br/><p>Please wait...</p></div>';
			}
			window.location = url;
		}

		function showHideDiv(d) {
			var e = document.getElementById(d);
			if (e) {
				if (e.style.display == 'none') e.style.display = 'block';
				else e.style.display = 'none';
			}
		}

        function createXMLHttpRequest() {
       	   try { return new XMLHttpRequest(); } catch(e) {}
       	   try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
       	   return null;
       	 }

     	 var request = createXMLHttpRequest();
        function refreshUsageSummary() {
        	var e = document.getElementById('usageSummaryDiv');
        	if (e) {
            	if (request != null) {
            		e.innerHTML = '<span style="text-align:center;font-size:12px;font-weight:bold;color:maroon">Loading Service Usage Summary, please wait!</span>';
        			request.open("GET", "serviceSummaryInfo.jsp", false);
	        		request.send();
	        		e.innerHTML = request.responseText;
        		} else {
        			alert('Ooops - Could not find the Service Usage Summary \n\n Try refreshing the page!');
        		}
        	} else {
				alert('Ooops - Could not find the Service Usage Summary \n\n Try refreshing the page!');
            }
        }

		</script>

        <link type="text/css" href="/epc/resources/public/style/jquery-ui-1.8rc3.custom.css" rel="Stylesheet"/>
        <script type="text/javascript" language="javascript" src="/epc/resources/public/js/jquery-1.4.2.min.js"></script>
        <script type="text/javascript" language="javascript" src="/epc/resources/public/js/jquery-ui-1.8rc3.custom.min.js"></script>

        <script language="javascript" type="text/javascript" src="/epc/resources/public/plugins/flot/jquery.flot.min.js"></script>
        <script language="javascript" type="text/javascript" src="/epc/resources/public/plugins/flot/excanvas.min.js"></script>

        <script type="text/javascript" language="javascript" src="/epc/resources/public/html/js/common.js"></script>
        <script type="text/javascript" language="javascript" src="/epc/resources/public/html/js/ServerStatsMonitor.js"></script>

</head>
<body>

<div id="body-wrapper">
    <div id="masthead-container">
		<table width="100%"><tr>
			<td align="left" valign="top">
		        <img src="resources/public/images/IFM-Logo.png" alt="logo"/>
		        <br/>
				<span class="loginPageTitleText">
					EPC Server - Service Usage Summmary
				</span>
			</td>
			<td align="right" valign="bottom">
				<span onclick="window.location='admin.jsp';" style="cursor:pointer;font-weight:bold;color:white;text-align: center;">
					Return to Admin Home
				</span>
			</td>
		</tr></table>
	</div>

	<div id="content-container">
		<table width="100%"><tr><td align="left" valign="top">
		<br/>
		<h2>System Snapshot</h2>
         	<table border="0" cellpadding="1" cellspacing="1">
         		<tr>
         			<td align="right"><b>Used Memory:</b></td>
         			<td> <%=RuntimeUtils.getUsedMemoryDescriptionMb()%></td>
         		</tr>
         		<tr>
         			<td align="right"><b>Free Memory:</b></td>
         			<td><span style="color:maroon;"><%=RuntimeUtils.getFreeTotalMemoryDescriptionMb() %></span></td>
         		</tr>
         		<tr>
         			<td align="right"><b>Current Allocated Memory:</b></td>
         			<td><%=RuntimeUtils.getAllocatedMemoryDescriptionMb()%></td>
         		</tr>
         		<tr>
         			<td align="right"><b>Total Processors:</b></td>
         			<td><%=RuntimeUtils.getAvailableProcessors()%></td>
         		</tr>
         		<tr>
         			<td align="right"><b>No. Executing Threads:</b></td>
         			<td><%=RuntimeUtils.getNumExecutingThreads()%> &nbsp;&nbsp;
         			<small>
         				<span onclick="gotoPage('threadSnapshot.jsp', 'Building snapshot of threads');"
                           class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							View Snapshot
						</span>
         			</small></td>
         		</tr>
         	</table>

	     </td><td align="left" valign="top">
		     <br />
		    <h2>Service Usage Summary
		    &nbsp;&nbsp;&nbsp;
		    <small><small>
		    <span onclick="refreshUsageSummary();" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
				(Refresh)
			</span>
			</small></small>
			</h2>
		    <div id="usageSummaryDiv">
				<span style="text-align:center;width:100%">Loading...</span>
			</div>
			<script>refreshUsageSummary();</script>
		</td></tr></table>
		<br/>

        <span style="padding-left:25px;font-weight:bold;font-size:12pt;color:navy">Server Stats</span>
        <div id="serverStatsMonitorDiv" style="padding-left:20px;width:95%;height:300px"></div>
        <br/>
        <br/>

        <script type="text/javascript">

            $(document).keypress(function(event) {
                if (event.keyCode == '13' || event.keyCode == '32') {
                    refresh();
               }
            });

            function refresh() {
                window.serverStatsMonitor.refresh();
            }

            $(document).ready(function() {
                window.serverStatsMonitor = new ServerStatsMonitor("serverStatsMonitorDiv");
                window.serverStatsMonitor.refresh();
            });

        </script>

        <%--<div id="statsImage" width="100%" style="height:500px">--%>
            <%--<iframe width="100%" height="100%" src="/epc/resources/public/html/ServerStatsMonitor.html"></iframe>--%>
		<%--</div>--%>
    </div>

	<div id="footer-container">
        <div class="column-container">
            <div class="column1"><%= EPCServiceManager.getInstance().getEPCVersionBuild() %>
            </div>
            <div class="column2">Copyright &nbsp;&copy;&nbsp; Infomedia Limited 2008</div>
        </div>
        <div class="column-end"><!-- empty --></div>
    </div>
</div>
</body>
</html>