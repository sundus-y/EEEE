<%@ page import="au.com.infomedia.epc.service.RESTServiceRouterManager" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.lang.reflect.Method" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="au.com.infomedia.epc.service.RESTServiceRouterManager" %>

<link rel="stylesheet" type="text/css" href="resources/public/css/services.css" media="screen"/>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head><title>EPC Services Page</title></head>
    <body>

    <%

        String requestURI = request.getRequestURI();
        String prefix = "";
        if (!requestURI.substring(requestURI.length()-1).equals("/")) {
            prefix = RESTServiceRouterManager.SERVICES+"/";
        }

        Map<String, List<String>> patternsByAction = RESTServiceRouterManager.getInstance().getPatternsByRouterMap();
        for (String actionName : patternsByAction.keySet()) {
            %>
                <div class="action-name">
                    <%=RESTServiceRouterManager.getInstance().getRouter(actionName).getRouterName()%><br/>
                    <div style="width:350px;border-top-style:solid;border-top-width:3px;border-top-color:black"></div>
            <%
            for (String pattern : patternsByAction.get(actionName)) {
                Method method = RESTServiceRouterManager.getInstance().getRouterMethod(actionName,pattern);
                boolean hasParameters = (!RESTServiceRouterManager.getInstance().getPatternParameters(pattern).isEmpty() ||
                                         RESTServiceRouterManager.getInstance().getRequiredHttpParams(method).length>0);
                String serviceRelativeURL = prefix + actionName + pattern;%>
                <a class="pattern"
                   href="<%=(hasParameters?"/epc/serviceParameterInput.jsp?actionName="+actionName+"&pattern="+pattern:serviceRelativeURL)%>">
                    <%="../epc/"+serviceRelativeURL%>
                </a><br/>
            <%

            }
            %>
                </div><br/><br/>
            <%
        }
    %>

    </body>
</html>