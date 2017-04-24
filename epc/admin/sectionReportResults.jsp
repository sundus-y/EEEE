<%@page import="au.com.infomedia.reports.sections.SectionReportBuilder"%>
<%--
  Created by IntelliJ IDEA.
  User: lthompson
  Date: 29/10/2009
  Time: 5:54:40 PM
--%>
<%@page contentType="text/html;charset=UTF-8" language="java" buffer="none" %>
<%
    String reportXML;
    try{
        String username = request.getParameter("username");
        SectionReportBuilder reportBuilder = new SectionReportBuilder(username, response.getWriter());
        reportBuilder.initialize();
        reportXML = reportBuilder.createReportXml();
    }catch(SecurityException securityException){
        reportXML = "";
        %>
        Unable to log in with user <%=request.getParameter("username")%>.        
        <%
        return;
    }
%>
<%=reportXML%>