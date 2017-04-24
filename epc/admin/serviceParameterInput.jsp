<%@ page import="au.com.infomedia.epc.service.RESTServiceRouterManager" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.lang.reflect.Method" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Arrays" %>

<link rel="stylesheet" type="text/css" href="services.css" media="screen"/>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head><title>EPC Service Parameter Input Page</title></head>
    <body>

    <%

        String actionName = request.getParameter("actionName");
        String pattern = request.getParameter("pattern");

        %>
                             
        <script type="text/javascript">
            window.actionName = "<%=actionName%>";
            window.pattern = "<%=pattern%>";
            window.params = [];
            window.httpParams = [];
        </script>

        <div class="action-name">
            <%=RESTServiceRouterManager.getInstance().getRouter(actionName).getRouterName()%><br/>
            <div style="width:350px;border-top-style:solid;border-top-width:3px;border-top-color:black">

            <table style="margin-left:10px">
            <%
                for (String param : (List<String>)RESTServiceRouterManager.getInstance().getPatternParameters(pattern)) {
                    %>
                    <tr>
                        <td>
                            <span><%=param%> : </span>
                        </td>
                        <td>
                            <input name="<%=param%>" type="text"/>
                        </td>
                        <script type="text/javascript">
                            window.params.push("<%=param%>");
                        </script>
                        <br/>
                    </tr>
                    <%
                }
                Method method = RESTServiceRouterManager.getInstance().getRouterMethod(actionName,pattern);
                for (String param : RESTServiceRouterManager.getInstance().getRequiredHttpParams(method)) {
                    %>
                    <tr>
                        <td>
                            <span style="font-style:italic;"><%=param%> : </span>
                        </td>
                        <td>
                            <input name="<%=param%>" type="text"/>
                        </td>
                        <script type="text/javascript">
                            window.httpParams.push("<%=param%>");
                        </script>
                        <br/>
                    </tr>
                    <%
                }
            %>
            </table>
            <br/>
            <button style="margin-left:10px" onclick="invokeService()">Submit</button>

        </div><br/><br/>

        <%
    %>


    <script type="text/javascript">

        function invokeService() {
            var pattern = window.pattern;
            var params = window.params;
            for (var i=0; i<params.length; i++) {
                var paramName = params[i];
                var paramValue = eval("document.all."+paramName).value;
                pattern = pattern.replace("{"+paramName+"}",paramValue);
            }
            var httpParams = window.httpParams;
            var first = true;
            for (var i=0; i<httpParams.length; i++) {
                var paramName = httpParams[i];
                var paramValue = eval("document.all."+paramName).value;
                if (first) {
                    pattern = pattern + "?";
                    first=false;
                } else {
                    pattern = pattern + "&";
                }
                pattern = pattern + paramName + "=" + paramValue;
            }
            window.location = "<%=RESTServiceRouterManager.SERVICES%>"+"/"+window.actionName+pattern;
        }

    </script>

    </body>
</html>