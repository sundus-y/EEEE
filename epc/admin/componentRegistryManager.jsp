<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page import="au.com.infomedia.epc.management.EPCServiceManager" %>
<%@ page import="au.com.infomedia.epc.search.component.*" %>
<%@page import="au.com.infomedia.util.RuntimeUtils"%>
<%@page import="au.com.infomedia.epc.search.component.registry.ComponentRegistry"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Collection"%>
<%@page import="au.com.infomedia.epc.search.component.registry.ComponentRegistration"%>
<%@page import="au.com.infomedia.epc.search.component.registry.ComponentRegistrationStatus"%>
<%@page import="java.text.DecimalFormat"%>
<%@ page contentType="text/html; charset=UTF-8" %>


<%
    String action = request.getParameter("action");
	ComponentRegistry registry = ComponentRegistry.getRegistry();
	List<ComponentRegistration> registrationList = registry.getAllComponentRegistrations();
	if (action != null) {
		if (action.equalsIgnoreCase("pingallreg")) {
			registry.checkAllRegistrations();
			response.sendRedirect("componentRegistryManager.jsp");
		} else if (action.equalsIgnoreCase("restartrmi")) {
			registry.restartRMIServer();
			response.sendRedirect("componentRegistryManager.jsp");
		} else if (action.equalsIgnoreCase("ping") 
				|| action.equalsIgnoreCase("unregister")) {
			String component = request.getParameter("component");
			String type = request.getParameter("type");
			String location = request.getParameter("location");
			String port = request.getParameter("port");
			String version = request.getParameter("version");
			if (component != null && type != null 
					&& location != null && port != null) {
				
				for(ComponentRegistration reg : registrationList) {
					if (reg.getComponentClass().getName().equalsIgnoreCase(component) 
							&& reg.getLocation().equalsIgnoreCase(location)
							&& reg.getComponentVersion().equalsIgnoreCase(version)
							&& reg.getRegistrationType().toString().equalsIgnoreCase(type)
							&& Integer.toString(reg.getPort()).equals(port)) {
						
						if (action.equalsIgnoreCase("ping")) {
							reg.ping();
						} else if (action.equalsIgnoreCase("unregister")){
							registry.unregister(reg);
						}
						break;
					}
				}
				response.sendRedirect("componentRegistryManager.jsp");
			}
		}
	}

%>
	
<%@page import="java.util.List"%>
<%@page import="au.com.infomedia.epc.search.component.registry.ComponentServerConfig"%><html xmlns="http://www.w3.org/1999/xhtml">
    <head><title>Infomedia Ltd. EPC - Component Registry Manager</title>
	    <link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
	    <script src="resources/public/js/componentRegistryManager.js" type="text/javascript"></script>
    </head>

    <body>
    <div id="body-wrapper">

        <div id="masthead-container">
            <table width="100%">
                <tr>
                    <td align="left" valign="top">
                        <img src="resources/public/images/IFM-Logo.png" alt="logo"/>
                        <br/>
                        <span class="loginPageTitleText">
                            The EPC Search Component Registry Manager
                        </span>
                    </td>
                    <td align="right" valign="bottom">
                        <span onclick="window.location='admin.jsp';" style="cursor:pointer;font-weight:bold;color:white;text-align: center;">
                            Return to Admin Home
                        </span>
                    </td>
                </tr>
            </table>
        </div>

        <div id="content-container">
            <table width="100%" >
		        <tr>
                    <td valign="top" align="left" >
                        Used memory: <%=RuntimeUtils.getUsedMemoryDescriptionMb()%>, Free Memory: <span style="color:maroon;"><%=RuntimeUtils.getFreeMemoryDescriptionMb() %></span>
		            </td>
		            <td valign="baseline" align="right" >
			            <table>
                            <tr>
			                    <td>
				                    <span style='margin-left:10px;padding:3px;'>Auto refresh:</span>
				                    <div id='refreshButton' style='display:inline;margin-left:2px;border:1 solid black;padding:3px;cursor:pointer;background-color:maroon;color:white;'
						                onclick='switchAutoRefresh(true)'>OFF</div>
			                    </td>
			                    <td>
				                    <div id='refreshIn' style='display:inline;margin-left:2px;border:1 solid black;padding:3px;'>20 secs</div>
			                    </td>
			                </tr>
                        </table>
		            </td>
		        </tr>
		    </table>
            
            <div class="content-underline"><!-- empty --></div>
            <br>
			 <div style="horizontal-align:center">
                  <a onclick="pingAllRegistrations();" style="cursor:pointer;">
                      <u>Ping All Registrations</u>
                  </a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a onclick="restartRmiServer();" style="cursor:pointer;">
						<u>Restart the RMI Server</u>
					</a>
              </div>


            <div id="divTheContent">
				<h3>Remote Registrations</h3>
                <table cellspacing="0" class="logFileTable" width="95%">
                    <tr class="logFileHeaderRow">
                        <td class="logFileHeaderCell" align="center">&nbsp;</td>
                        <td class="logFileHeaderCell" align="center">Component</td>
                        <td class="logFileHeaderCell" align="center">Location</td>
                        <td class="logFileHeaderCell" align="center">Port</td>                        
                        <td class="logFileHeaderCell" align="center">Ping Time</td>
                        <td class="logFileHeaderCell" align="center">Version</td>
						<td class="logFileHeaderCell" align="center">Type</td>
						<td class="logFileHeaderCell" align="center">Ping</td>
						<td class="logFileHeaderCell" align="center">Unregister</td>
                    </tr>
                <%                	
                	int rowNum = 0;
                    DecimalFormat dFormat = new DecimalFormat("###,###");
                    DecimalFormat dFormat2 = new DecimalFormat("###,###.000");
                    
                   	for(ComponentRegistration registration : registrationList) {
                   	
                   		String overClass = registration.getStatus() == ComponentRegistrationStatus.ACTIVE 
                   								? "logFileCellOverGreen" 
                   								: (registration.getStatus() == ComponentRegistrationStatus.BUSY 
                   										? "logFileCellOverOrange" : "logFileCellOverRed");
                           String color;
                           switch(registration.getStatus()) {
                           	case ACTIVE:
                           		color = "green";
                           		break;
                           	case DOWN:
                           		color = "red";
                           		break;
                           	default:
                           	//case BUSY: 
                           		color = "orange";
                           		break;
                           }
                           
                           %>

					<tr class="logFileRow" onmouseover="setRowClass('<%=overClass %>', <%=rowNum %>);" onmouseout="setRowClass('logFileCell', <%=rowNum %>);">
                        <td class="logFileCell" id="tdImage_<%=rowNum %>">
                            <img src="resources/public/images/<%=color%>.gif" height="15px;" />
                        </td>
                        <td class="logFileCell" id="tdComponent_<%=rowNum %>">
                            <%=registration.getComponentClass().getSimpleName()%>
                        </td>
						<td class="logFileCell" id="tdLocation_<%=rowNum %>">
                            <%=registration.getLocation()%>
                        </td>
						<td class="logFileCell" id="tdPort_<%=rowNum %>">
                            <%=registration.getPort()%>
                        </td>
						<td class="logFileCell" id="tdPing_<%=rowNum %>">
                            <%=registration.getPingLength() == -1 ? "Uncontactable" : dFormat.format(registration.getPingLength()) + " ns (" + dFormat2.format(registration.getPingLength()/1000000f) + " ms)" %> 
                        </td>
						<td class="logFileCell" id="tdVersion_<%=rowNum %>">
                            <%=registration.getComponentVersion()%>
                        </td>
						<td class="logFileCell" id="tdType_<%=rowNum %>">
                            <%=registration.getRegistrationType()%>
                        </td>
						<td class="logFileCell" id="tdPingAction_<%=rowNum %>">
                            <div onclick="" class="clickableDivBlue">
                                <a onclick="pingRegistration('<%=registration.getComponentClass().getName()%>', '<%=registration.getLocation()%>', '<%=registration.getPort()%>', '<%=registration.getRegistrationType().toString()%>', '<%=registration.getComponentVersion()%>');">
                                    <u>Ping</u>
                                </a>
                            </div>
                        </td>
						<td class="logFileCell" id="tdUnregisterAction_<%=rowNum %>">
                            <div onclick="" class="clickableDivBlue">
                                <a onclick="unregisterRegistration('<%=registration.getComponentClass().getName()%>', '<%=registration.getLocation()%>', '<%=registration.getPort()%>', '<%=registration.getRegistrationType().toString()%>', '<%=registration.getComponentVersion()%>');">
                                    <u>Unregister</u>
                                </a>
                            </div>
                        </td>
                    </tr>
					<%
						rowNum++;
                   	}
                %>                   
                </table>

				<hr>
				<h3>Registered Servers</h3>
				<table cellspacing="0" class="logFileTable" width="50%">
                    <tr class="logFileHeaderRow">
                        <td class="logFileHeaderCell" align="center">&nbsp;</td>
                        <td class="logFileHeaderCell" align="center">Type</td>
                        <td class="logFileHeaderCell" align="center">Location</td>
                        <td class="logFileHeaderCell" align="center">Port</td>                        
                        <td class="logFileHeaderCell" align="center">Login Token</td>
                    </tr>
                <%                	
                	rowNum = 0;
                    for(ComponentServerConfig serverConfig : registry.getRegisteredServers()) {
                    	%>
						<tr class="logFileRow">
	                        <td class="logFileCell" id="tdImage_<%=rowNum %>">
	                            <img src="resources/public/images/green.gif" height="15px;" />
	                        </td>
	                        <td class="logFileCell" id="tdServerType_<%=rowNum %>">
	                            <%=serverConfig.getServerType()%>
	                        </td>
	                        <td class="logFileCell" id="tdServerLocation_<%=rowNum %>">
	                            <%=serverConfig.getLocation()%>
	                        </td>
							<td class="logFileCell" id="tdServerPort_<%=rowNum %>">
	                            <%=serverConfig.getPort()%>
	                        </td>
							<td class="logFileCell" id="tdServerLogin_<%=rowNum %>">
	                            <%=serverConfig.getLoginToken()%>
	                        </td>
						</tr>
						<%
							rowNum++;
	                   }
	                %>                   
	                </table>
            </div>
        </div>

        <div id="footer-container">
            <div class="column-container">
                <div class="column1"><%= EPCServiceManager.getInstance().getEPCVersionBuild() %></div>
                <div class="column2">Copyright &nbsp;&copy;&nbsp; Infomedia Limited 2008</div>
            </div>
            <div class="column-end"><!-- empty --></div>
        </div>
    
    </div>
    
    <script type="text/javascript">		
		window.setInterval('executeUpdateTimer()', reloadInterval);
	</script>

    </body>
</html>