<%@page import="au.com.infomedia.offline.*" %>
<%@page pageEncoding="UTF-8"%>
<%
    String version = request.getParameter("version");
    if( version != null && version.length() > 0){
        String result = LiveServiceConnector.setUpdateVersion(request, version);
        if( "OK".equals(result) ){
            response.setStatus(200);
            response.getWriter().write(result);
        }else{
            response.sendError(500, result);
        }
    }else{
        response.sendError(500, "ERROR: No version specified");
    }
%>