<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="au.com.infomedia.configuration.ConfigurationManager"%>
<%@page import="au.com.infomedia.epc.context.ContextManager"%>
<%@page import="au.com.infomedia.epc.dataaccess.ConnectionFactory"%>

<%@ page import="au.com.infomedia.epc.management.EPCServiceManager" %>

<%@page import="au.com.infomedia.epc.management.configuration.ConfigurationData"%>
<%@page import="au.com.infomedia.epc.management.configuration.EPCConfigurationManager"%>
<%@page import="au.com.infomedia.epc.management.logging.EPCLoggingManager"%>

<%@page import="au.com.infomedia.util.RuntimeUtils"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.util.Map"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8" %>

<head><title>Infomedia Ltd. EPC - Admin Home</title>
	<link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
	<%
		String loadingMessages = null;

		String buildNumber = EPCServiceManager.getInstance().getBuildNumber();
		if (buildNumber == null) {
			buildNumber = "developersbuild";
		}

		String eid = request.getParameter("exceptionid");
		if (eid != null) {
			String logFileName = EPCLoggingManager.getLogFileForException(eid);
			if (logFileName != null) {
				response.sendRedirect("log.jsp?file=" + response.encodeURL(logFileName) + "&messagefilter=ERROR%20" + response.encodeURL(eid));
			} else {
				loadingMessages = "<span style=\"font-size:14px;color:maroon;font-weight:bold;\">Could not find the Exception ID: " + eid + "</span>";
			}
		}

		String lookupPropName = request.getParameter("lookupprop");
		String lookupPropNameVal = null;
		String lookupPropNameNS = null;
		String lookupPropNameName = null;
		if (lookupPropName != null && lookupPropName.equalsIgnoreCase("true")) {
			lookupPropNameNS = request.getParameter("ns");
			lookupPropNameName = request.getParameter("name");
			if (lookupPropNameName == null || lookupPropNameName.length() == 0) {
				String[] nsArr = lookupPropNameNS.split("\\.");
				StringBuilder sb = new StringBuilder();
				StringBuilder sb2 = new StringBuilder();
				int lookbackCounter = 1;
				if (nsArr[nsArr.length-1].contains("]")) {
					int p = nsArr.length-1;
					lookbackCounter = 1;
					boolean done = false;
					while (p > 0 && !done) {
						if (nsArr[p].contains("[")) {
							done = true;
						} else {
							lookbackCounter++;
						}

						p--;
					}
				} else if (nsArr[nsArr.length-2].contains("]")) {
					int p = nsArr.length-2;
					lookbackCounter = 2;
					boolean done = false;
					while (p > 0 && !done) {
						if (nsArr[p].contains("[")) {
							done = true;
						} else {
							lookbackCounter++;
						}
						p--;
					}
				}

				for(int i = 0; i < nsArr.length; i++) {
					if (i > 0 && i < nsArr.length - lookbackCounter) {
						sb.append(".");
					} else if (i > nsArr.length - lookbackCounter) {
						sb2.append(".");
					}

					if (i < nsArr.length - lookbackCounter) {
						sb.append(nsArr[i]);
					} else {
						sb2.append(nsArr[i]);
					}
				}
				lookupPropNameNS = sb.toString();
				lookupPropNameName = sb2.toString();
			}
			Object val = ConfigurationManager.getCurrentSettingValue(lookupPropNameNS, lookupPropNameName);
			if (val != null) {
				lookupPropNameVal = val.toString();
			} else {
				lookupPropNameVal = "Could not find Property!";
			}
		}

	%>

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


		function lookupPropertyVal() {
			var ex = document.getElementById('propertyName');
			var ns = document.getElementById('propertyNamespace');
			if (!ex || !ns) {
				alert('Could not Lookup Property Value!!');
				return;
			}

			var exID = ex.value;
			/*
			if (exID == null || exID.length == 0) {
				alert('Please enter a Property Name first!');
				return;
			}
			*/


			var nsID = ns.value;
			if (nsID == null || nsID.length == 0) {
				alert('Please enter a Property Namespace first!');
				return;
			}


			var e = document.getElementById('divTheContent');
			if (e) {
				var valName = (exID == null || exID.length == 0) ? nsID : exID;
				e.innerHTML = '<div style="margin-left:23px;"><h3>Looking up Property <span style="color:purple;">[' + valName + ']</span> in the Configuration files</h3><br/><p>Please wait...</p></div>';
			}

			window.location = 'admin.jsp?lookupprop=true&name=' + exID + '&ns=' + nsID;
		}

		function updatePropertyVal() {
			var ex = document.getElementById('propertyName');
			var ns = document.getElementById('propertyNamespace');
			var nv = document.getElementById('newPropertyValue');
			if (!ex || !ns || !nv) {
				alert('Could not Update Property Value!!');
				return;
			}

			var exID = ex.value;
			if (exID == null || exID.length == 0) {
				alert('Please enter a Property Name first!');
				return;
			}


			var nsID = ns.value;
			if (nsID == null || nsID.length == 0) {
				alert('Please enter a Property Namespace first!');
				return;
			}

			var nvVal = nv.value;
			if (nvVal == null) {
				alert('Please enter the new Property Value first!');
				return;
			}
			var e = document.getElementById('divTheContent');
			if (e) {
				e.innerHTML = '<div style="margin-left:23px;"><h3>Updating Property <span style="color:purple;">[' + exID + ']</span> in the Configuration files</h3><br/><p>Please wait...</p></div>';
			}

			window.location = 'admin.jsp?updateprop=true&name=' + exID + '&ns=' + nsID + '&nv=' + nvVal;

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
					The EPC Admin Homepage
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
			<%if (loadingMessages != null) { %>
				<%=loadingMessages %>
			<%} %>
			</td>
		<td valign="baseline" align="right" >
			<!--<table><tr>
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
		--></td>
		</tr>
		</table>


        <div class="content-underline"><!-- empty --></div>

		<div id="divTheContent">
            <%
                ConfigurationData currentConfig = EPCConfigurationManager.getExpectedConfiguration();
            %>
            <br /><br />
            <p>
                <%if(currentConfig != null) { %>
                    <B>Current Configuration:</B>&nbsp;<%=currentConfig.getName() %>
                <%} else { %>
                    <B>No Expected Configuration Settings Loaded</B>
                    <br/><i>Please add the following setting to the ifm-config.properties file:</i>
                    <br/><small>au.com.infomedia.epc.configuration.EPCSettingsConfigData.useConfiguration</small>
                <%} %>
            </p>
			<table cellspacing="0" cellpadding="10px" width="100%">
			<tr>
			<td valign="top" align="left">
				<ul>
					<li>
						<span onclick="gotoPage('Dashboard.jsp', 'Opening the Connection Dashboard');" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Connections Dashboard
						</span>
					</li>
					<li>
						<span onclick="gotoPage('monitor.jsp', 'Opening the Service Statistics Summary');" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Service Monitoring page
						</span>
					</li>

					<li>
						<span onclick="gotoPage('serviceSummary.jsp', 'Opening the Service Statistics Summary');" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Service Statistics Summary
						</span>
					</li>

					<li>
						<span onclick="gotoPage('logmanager.jsp', 'Opening the Log Manager');" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Log4j Manager
						</span>
					</li>
					<li>
						<span onclick="gotoPage('cachemanager.jsp', 'Opening the Cache Manager Application');" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							EhCache Cache Manager
						</span>
					</li>
					<li>
						<span onclick="gotoPage('logs.jsp', 'Looking for the Log files...');" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Tomcat Logs
						</span>
					</li>
					<li>
						<span onclick="gotoPage('log.jsp?file=<%=URLEncoder.encode("epc." + buildNumber + ".log", "UTF-8")%>', 'Opening the Log File: epc.<%=buildNumber %>.log');" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							CURRENT EPC Log File
						</span>
					</li>
					<li>
						<span onclick="gotoPage('servicesApp.jsp', 'Opening the Service Testing Application');" class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Service Testing Application
						</span>
					</li>
                    <li>
						<span onclick="gotoPage('searchCacheManager.jsp', 'Opening the Search Cache Manager');"
                              class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Search Cache Manager
						</span>
                    </li>
					<li>
						<span onclick="gotoPage('componentRegistryManager.jsp', 'Opening the Component Registry Manager');"
                              class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Component Registry Manager
						</span>
                    </li>
					<li>
						<span onclick="gotoPage('userValidator.jsp', 'Opening the User Validator');"
                              class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							User Validator
						</span>
                    </li>
					<li>
						<span onclick="gotoPage('missingImageReport.jsp', 'Opening the Missing Image Report');"
                              class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Missing Image Report
						</span>
                    </li>
					<li>
						<span onclick="gotoPage('sectionReport.jsp', 'Opening the Section Data Report');"
                              class="clickableDivBlue" onmouseover="setClass(this, 'clickableDivRed');" onmouseout="setClass(this, 'clickableDivBlue');">
							Section Data Report
						</span>
                    </li>
				</ul>


				<br/><br/><br/>

				<table cellspacing="0" class="logFileTable">
				<tr class="logFileRow">
					<td class="logFileCell" align="left">
						<table>
						<tr>
							<td align="right"><B>Setting Namespace:</B></td>
							<td align="left" colspan="2">
								<input type="text" size="65" id="propertyNamespace" value="<%=lookupPropNameNS == null ? "" : lookupPropNameNS %>" />
							</td>
						</tr>
						<tr>
							<td align="right"><B>Setting Name:</B></td>
							<td align="left">
								<input type="text" size="65" id="propertyName" value="<%=lookupPropNameName == null ? "" : lookupPropNameName %>" />
							</td>
							<td align="right">
								<span class="clickableDivBlue" onclick="lookupPropertyVal();" class="clickableDivBlue" style="border:solid 1px #000066;margin:2px;padding:2px;">
									LOOKUP
								</span>
							</td>
						</tr>
						<tr>
							<td align="right" colspan="3"><small><i>(You can paste the entire property Namespace and Name into the <b>namespace</b> field (and leave the <b>name</b> field blank), and the server will interpret it for you)</i></small></td>
						</tr>
						<%if (lookupPropNameVal != null) { %>
							<tr>
								<td align="right"><B>Setting Value:</B></td>
								<td align="left">
									<span style="color:navy;">
										<%= lookupPropNameVal%>
									</span>
								</td>
							</tr>
						<%} %>
						</table>
					</td>
				</tr></table>


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

                <h2>MS SQL Connection Pool Status</h2>
                <%
                	Map<String, Integer> conMap = ConnectionFactory.getMSSQLConnectionBusyStats();
                %>
                <table border="0" cellpadding="2" cellspacing="0" style="border: solid 1px #000066">
               	<tr >
           			<td style="border: solid 1px #000066;border-bottom:solid 2px #000066"><center><b>Database Name</b></center></td>
           			<td style="border: solid 1px #000066;border-bottom:solid 2px #000066"><center><b>No. of Busy Connections</b></center></td>
           		</tr>
                <%for(Map.Entry<String, Integer> entry : conMap.entrySet()) { %>
            		<tr>
            			<td style="border-left: solid 1px #000066;border-bottom: solid 1px #000066"><%=entry.getKey() %></td>
            			<td align="center" style="border-left: solid 1px #000066;border-right: solid 1px #000066;border-bottom: solid 1px #000066"> <%=entry.getValue()%></td>
            		</tr>
            	<%} %>
            	</table>
			</td>

			<td valign="top" align="right">
			</td>
			</tr></table>


			<br><br><br>


			</td>
			</tr></table>

		</div>


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