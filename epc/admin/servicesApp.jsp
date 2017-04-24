<html>
<body>
<%
    // add prefix in case the directory is "services/" and not "services" (depends on the web.xml url pattern)
    String url = request.getRequestURL().toString();
    String prefix = "";
    if (url.substring(url.length()-1).equals("/")) {
        prefix="../";
    }
%>
<embed src="<%=prefix%>resources/public/app/servicesApp.swf" width="100%" height="100%">
</embed>
</body>
</html>
