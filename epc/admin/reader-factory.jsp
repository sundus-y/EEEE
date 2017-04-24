<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@page import="java.text.DecimalFormat"%>
<%@page import="au.com.infomedia.epc.dataaccess.offline.FileReaderFactory.ReaderFactoryInfo"%>
<%@page import="java.util.List"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@page import="au.com.infomedia.epc.dataaccess.offline.FileReaderFactory"%>
<%
	List<ReaderFactoryInfo> list = FileReaderFactory.getFactoryInfo();


	long ramSize = 0;int ramCount = 0;
	long mapSize = 0;int mapCount = 0;
	long basicSize = 0;int basicCount = 0;
	
%>


<%!
	DecimalFormat formatter = new DecimalFormat("0.00");
	public String printInMB(long sizeInBytes) {
		double size = (double)sizeInBytes / 1048576d;
		return formatter.format(size);
	}
%>
<html>	
<head> 
	<title>Infomedia Ltd. - File Reader Factory Manager</title> 
	<link rel="stylesheet" type="text/css" href="css/dashboard.css" media="screen"/> 
	<link rel="stylesheet" type="text/css" href="../themes/smoothness/jquery-ui-1.8.5.custom.css" media="screen"/> 
	<style type="text/css" title="currentStyle"> 
        @import "../plugins/datatables.1.7.3/css/demo_page.css";
        @import "../plugins/datatables.1.7.3/css/demo_table.css";
    </style> 
	<link href="../plugins/google-code-prettify/prettify.css" type="text/css" rel="stylesheet" />
	<script type="text/javascript" language="javascript" src="js/config.js"></script>		
	<script type="text/javascript" language="javascript" src="../js/jquery-1.4.2.min.js"></script> 
	<script type="text/javascript" language="javascript" src="../js/jquery-ui-1.8.5.custom.min.js"></script> 
	<script type="text/javascript" language="javascript" src="../plugins/datatables.1.7.3/js/jquery.dataTables.js"></script> 
	<script type="text/javascript" language="javascript" src="js/common.js"></script> 
    <script type="text/javascript" src="../plugins/google-code-prettify/prettify.js"><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></script>
	<script type="text/javascript" src="../js/json2.js"></script>
	<script type="text/javascript" src="../js/indentify.js"></script>
	<script type="text/javascript" >
		function toggleAutoRefresh() {
		    toggleAutoRefreshOnElement(this);
		}
	</script>	
</head> 
<body> 
<div id="body-wrapper"> 
    <div id="masthead-container"> 
		<table width="100%"><tr> 
			<td align="left" valign="top"> 
		        <img src="../images/IFM-Logo.png" alt="logo"/> 
		        <br/> 
				<span class="loginPageTitleText"> 
					File Reader Factory Manager
				</span> 
			</td> 
			<td align="right" valign="bottom"> 
				<span onclick="window.location='index.html';" style="cursor:pointer;font-weight:bold;color:white;text-align: center;"> 
					Return to Admin Home
				</span> 
			</td> 
		</tr></table> 
	</div> 
 
	<div id="content-container"> 
		<table width="100%" > 
		<tr><td valign="top" align="left" > 
			</td> 
		<td valign="baseline" align="right" > 
			<table><tr> 
			<td> 
				<span style='margin-left:10px;padding:3px;'>Auto refresh:</span> 
				<div id='refreshButton' style='display:inline;margin-left:2px;border:1 solid black;padding:3px;cursor:pointer;background-color:maroon;color:white;'

						onclick='toggleAutoRefresh()'>OFF</div> 
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
	</div> 
 
	<div id="cachelist"> 
	
	<%
	for(ReaderFactoryInfo info : list) {
		switch (info.getReaderType()) {
			case RAM:
				ramSize+=info.getSize();
				ramCount++;
				break;
			case MEMORY_MAPPED:
				mapSize+=info.getSize();
				mapCount++;
				break;
			case BASIC:
				basicSize+=info.getSize();
				basicCount++;
				break;
		}
	}
	%>
	
	<h3>Summary Stats: </h3>
		<table class="display" id="tbl_connlist"> 
			<thead> 
				<tr> 
					<th width="40%">Type</th> 
					<th width="30%">Count</th> 
					<th width="30%">Size</th> 
				</tr> 
			</thead> 			
			<tbody> 
					<tr> 
						<td>RAM </td>
						<td><%=ramCount %></td>
						<td><%=printInMB(ramSize) %> MB</td>
					</tr> 
					<tr> 
						<td>Memory Mapped </td>
						<td><%=mapCount %></td>
						<td><%=printInMB(mapSize) %> MB</td>
					</tr>
					<tr> 
						<td>Basic </td>
						<td><%=basicCount %></td>
						<td><%=printInMB(basicSize) %> MB</td>
					</tr>
			</tbody> 
		</table> 
		
		
	<h3>Details:</h3>
	<table width="98%" align="center"><tr><td> 
		<table class="display" id="tbl_connlist"> 
			<thead> 
				<tr> 
					<th width="30%">Reader</th> 
					<th width="40%">Path</th> 
					<th width="20%">Type</th> 
					<th width="10%">Size</th>
				</tr> 
			</thead> 			
			<tbody> 
				<%for(ReaderFactoryInfo info : list) { %>
					<tr> 
						<td><%=info.getReaderName() %></td>
						<td><%=info.getFilePath() %></td>
						<td><%=info.getReaderType().name() %></td>
						<td><%=printInMB(info.getSize()) %> MB</td> 
					</tr> 
				<%} %>
			</tbody> 
		</table>
		
		
		<div id = "errorMessage"> 
			
		</div> 
	</td></tr></table> 
	</div> 
</div> 
</body> 
</html>