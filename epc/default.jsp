<%@ page import="au.com.infomedia.epc.management.EPCServiceManager" %>
<%@ page import="java.util.Calendar" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Microcat&reg; EPC Web Service</title>
    <link rel="shortcut icon" href="public/images/favicon.ico" />
    <link href="public/style/style.css" rel="Stylesheet" type="text/css">
</head>
<body>
<div id="page">
    <table>
        <tbody>
        <tr>
            <td>
                <div id="page-header">
                	<!-- Nothing here for now... -->                    
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="page-border-top">
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="page-center-area">
                    <div id="page-center-area-content">
                        <!-- Center area start -->
                        <div id="banner-area-container">
                            <!-- Banner area content start -->
                            <table width="843">
                                <tbody>
                                <tr>
                                    <td>
                                        <img alt="Infomedia Logo" style="border-width:0;" src="public/images/IFM_Logo.jpg"/>
                                    </td>
                                    <td>


                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!-- Banner area content end -->
                        </div>

                        <div style="text-align: center; vertical-align: middle; width: 600px; margin: 65px auto 0 auto;">
                            <div style="color:Red;display:none;" class="errorMessage">

                            </div>
                            <span class="errorMessage"></span>
                        </div>
                        <div id="login-main">
                        	<table>
                        	<tr>
                        		<td width="17px;"></td>
                        		<td align="center">
                        			<div class="usernamePasswordLabels" style="padding-left:12px;padding-right:6px;">
                        				<br /><br />
                        				The Infomedia EPC Webservice is 
                        				<br /><br />
                        				<span style="font-size:32px;color:green;font-weight:bold">RUNNING</span>
                        			</div>	
                        		</td>
                        		<td width="17px;"></td>
                        		<td align="center">
                        			<div class="usernamePasswordLabels" style="padding-left:32px;padding-right:6px;">
                        				<br /><br />
                        				<span style="font-size:14px;">Version</span>
						            	<br /><br />
						            	<span style="font-size:26px;"><%=EPCServiceManager.getInstance().getEPCVersionBuild()%></span>
						            </div>
                        		</td>
                        		<td width="17px;"></td>
					        </tr>
					        </table>
                        </div>
                        <div style="padding-bottom: 103px;">
                        </div>
                        <!-- Center area end -->
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="page-border-bottom">
                </div>
            </td>
        </tr>
        </tbody>
    </table>

    <div id="bottom-links">
        <div>
            <ifm:lexicon number="58">Copyright 1990-2011 Infomedia Ltd. All rights reserved.</ifm:lexicon><span class="footerpipe">|</span>
            <a href="http://www.microcat.ifmsystems.com/TermsOfUse.aspx?lang=en">
                <ifm:lexicon number="3522">Terms of Use</ifm:lexicon>
            </a>
            <span class="footerpipe">|</span>
            <a href="http://www.infomedia.com.au/PrivacyPolicy.aspx?lang=en">
                <ifm:lexicon number="6681">Privacy Policy</ifm:lexicon>
            </a>
            <span class="footerpipe">|</span>
            <a href="http://www.microcatlive1.ifmsystems.com/Default.aspx?page=ContactUs&countryid=0&makeid=0&lang=en">
                <ifm:lexicon number="7883">Contact Us</ifm:lexicon>
            </a>
        </div>
        
    </div>
</div>
</body>
</html>