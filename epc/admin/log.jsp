<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="au.com.infomedia.epc.management.EPCServiceManager"%>
<%@page import="au.com.infomedia.epc.management.logging.*"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.List"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>

<%
	String requestCommandsMessage = "";

	String logFile = request.getParameter("file");
	if (logFile == null
			|| logFile.length() == 0) {
		response.sendRedirect("logs.jsp");
	}

	List<LogEvent> logEvents = EPCLoggingManager.getLogFileAsLogEvents(logFile);

	LogEventType[] eventTypes = LogEventType.values();
	List<String> packageList = EPCLoggingManager.getListOfPackagesFromLogEvents(logEvents);

	List<LogEventFilter> filterList = new ArrayList<LogEventFilter>();

	// Filters to apply...
	String typeFilterStr = request.getParameter("typefilter");
	int typeFilter = -1;
	if (typeFilterStr != null) {
		try {
			typeFilter = Integer.parseInt(typeFilterStr);
			LogEventFilter filter = new LogEventFilter(LogEventFilterType.TYPE, typeFilterStr);
			filterList.add(filter);
		} catch(NumberFormatException e) {
			// Do nothing for now...
			typeFilter = -1;
		}

	}

	String packageFilter = request.getParameter("packagefilter");
	if (packageFilter == null) {
		packageFilter = "";
	} else {
		LogEventFilter filter = new LogEventFilter(LogEventFilterType.CLASS, packageFilter);
		filterList.add(filter);
	}

	String messageFilter = request.getParameter("messagefilter");
	if (messageFilter == null) {
		messageFilter = "";
	} else {
		LogEventFilter filter = new LogEventFilter(LogEventFilterType.MESSAGE, messageFilter);
		filterList.add(filter);
	}

	/*
	String exceptionFilter = request.getParameter("exceptionid");
	if (exceptionFilter == null) {
		exceptionFilter = "";
	} else {
		LogEventFilter filter = new LogEventFilter(LogEventFilterType.EXCEPTIONID, exceptionFilter);
		filterList.add(filter);
	}
	*/

	String removeFiltered = request.getParameter("removefiltered");
	if (removeFiltered == null
			|| !removeFiltered.equalsIgnoreCase("1")) {
		removeFiltered = "0";
	}

	// Run Filters...
	if (filterList.size() > 0) {
		logEvents = EPCLoggingManager.filterLogEventList(logEvents, filterList, removeFiltered.equalsIgnoreCase("1"));
	}

	// Sort by...
	String sortBy = request.getParameter("sortby");
	if (sortBy == null) {
		sortBy = "Date1";
	}

	if (sortBy.equalsIgnoreCase("date1")) {
		logEvents = EPCLoggingManager.reverseLogEventList(logEvents);
	} else if (sortBy.equalsIgnoreCase("type")) {
		// not available at the moment...
	} else if (sortBy.equalsIgnoreCase("package")) {
		// not available at the moment...
	} else if (sortBy.equalsIgnoreCase("message")) {
		// not available at the moment...
	}
%>
<head><title>Infomedia Ltd. EPC - Log Viewer</title>
	<link rel="stylesheet" type="text/css" href="resources/public/css/log.css" media="screen"/>
	<script src="resources/public/js/log.js" type="text/javascript"></script>
</head>
<body>
<div id="body-wrapper">
    <div id="masthead-container">
		<table width="100%"><tr>
			<td align="left" valign="top">
		        <img src="resources/public/images/IFM-Logo.png" alt="logo"/>
		        <br/>
				<span class="loginPageTitleText">
					The EPC Logs - Viewing: <%=logFile %>
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


			<!-- Setup Filters... -->
			<h3>Filters to Apply:</h3>
			<table border="0" cellpadding="1" cellspacing="1">
			<tr>
				<td align="right"><b>EVENT TYPE</b></td>
				<td align="left">
					<select id="typeSelect">
						<option value="">NONE</option>
						<%for(LogEventType type : eventTypes) { %>
							<%
								String selectedString = "";
								if (type.ordinal() == typeFilter) {
									selectedString = "SELECTED";
								}
							%>
							<option <%=selectedString %> value="<%=type.ordinal() %>"><%=type.toString() %></option>
						<%} %>
					</select>
				</td>
			</tr>

			<tr>
				<td align="right"><b>PACKAGE</b></td>
				<td align="left">
					<select id="packageSelect">
						<option value="">NONE</option>
						<%for(String p : packageList) { %>
							<%
								String selectedString = "";
								if (packageFilter.equalsIgnoreCase(p)) {
									selectedString = "SELECTED";
								}
							%>
							<option <%=selectedString %> value="<%=p %>"><%=p %></option>
						<%} %>
					</select>
				</td>
			</tr>
			<tr>
				<td align="right"><b>Message</b></td>
				<td align="left">
					<input id="messageInput" size="30" value="<%=messageFilter %>" />
				</td>
			</tr>
			</table>
			<small>Select Filters / Sort By values, and click on 'Refresh Now' to run the filter(s)</small>
		</td>
		<td valign="top" align="left" >
			<b>Sort By:&nbsp;</b>
			<select id="sortSelect" onchange="runSort();">
				<option value="Date1">Date (Newest to Oldest)</option>
				<option value="Date2">Date (Oldest to Newest)</option>
				<option value="Type">Type (Not Available Yet)</option>
				<option value="Packagae">Package (Not Available Yet)</option>
				<option value="Message">Message (Not Available Yet)</option>
			</select>

			<br><br>
			<b>Remove Filtered Events:&nbsp;</b>
			<%
				String removeFilteredSelected = removeFiltered.equalsIgnoreCase("1") ? " CHECKED " : "";
			%>
			<input type="checkbox" id="removeFilteredCheckbox" value="1" <%=removeFilteredSelected %> >


			<br><br>
			<table cellpadding="5px" cellspacing="2px"><tr><td align="left">
				<div id='divShowAllEvents' style='display:inline;margin-left:2px;border:1 solid black;padding:3px;cursor:pointer;background-color:green;color:white;'
						onclick='showAllEvents()'>Show All Events</div>
			</td><td align="right">
				<div id='divHideAllEvents' style='display:inline;margin-left:2px;border:1 solid black;padding:3px;cursor:pointer;background-color:maroon;color:white;'
						onclick='hideAllEvents()'>Hide All Events</div>
			</td></tr></table>
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
		<table cellspacing="0" class="logFileTable">
		<tr class="logFileHeaderRow">
			<td class="logFileHeaderCell" align="center">Date/Time</td>
			<td class="logFileHeaderCell" align="center">Type</td>
			<td class="logFileHeaderCell" align="center">Package</td>
			<td class="logFileHeaderCell" align="center">Message</td>
		</tr>

		<!-- Content -->
		<%
			int rowNum = 0;
			for(LogEvent event : logEvents) {
				String overClass = "logFileCellOverOrange";
				switch (event.getEventLevel()) {
					case UNKNOWN:
						overClass = "logFileCellOverGreen";
						break;
					case INFO:
						overClass = "logFileCellOverGreen";
						break;
					case DEBUG:
						overClass = "logFileCellOverGreen";
						break;
					case TRACE:
						overClass = "logFileCellOverGreen";
						break;
					case ERROR:
						overClass = "logFileCellOverRed";
						break;
					case WARN:
						overClass = "logFileCellOverOrange";
						break;
				}

				String eventDisplay = event.isFilteredOut() ? "none" : "block";
		%>
				<tr class="logFileOpenCloseCell" onmouseover="setRowClass1('logFileOpenCloseCellOver', '<%=rowNum %>a');" onmouseout="setRowClass1('logFileOpenCloseCell', '<%=rowNum %>a');">
					<td class="logFileOpenCloseCell" colspan="4" align="left" id="tdInvert_<%=rowNum%>a" onclick="invertEventVisibility(<%=rowNum%>);">
						<%if (event.isFilteredOut()) { %>
							Show this event
						<%} else { %>
							Hide this event
						<%} %>
					</td>
				</tr>
				<tr id="eventRow_<%=rowNum%>" class="logFileRow" onmouseover="setRowClass('<%=overClass %>', <%=rowNum %>);" onmouseout="setRowClass('logFileCell', <%=rowNum %>);" onclick="invertEventVisibilityIfHidden(<%=rowNum%>);">
					<td class="logFileCell" id="tdDate_<%=rowNum %>">
						<div id="divDate_<%=rowNum %>" style="display:<%=eventDisplay %>">
							<%=event.getDateString() %>
						</div>
					</td>

					<td class="logFileCell" id="tdType_<%=rowNum %>" style="row-height:<%=eventDisplay %>">
						<div id="divType_<%=rowNum %>" style="display:<%=eventDisplay %>">
							<%=event.getEventLevel().toString() %>
						</div>
					</td>

					<td class="logFileCell" id="tdClass_<%=rowNum %>" style="row-height:<%=eventDisplay %>">
						<div id="divClass_<%=rowNum %>" style="display:<%=eventDisplay %>">
							<%=event.getEventClass() %>
						</div>
					</td>

					<td class="logFileCell" id="tdMessage_<%=rowNum %>" style="row-height:<%=eventDisplay %>">
						<div id="divMessage_<%=rowNum %>" style="display:<%=eventDisplay %>">
							<%=event.getEventMessage() %>

							<%if (event.getStack() != null && event.getStack().size() > 0) {
								long ts = Calendar.getInstance().getTimeInMillis() + (StringUtils.isNotEmpty(event.getEventMessage()) ? event.getEventMessage().length() : 0);
							%>
							<div onclick="showHideDiv('<%=ts%>');" style="cursor:pointer;background-color:#afeaaa"><small>Show/Hide Stack Trace</small></div>
							<div id="<%=ts %>" style="cursor:pointer;background-color:#cfcaca;display:none">
								<%for(String e : event.getStack()) { %>
									<br><%=e %>
								<%} %>
							</div>
							<%} %>
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
		var totalEvents = <%=rowNum%>;
	</script>
</body>
</html>