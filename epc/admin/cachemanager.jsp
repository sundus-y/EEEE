<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="au.com.infomedia.epc.data.object.AbstractDataObject"%>
<%@page import="au.com.infomedia.epc.management.EPCServiceManager"%>
<%@page import="net.sf.ehcache.Cache"%>

<%@page import="net.sf.ehcache.CacheManager"%>
<%@page import="net.sf.ehcache.Element"%>
<%@page import="org.joda.time.DateTime"%>
<%@page import="org.joda.time.format.DateTimeFormat"%>
<%@page import="org.joda.time.format.DateTimeFormatter"%><html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>

<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>

<%
    CacheManager cacheManager = CacheManager.getInstance();
    List<Cache> cacheList = new ArrayList<Cache>();
    for (String name : cacheManager.getCacheNames()) {			
        cacheList.add(cacheManager.getCache(name));
    }

	String requestCommandsMessage = "";

	// Run any Request Commands...
	Cache activeCache = null;
	if (request.getParameter("cache") != null) {
		String cacheName = request.getParameter("cache");
		// Find a matching Logger
		for(Cache cache : cacheList) {
			if (cache.getName().equalsIgnoreCase(cacheName)) {
				activeCache = cache;
				break;
			}
		}
	}

	boolean openActiveCache = false;
	if (request.getParameter("action") != null) {

		String action = request.getParameter("action");

		if (action.equalsIgnoreCase("qf") && activeCache != null) {
			// Quick Flush...
			activeCache.removeAll();
			activeCache.clearStatistics();
			requestCommandsMessage += "FLUSHED CACHE: " + activeCache.getName();
		} else if (action.equalsIgnoreCase("open")) {
			openActiveCache = true;
		} else if (action.equalsIgnoreCase("cifc") && activeCache != null) {
			openActiveCache = true;
			String key = request.getParameter("key");
			if (key != null && key.length() > 0) {
				try {
					activeCache.remove(key);
					requestCommandsMessage += "REMOVED ITEM [" + key + "] FROM THE CACHE [" + activeCache.getName() + "]";
				} catch(IllegalStateException e) {
					requestCommandsMessage += "FAILED TO REMOVED ITEM [" + key + "] FROM THE CACHE [" + activeCache.getName() + "]";
				}
			}
		} else if (action.equalsIgnoreCase("fa")){
			for (Cache cache : cacheList){
				try {
					cache.removeAll();
					cache.clearStatistics();
				} catch(IllegalStateException e) {
					requestCommandsMessage += "FLUSHED CACHE: " + activeCache.getName();
				}
			}
		}
	}
%>
<head><title>Infomedia Ltd. EPC - Cache Manager</title>
	<link rel="stylesheet" type="text/css" href="resources/public/css/cachemanager.css" media="screen"/>
	<link rel="stylesheet" type="text/css" href="resources/public/css/sortable.css" media="screen"/>
	<script src="resources/public/js/cachemanager.js" type="text/javascript"></script>
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
					The EPC Cache Manager
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

	<%if (!openActiveCache) { %>
		<table cellspacing="0" class="sortable" id="cachetable">
		<tr class="logFileHeaderRow">
			<th align="left">Cache</th>
			<th align="center">Object Count</th>
			<th align="center">Total Hits</th>
			<th align="center">Accuracy of Stats</th>
			<th class="unsortable" align="center">
                <span onclick="flushAll();" style="cursor:pointer;font-weight:bold;color:maroon;text-align: center;">Flush All</span>
            </th>
		</tr>


	<%
		int rowNum = 0;
		long totalCount = 0;
		long totalHits = 0;

		DecimalFormat df1 = new DecimalFormat("#,###,###,##0");

		for(Cache cache : cacheList) {

			totalCount += cache.getStatistics().getObjectCount();
			totalHits += cache.getStatistics().getCacheHits();

				String overClass = "logFileCellOverOrange";

			%>
			<tr class="logFileRow" onmouseover="setRowClass('<%=overClass %>', <%=rowNum %>);" onmouseout="setRowClass('logFileCell', <%=rowNum %>);">

                <td class="logFileCell" id="tdName_<%=rowNum %>" align="left">
                    <span onclick="openCache('<%=cache.getName() %>');" style="cursor:pointer;font-weight:bold;color:navy;text-align: center;">
					<%=cache.getName() %>
					</span>
                </td>
				<td class="logFileCell" id="tdCount_<%=rowNum %>" align="center"><%=df1.format(cache.getStatistics().getObjectCount()) %></td>
				<td class="logFileCell" id="tdHits_<%=rowNum %>" align="center"><%=df1.format(cache.getStatistics().getCacheHits()) %></td>
				<td class="logFileCell" id="tdAccuracy_<%=rowNum %>" align="center"><%=cache.getStatistics().getStatisticsAccuracyDescription() %></td>
				<td class="logFileCell" id="tdQF_<%=rowNum %>" align="center">
					<span onclick="quickFlush('<%=cache.getName() %>');" style="cursor:pointer;font-weight:bold;color:navy;text-align: center;">
						Flush
					</span>
				</td>
			</tr>
			<%
			rowNum++;
		}
	%>
		</table>		

	<%} else {
		int rowNum = 0;
		DecimalFormat df1 = new DecimalFormat("#,###,###,##0");
		DateTimeFormatter formatter = DateTimeFormat.forPattern("EEE dd MMM yyyy hh:mm:ss");
		List<Object> keyList = (List<Object>)activeCache.getKeys();

		%>
		<a href="cachemanager.jsp">Return to Cache List</a>

		<table cellspacing="0" class="logFileTable">
		<tr class="logFileHeaderRow">
			<td class="logFileHeaderCell" align="center">Item</td>
			<td class="logFileHeaderCell" align="center">Creation Time</td>
			<td class="logFileHeaderCell" align="center">Expiration Time</td>
			<td class="logFileHeaderCell" align="center">Hit Count</td>
			<td class="logFileHeaderCell" align="center">Last Accessed</td>
			<td class="logFileHeaderCell" align="center">Last Updated</td>
			<td class="logFileHeaderCell" align="center">Time to Live</td>

			<td class="logFileHeaderCell" align="center">Object Type</td>
			<td class="logFileHeaderCell" align="center">Value</td>

			<td class="logFileHeaderCell" align="center">Remove</td>
		</tr>

		<%for(Object key : keyList) {
			Element element = activeCache.get(key);
			if (element == null) continue;
			Object item = element.getObjectValue();
			String overClass = "logFileCellOverOrange";
		%>
			<tr class="logFileRow" onmouseover="setRowClass1('<%=overClass %>', <%=rowNum %>);" onmouseout="setRowClass1('logFileCell', <%=rowNum %>);">
				<td class="logFileCell" id="tdKey_<%=rowNum %>" align="left"><%=key %></td>
				<td class="logFileCell" id="tdCreationTime_<%=rowNum %>" align="left"><%=new DateTime(element.getCreationTime()).toString(formatter) %></td>
				<td class="logFileCell" id="tdExpirationTime_<%=rowNum %>" align="left"><%=new DateTime(element.getExpirationTime()).toString(formatter) %></td>
				<td class="logFileCell" id="tdHitCount_<%=rowNum %>" align="center"><%=df1.format(element.getHitCount()) %></td>
				<td class="logFileCell" id="tdLastAccess_<%=rowNum %>" align="left"><%=new DateTime(element.getLastAccessTime()).toString(formatter) %></td>
				<td class="logFileCell" id="tdLastUpdate_<%=rowNum %>" align="left"><%=new DateTime(element.getLastUpdateTime()).toString(formatter) %></td>

				<td class="logFileCell" id="tdTimeToLive_<%=rowNum %>" align="center"><%=df1.format(element.getTimeToLive()) %></td>

				<td class="logFileCell" id="tdType_<%=rowNum %>" align="left"><%=item.getClass().getSimpleName() %></td>
				<td class="logFileCell" id="tdVal_<%=rowNum %>" align="left">
				<%
					String valString = item.toString();
					try {
						valString = ((AbstractDataObject)item).toReflectionString();
						if (valString.contains("<") || valString.contains(">")) {
							valString = valString.replace("<", "&lt;").replace(">", "&gt;");
							valString = valString.replace("\n", "<br>");
						}
					} catch(Throwable e) {
					}

					boolean hideValue = false;
					if (valString.length() > 40) {
						hideValue = true;
					}
				%>

				<%if (hideValue) { %>
					<div id="objValInverter<%=rowNum%>" onclick="invertVisibility('objValDiv<%=rowNum%>');" style="background-color:navy;color:white;font-size:9px;font-stretch: ultra-expanded;cursor:pointer;">
						[Value too long - Click to Show/Hide Value]
					</div>
					<div id="objValDiv<%=rowNum%>" style="display:none">
				<%} else {%>
					<div id="objValDiv<%=rowNum%>">
				<%}
				%>
					<%=valString %>
				</div>
				</td>
				<td class="logFileCell" id="tdQF_<%=rowNum %>" align="left">
					<span onclick="removeItemFromCache('<%=activeCache.getName() %>', '<%=key %>');" style="cursor:pointer;font-weight:bold;color:navy;text-align: center;">
						Remove
					</span>
				</td>
			</tr>
		<%
			rowNum++;
		} %>

	<%} %>

    </div>

	<div id="footer-container">
        <div class="column-container">
            <div class="column1"><%=EPCServiceManager.getInstance().getEPCVersionBuild() %>
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