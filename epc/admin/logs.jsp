<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="au.com.infomedia.epc.management.EPCServiceManager"%>
<%@page import="au.com.infomedia.util.LogUtils"%>
<%@page import="java.io.File"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>

<%
	String requestCommandsMessage = "";
	File[] logs = LogUtils.getLogFiles();
%>
<head><title>Infomedia Ltd. EPC - Logs</title>
	<link rel="stylesheet" type="text/css" href="resources/public/css/log.css" media="screen"/>
	<link rel="stylesheet" type="text/css" href="resources/public/css/sortable.css" media="screen"/>
	<script src="resources/public/js/logs.js" type="text/javascript"></script>
	<script src="resources/public/js/sortable.js" type="text/javascript"></script>
</head>
<body>
<div id="body-wrapper">
    <div id="masthead-container">
       <table width="100%"><tr>
			<td align="left" valign="top">
		        <img src="resources/public/images/IFM-Logo.png" alt="logo"/>
		        <br/>
				<span class="loginPageTitleText">
					The EPC Connections Dashboard
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
		<table width="100%" >
		<tr><td valign="top" align="left" >
			<div id="divTheContent">
				<%if (requestCommandsMessage != null
						&& requestCommandsMessage.length() > 0) {%>
					<span style="border: 1px solid #336699;padding: 4px;margin-left:28px;margin-top: 6px;">
	        			<%=requestCommandsMessage %>
					</span>
				<%} %>
			</div>
		</td>
		<td valign="top" align="right" >
			<table><tr>
			<td>
				<span style='margin-left:10px;padding:3px;'>Auto refresh:</span>
				<div id='refreshButton' style='display:inline;margin-left:2px;border:1 solid black;padding:3px;cursor:pointer;background-color:maroon;color:white;'
						onclick='switchAutoRefresh()'>OFF</div>
			</td>
			<td>
				<div id='refreshIn' style='display:inline;margin-left:2px;border:1 solid black;padding:3px;'>
						20 secs
				</div>
			</td>
			<td>
				<div id='forceRefresh' style='display:inline;margin-left:2px;border:1 solid black;padding:3px;cursor:pointer;background-color:navy;color:white;'
						onclick='forceRefresh()'>REFRESH NOW</div>
			</td>
			</tr></table>
		</td>
		</tr>
		</table>

        <div class="content-underline"><!-- empty --></div>

		<br>
		<table cellspacing="0" class="sortable" id="logtable">
		<tr class="logFileHeaderRow">
			<th align="center">Name</th>
			<th align="center">Size (KB)</th>
			<th align="center">Date/Time</th>
			<th class="unsortable" align="center">Open</th>
		</tr>

		<!-- Content -->
		<%
			String buildNumber = EPCServiceManager.getInstance().getBuildNumber();
			if (buildNumber == null) {
				buildNumber = "developersbuild";
			}

			int rowNum = 0;
			for(File log : logs) {
				String overClass = "logFileCellOverOrange";
				if (log.getName().startsWith("epc." + buildNumber)) {
					overClass = "logFileCellOverGreen";
				}
		%>
				<tr class="logFileRow" onmouseover="setRowClass('<%=overClass %>', <%=rowNum %>);" onmouseout="setRowClass('logFileCell', <%=rowNum %>);">

					<td align="left" class="logFileCell" id="tdName_<%=rowNum %>">
						<%
							if (log.getName().contains(".htm") || log.getName().endsWith(".html") || log.getName().endsWith(".xml")){
						%>
							<span onclick="gotoPage('openFile.jsp?file=<%=URLEncoder.encode(log.getName(), "UTF-8") %>', 'Opening File [<%=log.getName() %>]');" class="clickableDivBlue">
								<a href="<%=log.getPath()%>"> <%=log.getName()%> </a>
							</span>
						<% } else { %>
							<span onclick="gotoPage('log.jsp?file=<%=URLEncoder.encode(log.getName(), "UTF-8") %>', 'Reading the Log File [<%=log.getName() %>]');" class="clickableDivBlue">
								<a href="<%=log.getPath()%>"> <%=log.getName()%>  </a>
							</span>
						<% } %>
					</td>

					<td align="right" class="logFileCell" id="tdSize_<%=rowNum %>">
						<%=Math.floor(log.length() / 1024) %>
					</td>

					<td align="center" class="logFileCell" id="tdDate_<%=rowNum %>">
						<%=new SimpleDateFormat("dd/MM/yyyy hh:mm a").format(new Date(log.lastModified())) %>
					</td>

					<td align="center" class="logFileCell" id="tdOpen_<%=rowNum %>">
					<%
						if (log.getName().contains(".htm") || log.getName().endsWith(".html") || log.getName().endsWith(".xml")){
					%>
						<span onclick="gotoPage('openFile.jsp?file=<%=URLEncoder.encode(log.getName(), "UTF-8") %>', 'Opening File [<%=log.getName() %>]');" class="clickableDivBlue">
							Open
						</span>
					<% } else { %>
						<span onclick="gotoPage('log.jsp?file=<%=URLEncoder.encode(log.getName(), "UTF-8") %>', 'Reading the Log File [<%=log.getName() %>]');" class="clickableDivBlue">
							Open
						</span>
					<% } %>
					</td>

				</tr>
		<%
				rowNum++;
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

	<script type="text/javascript">
		switchAutoRefresh(true);
		window.setInterval('executeUpdateTimer()', reloadInterval);
	</script>
</body>
</html>
