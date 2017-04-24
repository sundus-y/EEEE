<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="au.com.infomedia.epc.management.EPCServiceManager"%>
<%@page import="au.com.infomedia.epc.management.logging.EPCLoggingManager"%>
<%@page import="org.apache.log4j.Category"%>
<%@page import="org.apache.log4j.Level"%>
<%@page import="org.apache.log4j.Logger"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.util.List"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>

<%
	List<Logger> logList = EPCLoggingManager.getLoggers();

	String requestCommandsMessage = "";

	// Run any Request Commands...	
	Logger actionLogger = null;
	if (request.getParameter("log") != null) {
		String actionLog = request.getParameter("log");		
		// Find a matching Logger
		for(Logger log : logList) {
			if (log.getName().equalsIgnoreCase(actionLog)) {
				actionLogger = log;
				break;
			}
		}
	} 
	
	if (request.getParameter("action") != null
			&& actionLogger != null) {
		
		String action = request.getParameter("action");
				
		if (action.equalsIgnoreCase("setlevel")){
			String tmpLevel = request.getParameter("level");
			if (tmpLevel != null) {
				if (tmpLevel.equalsIgnoreCase("inherit")) {
					actionLogger.setLevel(null);
					requestCommandsMessage = "Set Logging Level for Package: <span style=\"color:purple;font-weight:bold;\">" + actionLogger.getName() + "</span> to: <b>Inherit</b>";
				} else {
					Level level = Level.toLevel(tmpLevel);
					actionLogger.setLevel(level);
					requestCommandsMessage = "Set Logging Level for Package: <span style=\"color:purple;font-weight:bold;\">" + actionLogger.getName() + "</span> to: <b>" + level.toString() + "</b>";	
				}
			}
		}
	}
%>	
<head><title>Infomedia Ltd. EPC - Log Manager</title>
	<link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
	<script src="resources/public/js/logmanager.js" type="text/javascript"></script>	
</head>
<body>
<div id="body-wrapper">
    <div id="masthead-container">
		<table width="100%"><tr>
			<td align="left" valign="top">
		        <img src="resources/public/images/IFM-Logo.png" alt="logo"/>
		        <br/>
				<span class="loginPageTitleText">
					The EPC Log Manager
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
			<%if (requestCommandsMessage != null 
					&& requestCommandsMessage.length() > 0) {%>
				<span style="border: 1px solid #336699;padding: 4px;margin-left:28px;margin-top: 6px;">
        			<%=requestCommandsMessage %>
				</span>
			<%} %>
			</td>
		<td valign="baseline" align="right" >
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
			</tr></table>
		</td>
		</tr>
		</table>


        <div class="content-underline"><!-- empty --></div>

		<table cellspacing="0" class="logFileTable">
		<tr class="logFileHeaderRow">
			<td class="logFileHeaderCell" align="center">&nbsp;</td>
			<td class="logFileHeaderCell" align="center">Log Level</td>
			<td class="logFileHeaderCell" align="center">Package</td>
			<td class="logFileHeaderCell" align="center">Set as Info</td>
			<td class="logFileHeaderCell" align="center">Set as Debug</td>
			<td class="logFileHeaderCell" align="center">Set as Trace</td>
			<td class="logFileHeaderCell" align="center">Set as Inherit</td>
		</tr>
	

	<%		
		int rowNum = 0;
		for(Logger log : logList) {			
			Level level = log.getLevel();
			boolean inheritedLevel = false;
			if (level == null) {
				inheritedLevel = true;				
				level = log.getEffectiveLevel();
				if (level == null) {
					Category parent = log.getParent();
					while (level == null && parent != null) {
						level= parent.getLevel();
						if (level == null) {
							parent = parent.getParent();
						}
					}
				}
			}
			
			String overClass = level == null ?  "logFileCellOverOrange" : 
									(level.toString().equalsIgnoreCase("DEBUG") ? "logFileCellOverGreen" :  
										(level.toString().equalsIgnoreCase("INFO") ? "logFileCellOverOrange" : "logFileCellOverRed")
									);
						
			%>
			<tr class="logFileRow" onmouseover="setRowClass('<%=overClass %>', <%=rowNum %>);" onmouseout="setRowClass('logFileCell', <%=rowNum %>);">
				<td class="logFileCell" id="tdImage_<%=rowNum %>" align="right">
					<%if (overClass.endsWith("Green")) { %>
						<img src="resources/public/images/green.gif" height="15px;" />
					<%} else if (overClass.endsWith("Red")) {  %>
						<img src="resources/public/images/red.gif" height="15px;" />
					<%} else {  %>
						<img src="resources/public/images/orange.gif" height="15px;" />
					<%} %>
				</td>
				<td class="logFileCell" id="tdLevel_<%=rowNum %>" align="right">
					<small>&nbsp;<%=inheritedLevel ? "(Inherited)" : "" %></small>
					<%=level == null ? "?" : level.toString() %>					
				</td>
				<td class="logFileCell" id="tdPackage_<%=rowNum %>" align="left"><%=log.getName() %></td>
				<td class="logFileCell" id="tdInfo_<%=rowNum %>" align="center">
					<div onclick="setLogLevel('<%=URLEncoder.encode(log.getName(), "UTF-8") %>',  'INFO', 'tdInfo_<%=rowNum %>');" 
						 class="clickableDivBlue">
						Set INFO
					</div>
				</td>
				<td class="logFileCell" id="tdDebug_<%=rowNum %>" align="center">
					<div onclick="setLogLevel('<%=URLEncoder.encode(log.getName(), "UTF-8") %>',  'DEBUG', 'tdDebug_<%=rowNum %>');" 
						 class="clickableDivBlue">
						Set DEBUG
					</div>
				</td>
				<td class="logFileCell" id="tdTrace_<%=rowNum %>" align="center">
					<div onclick="setLogLevel('<%=URLEncoder.encode(log.getName(), "UTF-8") %>',  'TRACE', 'tdTrace_<%=rowNum %>');" 
						 class="clickableDivBlue">
						Set TRACE
					</div>
				</td>
				<td class="logFileCell" id="tdInherit_<%=rowNum %>" align="center">
					<div onclick="setLogLevel('<%=URLEncoder.encode(log.getName(), "UTF-8") %>',  'INHERIT', 'tdInherit_<%=rowNum %>');" 
						 class="clickableDivBlue">
						Set INHERIT
					</div>
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