<%@page import="au.com.infomedia.util.FileUtil"%>
<%@page language="java" contentType="text/html" %>
<%@page import="java.io.IOException"%>
<%@page import="au.com.infomedia.epc.management.logging.EPCLoggingManager"%>
<%@page import="java.io.BufferedOutputStream"%>
<%@page import="java.io.OutputStream" %>

<%
	String logFileName = "";
	try {
		logFileName = request.getParameter("file");
		byte[] bytes = EPCLoggingManager.getLogFileAsBytes(logFileName);
		response.setContentLength(bytes.length);
		response.setCharacterEncoding("utf-8");
		response.setContentType(FileUtil.guessContentTypeFromName(logFileName));
		for (byte abyte : bytes){
			response.getWriter().write(abyte);
		}
	} catch (Throwable e) {
		System.out.println("Could not open " + logFileName);
        e.printStackTrace();
    } finally {
    	response.getWriter().flush();
    	response.getWriter().close();
    }
%>

