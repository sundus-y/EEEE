<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="au.com.infomedia.epc.management.EPCServiceManager"%>
<%@page import="au.com.infomedia.monitoring.ThreadInfo"%>
<%@page import="au.com.infomedia.monitoring.ThreadMonitorManager"%>


<%@page import="java.util.List"%>


<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>

<head><title>Infomedia Ltd. EPC - Thread Snapshot</title>
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
		</script>
	
</head>
<body>

<div id="body-wrapper">
    <div id="masthead-container">
		<table width="100%"><tr>
			<td align="left" valign="top">
		        <img src="resources/public/images/IFM-Logo.png" alt="logo"/>
		        <br/>
				<span class="loginPageTitleText">
					EPC Server - Thread Snapshot
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
		<table width="95%" cellpadding="3" cellspacing="0">
		<tr>
			<td align="center" class="headerCell">ID</td>
			<td align="center" class="headerCell">Name</td>
			<td align="center" class="headerCell">Priority</td>
			<td align="center" class="headerCell">State</td>
			<td align="center" class="headerCell">Client</td>
			<td align="center" class="headerCell">Duration (ms)</td>
			<td align="center" class="headerCell">Stack</td>
		</tr>
		<%
        	// reset non active threads
			ThreadMonitorManager.getInstance().resetThreadInfos();
		
            List<ThreadInfo> threadInfoList = ThreadMonitorManager.getInstance().getThreadInfos();
            for (ThreadInfo info : threadInfoList) {               
                %>
				<tr>
					<td align="left" class="dataCell"><%=info.getThreadId() %></td>
					<td align="left" class="dataCell"><%=info.getThreadName() %></td>
					<td align="left" class="dataCell"><%=info.getThreadPriority() %></td>
					<td align="left" class="dataCell"><%=info.getStateName() %></td>
					<td align="left" class="dataCell"><%=info.getClientInfo() %></td>
					<td align="left" class="dataCell"><%=info.getDurationAsString() %></td>
					<td align="left" class="dataCell">
						<div id="stackMan<%=info.getThreadId()%>" style="background-color:activecaption;color:white;display:block;cursor:pointer;" onclick="showHideDiv('stackDat<%=info.getThreadId()%>');">
							<small>Show/Hide Thread Stack</small>
						</div>
						<div id="stackDat<%=info.getThreadId()%>" style="white-space:nowrap;display:<%=(info.isInfomediaRelated()&&!info.isThisPage()?"block":"none")%>;background-color:<%=(info.isInfomediaRelated()?"#00694e;color:gray":"#eeecae")%>">
							<small><%=info.getStackAsString()%></small>
						</div>
					</td>
				</tr>
				<%	
			}            
		%>
		</table>
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