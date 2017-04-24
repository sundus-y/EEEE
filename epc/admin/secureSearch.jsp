<%@ page import="au.com.infomedia.configuration.ConfigurationManager" %>

<%@page import="au.com.infomedia.epc.context.ContextConfigData"%>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<html>

<head>

    <script type="text/javascript">
        function login() {
            var username = document.getElementById('username').value;
            var password= document.getElementById('password').value;
            window.location = "secureSearch.jsp?username=" + username + "&password=" + password;
        }

        function processKeyDown(event) {        	
        	if (event.keyCode == 13) {
        		login();
        	}
        }
        
    </script>

</head>

<%
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String passthrough = request.getParameter("passthrough");

        String cookieName = ConfigurationManager.get(ContextConfigData.class).getUsernameHeaderName();
        if (request.getParameter("cookiename") != null
                && request.getParameter("cookiename").length() > 0) {
            cookieName = request.getParameter("cookiename");
        }

        String currentUser = "";
        String defaultGotoUrl = "";
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    currentUser = cookie.getValue();
                } else if (cookie.getName().equals("defaultGotoUrl")) {
                    defaultGotoUrl = cookie.getValue();
                }
            }
        }

        String cookieDomain = "";
        if (request.getParameter("cookiedomain") != null
                && request.getParameter("cookiedomain").length() > 0) {
            cookieDomain = request.getParameter("cookiedomain");
        } else {
            if (request.getServerName() != null) {
                String[] domainArr = request.getServerName().split("\\.");
                if (domainArr.length >= 2) {
                    cookieDomain = "." + domainArr[domainArr.length - 2] + "." + domainArr[domainArr.length - 1];
                } else {
                    cookieDomain = domainArr[0];
                }
            }
        }

        String cookiePath = "/";
        if (request.getParameter("cookiepath") != null
                && request.getParameter("cookiepath").length() > 0) {
            cookiePath = request.getParameter("cookiepath");
        }

    if (currentUser.equals("bsforddealer") 
    		&& StringUtils.isNotEmpty(passthrough)) {
        response.sendRedirect("search.jsp");
    }

    if ((StringUtils.isNotEmpty(username) || StringUtils.isNotEmpty(password))) {

        javax.servlet.http.Cookie authCookie = new javax.servlet.http.Cookie( cookieName, username );

        authCookie.setDomain( cookieDomain );
        authCookie.setPath( cookiePath );

        // Cookies should be destroyed with browser.
        authCookie.setMaxAge( 2600000 );	// about 1 month

        // Add cookie
        if (password!=null && password.equals("password")) {
            response.addCookie(authCookie);
        }

        // redirect to url...
        String gotoUrl = "secureSearch.jsp";
        boolean useGoto = false;
        if (gotoUrl != null && gotoUrl.length() > 0) {
            useGoto = true;
        } else {
            if (defaultGotoUrl != null && defaultGotoUrl.length() > 1) {
                gotoUrl = defaultGotoUrl;
                useGoto = true;
            } else {
                gotoUrl = "/";
            }
        }

        // If goto and username is set, then redirect...
        if (gotoUrl != null && gotoUrl.length() > 0
                && username != null && username.length() > 0) {

            String cookieVal = response.encodeURL(gotoUrl);
            javax.servlet.http.Cookie gotoCookie = new javax.servlet.http.Cookie( "defaultGotoUrl", cookieVal );

            gotoCookie.setDomain( request.getServerName() );
            gotoCookie.setPath( cookiePath );

            // Cookies should be destroyed with browser.
            gotoCookie.setMaxAge( 2600000 );	// about 1 month

            // Add cookie
            if (password!=null && password.equals("password")) {
                response.addCookie(gotoCookie);
                gotoUrl = gotoUrl + "?passthrough=true";
            }

            response.sendRedirect(gotoUrl);
        }


    } else {
        %>

        <body>
			<div id="bnackgroundDiv" style="background:transparent;width:100%;height:100%;position:fixed;top:0px;left:0px;z-index:1;">
				<table width="100%"><tr><td align="center" valign="top">
					<img src="resources/public/images/login_background.jpg" height="769px" width="800px" />
				</td></tr></table>
			</div>

			<div id="topBit" style="background-color: #222222;width:100%;height:50%;position:fixed;top:0px;left:0px;z-index:0;">
			</div>
			<div id="bottomBit" style="background-color: #212321;width:100%;height:50%;position:fixed;top:50%;left:0px;z-index:0;">
			</div>

	   		<div style="position:absolute;left:35%;top:255px;color:white;z-index: 100">
				<table>
				<tr>
					<td align="right"><span style="font-weight:bold;color:white;">User Name: </span></td>
					<td align="left"><input id="username" type="text" value="<%=currentUser%>" /></td>
				</tr>
				<tr>
					<td align="right"><span style="font-weight:bold;color:white;">Password: </span></td>
					<td align="left"><input id="password" type="password" onkeydown="processKeyDown(event);" /></td>
				</tr>
	            <tr>
					<td align="right">&nbsp;</td>
					<td align="left"><button onclick="login();">Log In</button></td>
				</tr>
           	</div>
		
        </body>

        <%
    }

%>

</html>