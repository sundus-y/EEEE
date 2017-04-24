<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page import="au.com.infomedia.epc.management.EPCServiceManager" %>
<%@ page import="au.com.infomedia.epc.search.loaders.LoaderManager" %>
<%@ page import="au.com.infomedia.util.RuntimeUtils" %>
<%@ page import="java.util.Map" %>
<%@ page import="au.com.infomedia.epc.search.loaders.Loader" %>
<%--
  Created by IntelliJ IDEA.
  User: hyu
  Date: 01/05/2009
  Time: 10:40:32 AM
  To change this template use File | Settings | File Templates.
--%>
<script>
    function gotoPage(url, message) {
        var e = document.getElementById('divTheContent');
        if (e) {
            e.innerHTML = '<div style="margin-left:23px;"><h3>' + message + '</h3><br/><p>Please wait...</p></div>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                            '<a href="searchCacheManager.jsp">REFRESH<a/>';
        }
        window.location = url;
    }
</script>
<%
    String action = request.getParameter("action");
    String loaderName = request.getParameter("loaderName");

    if ("SWITCH_ON".equalsIgnoreCase(action)){
        LoaderManager.getInstance().switchOn(loaderName);
        response.sendRedirect("searchCacheManager.jsp");
    } else if ("SWITCH_OFF".equalsIgnoreCase(action)){
        LoaderManager.getInstance().switchOff(loaderName);
        response.sendRedirect("searchCacheManager.jsp");
    }                    
%>


<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>
    <head><title>Infomedia Ltd. EPC - Dashboard</title>
	    <link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
	    <script src="resources/public/js/searchCacheManager.js" type="text/javascript"></script>
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
                            The EPC Search Indexing Cache Manager
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

            <div id="divTheContent">
                <table cellspacing="0" class="logFileTable" width="100%">
                    <tr class="logFileHeaderRow">
                        <td class="logFileHeaderCell" align="center">&nbsp;</td>
                        <td class="logFileHeaderCell" align="center">Loader Name</td>
                        <td class="logFileHeaderCell" align="center">Status</td>
                        <!--
                        <td class="logFileHeaderCell" align="center">Loading</td>
                        -->
                        <td class="logFileHeaderCell" align="center">Notes</td>
                        <td class="logFileHeaderCell" align="center">Switch On/Off</td>
                    </tr>
                <%
                    int rowNum = 0;
                    for(Map.Entry<String, Loader> entry : LoaderManager.getInstance().getLoadersByName().entrySet()) {
                        Loader loader = entry.getValue();
                        String overClass = loader.getStatus()?"logFileCellOverGreen":"logFileCellOverRed";
                        String color;
                        if(loader.getStatus()) {
                            if (loader.getLoadingFlag()) {
                                color = "orange";
                            } else {
                                if (loader.getLoaded()) {
                                    color = "green";
                                } else {
                                    color = "orange";
                                }
                            }
                        } else {
                            color = "red";
                        }
                %>
                    <tr class="logFileRow" onmouseover="setRowClass('<%=overClass %>', <%=rowNum %>);" onmouseout="setRowClass('logFileCell', <%=rowNum %>);">
                        <td class="logFileCell" id="tdImage_<%=rowNum %>">
                            <img src="resources/public/images/<%=color%>.gif" height="15px;" />
                        </td>
                        <td class="logFileCell" id="tdName_<%=rowNum %>">
                            <%=entry.getKey()%>
                        </td>
                        <td class="logFileCell" id="tdStatus_<%=rowNum %>">
                            <%
                                if (loader.getStatus()) {
                                    if (loader.getLoadingFlag()) {
                            %>
                                        <span style="color:blue;font-weight:bold">Loading...</span>
                                <%
                                    } else {
                                        if (loader.getLoaded()) {
                                    %>
                                            <span style="color:green">In memory</span>
                                    <%
                                        } else {
                                    %>
                                            Idle
                                    <%
                                        }
                                    }
                                %>
                            <%
                                } else {
                            %>
                                    OFF
                            <%
                                }
                            %>
                        </td>
                        <!--
                        <td class="logFileCell" id="tdLoading_<%=rowNum %>">
                            <%=loader.getLoadingFlag()?"YES":"NO"%>
                        </td>
                        -->
						<td class="logFileCell" id="tdNote_<%=rowNum %>">
                            <%=loader.getNotes()%>
                        </td>
                        <td class="logFileCell" id="tdSwitch_<%=rowNum %>">
                            <div onclick="" class="clickableDivBlue">
                                <a onclick="gotoPage('searchCacheManager.jsp?action=switch_<%=loader.getStatus()?"OFF":"ON"%>&loaderName=<%=entry.getKey()%>', '');">
                                    <u>SWITCH <%=loader.getStatus()?"OFF":"ON"%></u>
                                </a>
                            </div>
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