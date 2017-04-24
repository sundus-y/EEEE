<%@page import="java.util.Map"%>
<%@page import="au.com.infomedia.monitoring.ServiceKey"%>
<%@page import="au.com.infomedia.monitoring.ServiceMonitorInfo"%>
<%@page import="au.com.infomedia.monitoring.ServiceMonitorManager"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Collections"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>
<table cellpadding="3" cellspacing="0">
<tr>
	<td align="center" class="headerCell">Service</td>
	<td align="center" class="headerCell">Method</td>
	<td align="center" class="headerCell">Count</td>
	<td align="center" class="headerCell">Min. Duration</td>
	<td align="center" class="headerCell">Avg. Duration</td>
	<td align="center" class="headerCell">Max. Duration</td>
	<td align="center" class="headerCell">Last Call</td>
	<td align="center" class="headerCell">Errors</td>
</tr>
<%
	Map<ServiceKey, ServiceMonitorInfo> map = ServiceMonitorManager.getInstance().getServiceStats();
    List<String> serviceNames = new ArrayList<String>();
          Map<String, ServiceKey> infosByName = new HashMap<String, ServiceKey>();
	for(Map.Entry<ServiceKey, ServiceMonitorInfo> entry : map.entrySet()) {
              final ServiceKey info = entry.getKey();
              final String name = info.toString();
              serviceNames.add(name);
              infosByName.put(name,info);
          }
          Collections.sort(serviceNames);
          
          for (String serviceName : serviceNames) {
          	ServiceKey info = infosByName.get(serviceName);
          	ServiceMonitorInfo monitorInfo = map.get(info);
          	
          	String cellStyle = "dataCell";
          	if (monitorInfo.getAvgDurationInMs() > 300 
          			&& monitorInfo.getAvgDurationInMs() <= 500) {
          		cellStyle = "dataCellSlow";
          	} else if (monitorInfo.getAvgDurationInMs() > 500 
          			&& monitorInfo.getAvgDurationInMs() <= 2000) {
          		cellStyle = "dataCellSlow2";
          	} else if (monitorInfo.getAvgDurationInMs() > 2000
          			&& monitorInfo.getAvgDurationInMs() <= 5000) {
          		cellStyle = "dataCellSlow3";
          	} else if (monitorInfo.getAvgDurationInMs() > 5000
          			&& monitorInfo.getAvgDurationInMs() <= 20000) {
          		cellStyle = "dataCellSlow4";
          	} else if (monitorInfo.getAvgDurationInMs() > 20000) {
          		cellStyle = "dataCellSlow5";
          	}
          	String errorStyle = monitorInfo.getErrorCount() == 0 ? cellStyle : "dataCellError";
          	%>
		<tr>
			<td align="left" class="<%=cellStyle%>"><%=info.getClassName() %></td>
			<td align="left" class="<%=cellStyle%>"><%=info.getMethodName() %></td>
			<td align="left" class="<%=cellStyle%>"><%=monitorInfo.getInvocationCountDesc() %></td>
			<td align="left" class="<%=cellStyle%>"><%=monitorInfo.getMinDurationInMsDesc() %></td>
			<td align="left" class="<%=cellStyle%>"><%=monitorInfo.getAvgDurationInMsDesc() %></td>
			<td align="left" class="<%=cellStyle%>"><%=monitorInfo.getMaxDurationInMsDesc() %></td>
			<td align="left" class="<%=cellStyle%>"><%=monitorInfo.getLastUsageTimeDescription() %></td>
			<td align="left" class="<%=errorStyle%>"><%=monitorInfo.getErrorCountDesc() %></td>
		</tr>
		<%	
	}
%>
</table>
</html>