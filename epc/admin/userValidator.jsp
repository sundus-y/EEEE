<%--
  Form to collect a list of users to be validated and retrieve a table report showing details for each user.

  User: lthompson
  Date: 29/10/2009
  Time: 4:42:36 PM
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head>
    <title>User Validator</title>
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
            <table cellspacing="0" cellpadding="10px" width="100%">
                <tr>
                    <td valign="top" align="left">

                        <form action="userValidatorResults.jsp">
                            <table>
                                <col/>
                                <col/>
                                <tr>
                                    <td>
                                        Enter users to validate:<br/>
                                        <textarea rows="25" cols="50" name="users"></textarea>
                                    </td>
                                    <td valign="top">
                                        E.g.:<br/> 
                                        fapcn@bs.com<br/>
                                        fnaca@bs.com<br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <button type="submit">Submit</button>
                                    </td>
                                    <td>

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