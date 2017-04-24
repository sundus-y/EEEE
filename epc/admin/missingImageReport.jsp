<%--
  Created by IntelliJ IDEA.
  User: lthompson
  Date: 30/10/2009
  Time: 4:38:26 PM
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head><title>Missing Image Report</title></head>
<link rel="stylesheet" type="text/css" href="resources/public/css/dashboard.css" media="screen"/>
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
            <table cellspacing="0" cellpadding="10px" width="100%">
                <tr>
                    <td valign="top" align="left">
                        <h1>Generate a Missing Image Report</h1>

                        <form action="missingImageReportResults.jsp">
                            <table>
                                <col width="400"/>
                                <col width="*"/>
                                <tr>
                                    <td align="right">
                                        <label for="baseImagePath">Base Image Path:</label>
                                        <input type="text" name="baseImagePath" id="baseImagePath" style="width:300px;">
                                    </td>
                                    <td>
                                        E.g. \\syddevfs01\341GBData\LIVE+Plus\FAP
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <label for="username">Username:</label>
                                        <input type="text" name="username" id="username" style="width:300px;"><br/>
                                    </td>
                                    <td>
                                        E.g. fapcn@bs.com
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="right">
                                        <input type="submit"/>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </td>
                </tr>
            </table>
            </form>
            </td>
            </tr>
            </table>
        </div>
    </div>
</div>

</body>
</html>
