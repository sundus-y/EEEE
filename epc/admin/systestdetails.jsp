<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@ page import="au.com.infomedia.epc.management.EPCServiceManager" %>
<%@ page import="au.com.infomedia.epc.management.configuration.*" %>
<%@ page import="au.com.infomedia.util.IfmHttpUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@page import="java.util.List"%>
<%@page import="java.util.regex.Matcher"%>
<%@page import="java.util.regex.Pattern"%>


<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head><title>Infomedia Ltd. EPC - System Test Details</title>
	<link rel="stylesheet" type="text/css" href="resources/public/css/sysinfo.css" media="screen"/>
	<script src="resources/public/js/sysinfo.js" type="text/javascript"></script>

  <%!
      	private static final String CONFIGURATION = "configuration";
  		private static final String TESTNAME = "name";
  		private static final String LTREPLACE = "<span style=\"font-weight:bold;color:maroon;\">&lt;</span>";
  		private static final String GTREPLACE = "<span style=\"font-weight:bold;color:maroon;\">&gt;</span>";
  		
  		private String regexReplace(String originalString, String pattern, String replacement) {
  			return Pattern.compile(pattern, Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.UNIX_LINES).matcher(originalString).replaceAll(Matcher.quoteReplacement(replacement));
  		}
  		
  		private String prepareForHtmlRendering(String text, boolean lineBreakNewElements) {
  			if (lineBreakNewElements) {
  				text = text.replace("<", "\n<");
  				text = text.replace("\n</", "</");
  			}
  			text = text.replace("<", "&lt;");
  			text = text.replace(">", "&gt;");						 
			text = text.replace("&lt;", LTREPLACE);
			text = text.replace("&gt;", GTREPLACE);						
			text = regexReplace(text, "^","<br>");
			text = regexReplace(text, "\t","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			text = text.trim();
			while (text.startsWith("<br>")) {
				text = text.substring(4);
			}
			return text;
  		}
  		
  %><%
    String loadingMessages = null;
  
      EPCConfigurationManager configurationManager = EPCConfigurationManager.getInstance();
      
      String testName = request.getParameter(TESTNAME);
      String configName = request.getParameter(CONFIGURATION);
      
      ConfigurationData configurationData = null;
      ServiceData testService = null;
      List<ServiceData> services = null;
      if (testName != null 
    		  && configName != null 
    		  && StringUtils.isNotEmpty(testName)
    		  && StringUtils.isNotEmpty(configName)) {
    	  
    	  // Load the configuration data...
    	  configurationData = configurationManager.getConfiguration(configName);
    	  
    	  // Load the Service Test to run...
    	  if (configurationData != null) {
    	  	services = configurationData.getServices();
    	  	for(ServiceData service : services) {
    	  		if (service.getName().equalsIgnoreCase(testName)) {
    	  			testService = service;
    	  			break;
    	  		}
    	  	}
    	  }
      } else {
    	  response.getWriter().write("<span style=\"color:maroon;font-weight:bold;font-size:16px;\">Required Parameters not provided!</span>");
    	  response.getWriter().flush();
      }
      
      
      if (testService == null) {
    	  response.getWriter().write("<span style=\"color:maroon;font-weight:bold;font-size:16px;\">Unable to find the Specified Service Test Method!</span>");
    	  response.getWriter().flush();
      } else {
    	  
    	  // Generate the Service Test URL
    	  String url = IfmHttpUtils.getContextBaseUrl(request, false);
    	  String serviceUrl = testService.getUrl();
    	  if (serviceUrl.startsWith("/")) serviceUrl = serviceUrl.substring(1);
    	  
    	  String epcContext = request.getContextPath();
    	  epcContext = epcContext.replace("/", "");
    	  
    	  url += serviceUrl;
    	  url = url.replace("{ctx}", epcContext);
    	  
    	  // Run the service... 
    	  String serviceTestResponse = null;
    	  Throwable serviceTestException = null;
    	  boolean testPassed = false;
    	  try {
    		  serviceTestResponse = configurationManager.invokeServiceTest(url, testService);
    		  
    		  // Check the result...
    		  List<ServiceDataValue> datas = testService.getExpectedDataList();
    	      boolean found = true;
		      if (datas.size() > 0) {
			  	for (ServiceDataValue dataValue : datas) {
			    	boolean res = dataValue.checkResultForThisValue(serviceTestResponse);
			        if (res == false) found = false;
			  	}
		      }
    	      testPassed = found;
    	      
    	  } catch(Throwable e) {
    		  serviceTestException = e;
    	  }
  %>

	<script type="text/javascript">
		function reload() {
			var e = document.getElementById('configurationName');
			if (e) {
				var c = document.getElementById('divTheContent');
				if (c) {
					c.innerHTML = "<h2>Running the Test: " + e.value + "</h2><br><b>Please wait while this test runs....</b>";
				}
				window.location = "systestdetails.jsp?<%=CONFIGURATION%>=<%=configName%>&<%=TESTNAME%>=" + e.value;
			} else {
				alert("Could not find the Test Name!\n\nReturning you to the System Info page instead");
				window.location = "sysinfo.jsp?<%=CONFIGURATION%>=<%=configName%>";
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
					The EPC - System Test Details
				</span>		
			</td>
			<td align="right" valign="bottom">
				<span onclick="window.location='sysinfo.jsp?<%=CONFIGURATION%>=<%=configName%>';" style="cursor:pointer;font-weight:bold;color:white;text-align: center;">
					Return to <%=configName %> System Info
				</span>
			</td>
		</tr></table>
	</div>

	<div id="divTheLoader" style="visibility: visible">
		<h2>Running Validation and System Tests for <%=configName %>: <%=testName %></h2>
		<p style="margin-left: 32px;"><i>Please wait...</i></p>
	</div>

	<div id="content-container" style="visibility: hidden">
		<table width="100%" >
		<tr><td valign="top" align="left" >
			<%if (loadingMessages != null) { %>
				<%=loadingMessages %>
			<%} %>
			</td>
			<td valign="baseline" align="right" >
				<b>Change Test:&nbsp;</b>
				    <select onchange="reload()" id="configurationName">
				            <option></option>
				        <%
				            for (ServiceData service : services) {
				            	String name = service.getName();
				        %>
				            	<option value="<%=name%>" <%=(name.equals(testName)?"selected=true":"")%>><%=name%></option>
				        <%
				            }
				        %>
				    </select>				
			</td>
		</tr>
		</table>

        <div class="content-underline"><!-- empty --></div>
		<div id="divTheContent">
			
		   		<table width="100%" >
				<tr>
					<td align="left" valign="top">
		        		<h1>Details For Test: <%=testService.getName() %></h1>
					</td>

					<td align="right" valign="top">
						<div style="text-align:center;border:solid 2px #000066;color:white;padding:15px;font-size:34px;font-weight:bold;background-color:<%=testPassed ? "green" : "maroon" %>;">
							<%=testPassed ? "PASSED" : "FAILED" %>
						</div>
					</td>
				</tr>
				</table>

                <h3>Test Setup</h3>
                <table cellspacing="0" class="logFileTable" width="80%">
                    <tr>
                        <td class="logFileHeaderCell" align="right" valign="top">Invoked Method:</td>
						<td class="logFileCell" align="left"><%=testService.getUrl().replace("{ctx}", epcContext)%></td>
 					</tr><tr>
						<td class="logFileHeaderCell" align="right" valign="top">Passed Parameters:</td>
						<td class="logFileCell" align="left">
							<%if (testService.getServiceParams() != null && testService.getServiceParams().size() > 0) { %>
								<table width="100%" style="border: solid 1px #990000" cellpadding="1" cellspacing="1">
									<%for(ServiceDataParam param : testService.getServiceParams()) {  %>
										<tr style="border-bottom:solid 1px #990000">
											<td width="25%" align="right" valign="top" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:bold;color:navy;">
													<%=param.getKey() %>
												</span>
											</td>
											<td align="left" style="border-bottom:solid 1px #990000">
													<%=prepareForHtmlRendering(param.getVal(), false) %>
											</td>
										</tr>
									<%} %>
								</table>
							<%} else { %>
								<i>No Parameters included in this Request</i>
							<%} %>
						</td>
					</tr><tr>
						<td class="logFileHeaderCell" align="right" valign="top">Passed Headers:</td>
						<td class="logFileCell" align="left">
							<%if (testService.getHeaderParams() != null && testService.getHeaderParams().size() > 0) { %>
								<table width="100%" style="border: solid 1px #990000" cellpadding="1" cellspacing="1">
									<%for(ServiceDataParam param : testService.getHeaderParams()) {  %>
										<tr style="border-bottom:solid 1px #990000">
											<td width="25%" align="right" valign="top" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:bold;color:navy;">
													<%=param.getKey() %>
												</span>
											</td>
											<td align="left" style="border-bottom:solid 1px #990000">
												<span style="font-weight:regular;color:black;">
													<%=prepareForHtmlRendering(param.getVal(), false) %>
												</span>
											</td>
										</tr>
									<%} %>
								</table>
							<%} else { %>
								<i>No Headers included in this Request</i>
							<%} %>
						</td>
					</tr><tr>
                        <td class="logFileHeaderCell" align="right" valign="top">Expected to find Result(s):</td>
						<td class="logFileCell" align="left">
							<%if (testService.getExpectedDataList() != null && testService.getExpectedDataList().size() > 0) { %>
								<table style="border: solid 1px #990000" cellpadding="1" cellspacing="1">
										<tr style="border-bottom:solid 1px #990000">
											<td width="25%" align="center" valign="top" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:bold;color:green;">Check Type</span>
											</td>
											<td width="5%" align="center" valign="top" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:bold;color:green;">Formula</span>
											</td>
											<td width="50%" align="center" valign="top" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:bold;color:green;">Value</span>
											</td>
											<td width="20%" align="center" valign="top" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:bold;color:green;">Result</span>
											</td>
										</tr>
									<%for(ServiceDataValue val : testService.getExpectedDataList()) {  %>
										<tr style="border-bottom:solid 1px #990000">
											<td align="right" valign="top" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:bold;color:navy;">
													<%=val.getType() %>
												</span>
											</td>
											<td align="center" valign="top" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:bold;color:navy;">
													<%=prepareForHtmlRendering(val.getFormula(), false) %>
												</span>
											</td>
											<td align="left" style="border-bottom:solid 1px #990000;border-right:solid 1px #ee4455">
												<span style="font-weight:regular;color:black;">
													<%=prepareForHtmlRendering(val.getValue(), false) %>
												</span>
											</td>
											<td align="center" class="<%=val.isLastCheckResult() ? "PassCell" : "FailCell" %>">
												<%=val.isLastCheckResult() ? "PASSED" : "FAILED" %>
											</td>
										</tr>
									<%} %>
								</table>
							<%} else { %>
								<i>Not Response data checks</i>
							<%} %>
						</td>
                    </tr>
                </table>

			<hr>
			<h3>Invoked Method Result Data</h3>
			<small><i>[Expected and Unexpected Results will be highlighted (each find result type will be highlighted in a different colour)]</i></small>			
			<div id="methodResultsDiv" style="margin-left:23px;width:80%;background-color:#dceedc;border:solid 1px #000066;">
				<%if (serviceTestResponse != null) { %>
					<%
						String outputResponse = prepareForHtmlRendering(serviceTestResponse, true);
						int dataHighlighterNumber = 0;
						if (testService.getExpectedDataList() != null) {
							for(ServiceDataValue val : testService.getExpectedDataList()) {
								if (val.isHighlightable()){
									String hVal = val.getHighlighterValue();
									hVal = prepareForHtmlRendering(hVal, false);
									
									String hColour = "";
									switch(dataHighlighterNumber) {
										case 0:  hColour = "yellow";break;
										case 1:  hColour = "lime";break;										
										case 2:  hColour = "purple;color:white";break;
										case 3:  hColour = "blue;color:white";break;
										case 4:  hColour = "olive;color:white";break;
										case 5:  hColour = "red;color:white";break;
										case 6:  hColour = "gray;color:white";break;
										case 7:  hColour = "teal;color:white";break;
										case 8:  hColour = "green;color:white";break;
										default: hColour = "yellow";break;
									}
									
									String highlightedData = "<span style=\"background-color:" + hColour + ";\">" + hVal + "</span>";
									outputResponse = outputResponse.replace(hVal, highlightedData);
									
									dataHighlighterNumber++;
									if(dataHighlighterNumber > 9) dataHighlighterNumber = 0;									
								}
							}
						}
					%>
					<%=outputResponse %>
				<%} else if (serviceTestException != null) { %>
					<span style="color:maroon;font-weight:bold;font-size:14px;">
						INVOKED METHOD RETURNED AN EXCEPTION
					</span>
					<br>
					<table>
					<tr>
						<td align="right">
							<span style="color:navy;font-weight:bold;">
								Message:
							</span>
						</td>
						<td align="left">
							<%=serviceTestException.getMessage() %>
						</td>
					</tr>					
					<tr>
						<td align="right">
							<span style="color:navy;font-weight:bold;">
								Exception:
							</span>
						</td>
						<td align="left">
							<%=serviceTestException.getClass() %>
						</td>
					</tr>
					<tr>
						<td align="right">
							<span style="color:navy;font-weight:bold;">
								Cause:
							</span>
						</td>
						<td align="left">
							<%=serviceTestException.getCause() == null ? "Unknown" : serviceTestException.getCause().getMessage() %>
						</td>
					</tr>
					<tr>
						<td align="right" valign="top">
							<span style="color:navy;font-weight:bold;">
								Stack:
							</span>
						</td>
						<td align="left">
							<%
							StringBuilder sb = new StringBuilder();
							StackTraceElement[] stack = serviceTestException.getStackTrace();
							boolean first = true;
			                for (StackTraceElement element : stack) {
			                	if (!first) sb.append("<br>");
			                    sb.append(String.format("<b>Class: </b>%s, at Line: %s", StringUtils.defaultString(element.getClassName(), "Unknown Class"), StringUtils.defaultString(Integer.toString(element.getLineNumber()), "-1")));
			                    first = false;
			                }
							%>
							<%=sb.toString() %>
						</td>
					</tr>
					</table>
				<%} else { %>
					<span style="color:maroon;font-weight:bold;">UNKNOWN PROBLEM OCCURRED THAT PREVENTED THIS TEST FROM BEING PERFORMED PROPERLY!!</span>
				<%} %>
			</div>

 			<%if (!testPassed) { %>
				<h3>Notes for Resolving this Issue</h3>
				<div id="resolutionNotesDiv" style="margin-left:23px;width:80%;background-color:#eedcdc;border:solid 1px #000066;">
					<%=testService.getNotes() %>
				</div>
			<%} %>
</div>


    </div>

    <br/>
    <br/>

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
		// Now Display the page....
		var dLoader = document.getElementById('divTheLoader');
		var dContent = document.getElementById('content-container');
		if (dLoader) {
			dLoader.style.display = 'none';
		}
		if (dContent) {
			dContent.style.visibility = 'visible';
		}
	</script>

</body>

<%
	} // End of the serviceTest is null if statement...
%>
</html>
