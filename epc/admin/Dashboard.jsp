<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="au.com.infomedia.epc.management.EPCServiceManager"%>
<%@page import="au.com.infomedia.epc.management.configuration.ConfigurationData"%>
<%@page import="au.com.infomedia.epc.management.configuration.ConnectionData"%>
<%@page import="au.com.infomedia.epc.management.configuration.EPCConfigurationManager"%>
<%@page import="au.com.infomedia.util.connection.ConnectionState"%>
<%@ page import="au.com.infomedia.util.connection.ConnectionValidator" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>

<head><title>Infomedia Ltd. EPC - Dashboard</title>
    <link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
    <script src="resources/public/js/dashboard.js" type="text/javascript"></script>
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
					The EPC Connections Dashboard
				</span>
                </td>
                <td align="right" valign="bottom">
				<span onclick="window.location='admin.jsp';"
                      style="cursor:pointer;font-weight:bold;color:white;text-align: center;">
					Return to Admin Home
				</span>
                </td>
            </tr>
        </table>
    </div>

    <div id="content-container">
        <br>

        <div class="content-underline"><!-- empty --></div>

        <br>
        <table cellspacing="0" class="logFileTable">
            <tr class="logFileHeaderRow">
                <td class="logFileHeaderCell" align="center">&nbsp;</td>
                <td class="logFileHeaderCell" align="center">Connection</td>
                <td class="logFileHeaderCell" align="center">State</td>
            </tr>

            <!-- Content -->
            <%
			int rowNum = 0; 

            ConfigurationData configurationData = EPCConfigurationManager.getExpectedConfiguration();
            if (configurationData == null) {
                configurationData = EPCConfigurationManager.getInstance().getConfiguration("ALL");
            }
            if (configurationData != null) {

                for(ConnectionData con : configurationData.getConnections()) {
                        ConnectionState state = ConnectionValidator.validateConnection(con.getName());
                        String overClass = state == ConnectionState.AVAILABLE ? "logFileCellOverGreen" : (state == ConnectionState.UNAVAILABLE ? "logFileCellOverRed" : "logFileCellOverOrange");
                %>
                        <tr class="logFileRow" onmouseover="setRowClass('<%=overClass %>', <%=rowNum %>);" onmouseout="setRowClass('logFileCell', <%=rowNum %>);">
                        <td class="logFileCell" id="tdImage_<%=rowNum %>">
                            <%
                                switch(state) {
                                    case AVAILABLE:
                                        %><img src="resources/public/images/green.gif" height="15px;" /><%
                                        break;
                                    case UNAVAILABLE:
                                        %><img src="resources/public/images/red.gif" height="15px;" /><%
                                        break;
                                    case UNKNOWN:
                                    default:
                                        %><img src="resources/public/images/orange.gif" height="15px;" /><%
                                }
                            %>
                        </td>

                        <td class="logFileCell" id="tdName_<%=rowNum %>">
                            <span " style="cursor:pointer;font-weight:bold;color:Navy;text-align: center;">
                                <%=con.getName() %>
                            </span>
                        </td>

                        <td class="logFileCell" id="tdState_<%=rowNum %>">
                            <%=state %>
                        </td>

                        </tr>
            <%
                        rowNum++;
                }
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
		switchAutoRefresh(false);
		window.setInterval('executeUpdateTimer()', reloadInterval);
	</script>
</body>
</html>