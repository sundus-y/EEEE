<%@page contentType="text/html;charset=UTF-8" language="java" buffer="none" %>
<%@page import="au.com.infomedia.reports.user.UserReportGenerator"%>
<%@ taglib uri="http://java.sun.com/jstl/xml"  prefix="x" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>User Report</title>
    <link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
    <style>
        .error
        {
        color:red;
        }
    </style>
</head>
<body>
    <div id="body-wrapper">
        <div id="masthead-container">
            <table width="100%">
                <tr>
                    <td align="left" valign="top">
                        <img src="resources/public/images/IFM-Logo.png" alt="logo"/>
                        <br/>
                        <span class="loginPageTitleText">User Report</span>
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
                <!--
                  User Validation Report
                  --------------------
                  This page displays a report of 1-n user accounts.

                  The report iterates over each user, calling the web service to validate that the user exists and can use the EPC.

                  The result page allows you to view the user's XML, link to the SalesForce service and see the user's market and franchise.
                 -->
                <div id="status">
                <%
                    String users = request.getParameter("users");
                    UserReportGenerator userReportGenerator = new UserReportGenerator(users, response.getWriter());
                    userReportGenerator.initialize();
                    String reportXML = userReportGenerator.createReportXml();
                %>
                </div>
                <script language="JavaScript">document.getElementById("status").style.display="none";</script>
                <c:import var="stylesheet" url="resources/public/xslt/userReport.xsl" />
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