<%@page contentType="text/html;charset=UTF-8" language="java" buffer="none" %>
<%@page import="au.com.infomedia.reports.missingImages.MissingImageReportBuilder"%>
<%@ page import="javax.xml.ws.Response" %>
<%@ taglib uri="http://java.sun.com/jstl/xml"  prefix="x" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <title>Missing Image Report</title>
        <link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
    </head>
    <body>
        <div id="body-wrapper">
            <div id="masthead-container">
                <table width="100%">
                    <tr>
                        <td align="left" valign="top">
                            <img src="resources/public/images/IFM-Logo.png" alt="logo"/>
                            <br/>
                            <span class="loginPageTitleText">Missing Image Report</span>
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
                <div class="content-underline"><!-- empty --></div>
                <div id="divTheContent">
                    <p id="status">
                        <%
                            String reportXML;
                            try{
                                String baseImagePath = request.getParameter("baseImagePath");
                                String username = request.getParameter("username");
                                MissingImageReportBuilder reportBuilder = new MissingImageReportBuilder(baseImagePath, username, response.getWriter());

                                reportXML = reportBuilder.createReportXml();
                            }catch(SecurityException securityException){
                                reportXML = "";
                                %>
                                Unable to log in with user <%=request.getParameter("username")%>.
                                <%
                                return;
                            }
                        %>
                    </p>
                    <script language="JavaScript">document.getElementById("status").style.display="none";</script>
                    <c:import var="stylesheet" url="resources/public/xslt/missingImageReport.xsl" />
                    <c:set var="data"><%=reportXML%></c:set>
                    <x:transform xml="${data}" xslt="${stylesheet}"/>
                </div>
            </div>
            <div id="footer-container">
                <div class="column-container">
                    <div class="column1">
                    </div>
                    <div class="column2">Copyright Infomedia Limited 2008</div>
                </div>
                <div class="column-end"><!-- empty --></div>
            </div>
        </div>
    </body>
</html>