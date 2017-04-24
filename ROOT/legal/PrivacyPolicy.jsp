<%@ page import="java.io.File" %>
<%@ page import="java.net.URI" %>
<%
    String currentLanguage = request.getParameter("language");
    if( currentLanguage == null || currentLanguage.length() == 0){
        currentLanguage = "en";
    }else if( currentLanguage.length() > 2 ){
        currentLanguage = currentLanguage.substring(0,1);
    }
    String privacyPolicyPage = "PrivacyPolicy-" + currentLanguage + ".htm";
    File languageFileCheck = new File(getServletContext().getRealPath("legal" + File.separator + privacyPolicyPage));
    if( languageFileCheck.exists() == false){
        privacyPolicyPage = "PrivacyPolicy-en.htm";
    }

%>
<jsp:forward page="<%=privacyPolicyPage%>"/>