<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@taglib uri="http://www.infomedia.com.au/tld/jsptags" prefix="ifm" %>
<%@page import="au.com.infomedia.offline.*" %>
<%@page pageEncoding="UTF-8" %>

<%!
	public static void setCookieValue(HttpServletResponse response, String cookieName, String value, int expiry) {
		javax.servlet.http.Cookie authCookie = new javax.servlet.http.Cookie( cookieName, "\""+value+"\"" );

		// Cookies should be destroyed with browser.
		authCookie.setMaxAge( expiry );

		// Add cookie
		response.addCookie(authCookie);
	}
	public static void setUsernameCookie(HttpServletResponse response, HttpServletRequest request, String username) {
		setCookieValue(response, "X-IFM-UID", username, 2600000); // about 1 month
	}

%>
<%

	// If new username requested - add cookie for this new username...
	String username = request.getParameter("userName");
	if (username == null || username.length() == 0) {
		username = request.getParameter("username");
	}
	if (username == null || username.length() == 0) {
		username = request.getParameter("X-IFM-UID");
	}
	if (username != null && username.length() > 0) {
		setUsernameCookie(response, request, username);
	}


    String currentLanguage = request.getParameter("language");
    if (currentLanguage == null || currentLanguage.length() == 0) {
        currentLanguage = LanguageSettings.getLanguage(au.com.infomedia.jsptags.Lexicons.DEFAULT_LANGUAGE);
    } else {
        LanguageSettings.setLanguage(currentLanguage);
    }
    pageContext.setAttribute(au.com.infomedia.jsptags.Lexicons.LANGUAGE_ATTRIBUTE, currentLanguage);
    String onlineUrlPrefix = PropertiesHelper.get("onlineUrlPrefix");

    //Check if there was an error logging onto the online server
    String error = request.getParameter("error");
    Boolean usernamePasswordError = false;
    Boolean accountLockedOutError = false;
    if (error != null) {
        if (error.equalsIgnoreCase("usernamepassword")) {
            usernamePasswordError = true;
        } else if (error.equalsIgnoreCase("accountlockedout")) {
            accountLockedOutError = true;
        }
    }

    //Check the current franchise
    FranchiseInfo franchiseInfo = LiveServiceConnector.getFranchise(request);

    //Get the data version info
    UpdateAvailable updateAvailable = LiveServiceConnector.getUpdateInfo(request);

    //Get the data version info
    ExpiryStatus expiryStatus = LiveServiceConnector.getExpiryStatus(request);
    //expiryStatus = new ExpiryStatus(true, false, false);
    
    boolean displayExpiryError = false;
    boolean displayExpiryWarningError = false;
    String countryId = "0"; // Default to Select
    if (expiryStatus != null) {
        if (expiryStatus.getDataExpired() || !expiryStatus.getDisabledDongleFileValidDate()) {
            displayExpiryError = true;
        } else if (expiryStatus.getDataExpiringWarning()) {
            displayExpiryWarningError = true;
        }

        countryId = expiryStatus.getCountryIdFromMarket();
        if (countryId == null) {
            countryId = "0";
        }
    }

    String forceOnlineLogonProperty = PropertiesHelper.get("forceOnlineLogon");
    Boolean forceOnlineLogon = false;
    if (forceOnlineLogonProperty != null && forceOnlineLogonProperty.equalsIgnoreCase("true")) {
        forceOnlineLogon = true;
    }

    //Check the dongle is connected
    SecurityType securityType = LiveServiceConnector.getSecurityType(request);
    boolean enableOfflineLogon = false;
    if ((securityType != null && !displayExpiryError) || forceOnlineLogon) {
        enableOfflineLogon = true;
    }

    //If the dongle is connected, check that the Internet is available. Only when the dongle is present and the Internet is available can they log on.
    boolean enableOnlineLogon = (enableOfflineLogon || forceOnlineLogon)
            && LiveServiceConnector.isInternetAvailable(request);
    
    String registerFranchiseCode = franchiseInfo.getFranchiseCode();
    String makeId = "";
    String loginMain = "login-main-hyw";
    if(registerFranchiseCode == null)
    {
    	registerFranchiseCode = "";
    }
    else if("HYW".equals(registerFranchiseCode))
    {
    	registerFranchiseCode = "Hyundai";
        makeId = "9";
    }
    else if("KIA".equals(registerFranchiseCode))
    {
    	registerFranchiseCode = "Kia";
        makeId = "44";
        loginMain = "login-main-kia";
    }

	String registerLink = "";
	if (enableOnlineLogon && securityType != null) {
        registerLink = "<a  href=\"http://www.microcat.ifmsystems.com/Default.aspx?page=registration&countryid=" + countryId + "&makeid=" + makeId + "&dongle=" + securityType.getSecurityID() + "&lang="+ currentLanguage + "\">microcatV6.com/registeronline</a>";
    }

%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title><ifm:lexicon number="7591">Log In</ifm:lexicon></title>
    <link rel="shortcut icon" href="images/favicon.ico"/>
    <link href="style/style.css" rel="Stylesheet" type="text/css">
    <link rel="stylesheet" href="style/validationEngine.jquery.css" type="text/css"/>
    <link rel="stylesheet" href="style/jquery.noty.css" type="text/css"/>
    <link rel="stylesheet" href="style/noty_theme_default.css" type="text/css"/>
    <link rel="stylesheet" href="style/noty_theme_ifm.css" type="text/css"/>
    <script type="text/javascript" src="js/swfobject.js"></script>
    <script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="js/jquery.validationEngine.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/jquery.validationEngine-en.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/jquery.noty.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/notificationHandler.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/logon.js" type="text/javascript"></script>
    <script type="text/javascript">
        var franchiseInfo = {
            code: '<%=franchiseInfo == null ? "" : franchiseInfo.getFranchiseCode()%>',
            name: '<%=franchiseInfo == null ? "" : franchiseInfo.getFranchiseName()%>'
        };
        var updateInfo = {
            isUpdateAvailable: <%=updateAvailable == null ? "false" : updateAvailable.getUpdateAvailable()%>,
            updateUrl: '<%=updateAvailable == null ? "" : updateAvailable.getUpdateUrl()%>',
            version: '<%=updateAvailable == null ? "" : updateAvailable.getVersion()%>'
        };

        var usernamePasswordError = <%=usernamePasswordError%>;
        var onlineUrlPrefix = "<%=onlineUrlPrefix%>";
        var currentLanguage = "<%=currentLanguage%>";
        var emptyUsernameMessage = "<ifm:lexicon number='5815'>Please enter your user name.</ifm:lexicon>";
        var emptyPasswordMessage = "<ifm:lexicon number='4211'>Please enter your password.</ifm:lexicon>";
    </script>
    <script>
        function clearPopups() {
            //Hide all current prompts
            $("#loginForm").validationEngine('hide');
        }

        /**
         * Validates that the username and password fields have been populated before attempting to login.
         */
        function validateCredentials() {
            var user = $("#userName").val();
            if (user == "" || user == null)
            {
                $("#userName").validationEngine('showPrompt', emptyUsernameMessage, 'load', true);
                return false;
            }

            var pass = $("#password").val();
            if (pass == "" || pass == null)
            {
                $('#password').validationEngine('showPrompt', emptyPasswordMessage, 'load', true);
                return false;
            }
            rememberUserNameinCookie();
            return true;
        }

        $(document).ready(function () {
            $("#withflash").hide();
            $("#withflash1").hide();
            $("#noflash").hide();

            if(swfobject.hasFlashPlayerVersion("10.2.0")) {
                $("#withflash").show();
                $("#withflash1").show();
                
            } else {
            	$("#noflash").show();
            }
            readUsernameFromCookie();

            setSelectedLanguage();
        });

    </script>
</head>
<body>
<%if (enableOnlineLogon == false && enableOfflineLogon == true) {%>
<img src="https://login.ifmsystems.com/favicon.ico" style="display:none"
     onload="document.getElementById('showLowerLoginPanel').style.display='';"/>
<%}%>
<div id="microcat"></div>
<div id="page">
<table>
    <tbody>
    <tr>
        <td>
            <div id="page-header">
                <table width="100%">
                    <tbody>
                    <tr>
                        <td align="right" id="languageListTableCell">
                            <ifm:lexicon number="375">Language</ifm:lexicon>: &nbsp;&nbsp;&nbsp;
                            <form id="languageForm" action="">
                                <ifm:languageList
                                        name="language"
                                        languages="cs,da,de,en,en-us,es,es-mx,fr,fr-ca,id,it,hu,nl,no,pl,pt,ro,fi,sv,vi,tr,nl-be,el,ru,th,zh-tw,zh-cn,ko,ja"
                                        onchange="this.parentNode.submit()"/>
                            </form>
                        </td>
                    </tr>
                    </tbody>
                </table>
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
                        <table width="843" style="vertical-align: top; background: url(images/IFM_Logo.png) no-repeat 0 0;" >
                            <tbody>
                             <tr>
                                <td>
                                    <img alt="Infomedia Logo" style="border-width:0;" src="images/IFM_Logo.jpg"/>
                                </td>
                                <td>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <!-- Banner area content end -->
                    </div>

                    <div style="text-align: center; vertical-align: middle; width: 700px; margin: 65px auto 0 auto;" class="errorMessage">
                        <table class="tableBorder">
                            <tr>
                                <td width="350" style="text-align: center; vertical-align: center;">
                                    <%
                                    if (usernamePasswordError) {
                                    %>
                                    <label class="errorMessage"><ifm:lexicon
                                        number="2582">Invalid user name or password.</ifm:lexicon></label>
                                    <%
                                    } else if (accountLockedOutError) {
                                    %>
                                    <label class="errorMessage"><ifm:lexicon
                                        number="7615">Your account has been locked due to too many failed login attempts. You need to reset your account.</ifm:lexicon></label>
                                    <label class="errorMessage"><ifm:lexicon
                                        number="7616">Please contact Customer Service or your System Administrator.</ifm:lexicon></label>
                                    <%}%>
                                </td>
                                <td width="17px;">
                                </td>
                                <td width="350" style="text-align: center; vertical-align: center;">
		                            <div id="errorPaddingClass">
                                        <%
		                                if (enableOfflineLogon) {
									        if (displayExpiryWarningError) {
                                        %>
		                                <label class="errorMessage"><ifm:lexicon
		                                    number="4949">The version of Microcat you are running needs to be updated.</ifm:lexicon></label>
		                                <label class="errorMessage"><ifm:lexicon
		                                    number="4294">Please install the latest version to update the application and the data.</ifm:lexicon></label>
                                        <%
									        }
		                                } else {
		                                    if (displayExpiryError) {
                                        %>
		                                <label class="errorMessage"><ifm:lexicon
		                                    number="4950">The version of Microcat you are running is out of date and will not continue to run.</ifm:lexicon></label>
		                                <label class="errorMessage"><ifm:lexicon
		                                    number="4294">Please install the latest version to update the application and the data.</ifm:lexicon></label>
 		                                <%
		                                    } else {
		                                %>
		                                <label class="errorMessage"><ifm:lexicon number="2811">Dongle not found.</ifm:lexicon></label>
                                        <%
                                            }
                                        }
                                        %>
                                    </div>
						        </td>
                            </tr>
                        </table>
                    </div>
                    <div id="<%=loginMain%>">
                        <table class="tableBorder">
                            <tbody>      
                            <tr class="mainTrLogin">
                                <td width="27px;">
                                </td>
                                <td>
                                    <table class="mainTdBackground">
                                  	    <tr>
                                  		<td style="height:55px;" >
                                  			
		                                    
		                                </td>
                                  	</tr>
                                  	<tr>
                                  		<td  class="bigTd" style="padding-left:7px; padding-bottom:6px">
                                  			<ifm:lexicon number="8173">REMOTE DATABASE LOGIN</ifm:lexicon>
		                                </td>	
                                  	</tr>
  
                                  	<tr>
		                                <td class="login-container">
		                                    <div class="startPanel">
		                                        <form id="loginForm" action="<%=onlineUrlPrefix + "Login.aspx"%>" method="post" onsubmit="return validateCredentials()">
		                                            <input type="hidden" name="language" value="<%=currentLanguage%>"/>
		                                            <input type="hidden" name="localport" value="<%=request.getServerPort()%>"/>
		
		
		                                            <div id="withflash1" style="display: none;">
		                                                <div class="startRemoveData">
		                                                    <%
		                                                        if (enableOfflineLogon) {
		                                                    %>
		
		                                                    <input type="hidden" name="DongleType"
		                                                       value="<%=securityType.getSecurityType()%>"/>
		                                                    <input type="hidden" name="DongleID"
		                                                       value="<%=securityType.getSecurityID()%>"/>
		                                                    <span style="height:10px; display: block;">&nbsp;</span>
		                                                </div>
		                                                <div class="loginDiv">
		                                                    <table class="remoteloginTable">
		                                                        <tr>
                                                                    <td class="accessParts">
		                                                                <div class="AccessTextLeft">
		                                                                    <ifm:lexicon number="8170">Access the latest parts information online</ifm:lexicon>
		                                                                </div>
		                                                            </td>
                                                                </tr>
		                                                        <tr>
                                                                    <td align="center" height="65">
														                <div class="loginInputs">
															                <table style="padding-left:2px;">
																                <tr>
                                                                                    <td>
			                                                	                        <div class="alignedRightTd">
			                                                                                <label for="userName">
			                                                                                    <ifm:lexicon number="290">User name</ifm:lexicon>
			                                                                                </label>
																                        </div>
                                                                                    </td>
       	        															        <td width="155px">
		    	        													            <div >
			                                                                                <input id="userName"  name="userName" type="text"
			                                                                                             class="validate[required] text-input-w "
			                                                                                             maxlength="80"/>
			                                                                            </div>
                                                                                    </td>
			                                                                        <td width="20px">
                                                                                        <div>
			                                                                                <%
			                                                                                if (usernamePasswordError) {
			                                                                                %>
			                                                                                <img class="centeredImageLink" width="16px" height="16px" alt=""
			                                                                                    src="images/question-error.png">
			                                                                                <%
			                                                                                } else {
			                                                                                %>
			                                                                                <img class="centeredImageLink" width="16px" height="16px" alt=""
			                                                                                    src="images/question-blank.png">
			                                                                                <%
			                                                                                }
			                                                                                %>
			                                                                            </div>
                                                                                    </td>
                                                                                </tr>
			                                        			                <tr>
			                                                	                    <td>
                                                                                        <div class="alignedRightTd">
						                                                                    <label style="padding-left:2px" for="password"><ifm:lexicon
						                                                                        number="189">Password</ifm:lexicon></label>
			                                                	                        </div>
                                                                                    </td>
			                                                	                    <td>
                                                                                        <div>
			                                                	                            <input id="password"             name="password"
				                                                                                             type="password"
				                                                                                             maxlength="30"
				                                                                                             class="text-input-w validate[required]"/>
			                                                	                        </div>
                                                                                    </td>
			                                                	                    <td>
                                                                                        <div>
			                                                	                            <a title="<ifm:lexicon number="5541">Forgot Password?</ifm:lexicon>"
							                                                                    href=""><img id="forgotPasswordButton"
							                                                                    class="centeredImageLink" width="16px" height="16px" alt=""
							                                                                    src="images/question-blue.png"></a>
			                                                	                        </div>
                                                                                    </td>
			                                                	                </tr>
			                                                                </table>
			                                                            </div>
			                                                        </td>
                                                                </tr>
			                                                    <tr>
			                                                        <td style="vertical-align:top; height:50px;">
			                                                            <div class="loginBottom">
				                                                            <table style="width:298px;">
				                                                	            <tr>
				                                                		            <td height="20px" width="23"><input id="remember" name="remember"  type="checkbox" checked="true" />
                                                                                    </td>
				                                                		            <td>
																		                <ifm:lexicon number="4649">Remember user name</ifm:lexicon>
				                                                		            </td>
				                                                		            <td rowspan="2" class="loginButtonTdFloat">
				                                                		                <table>
                                                                                            <tr>
                                                                                                <td class="loginButtonTdFloatWithPadding">
						                                                		                    <input type="submit"
						                                                                                value="<ifm:lexicon number="7591">Log In</ifm:lexicon>"
						                                                                                class="wideshinybutton"/>
					                                                                            </td>
                                                                                            </tr>
                                                                                        </table>
				                                                                    </td>
				                                                	            </tr>
				                                                	            <tr>
				                                                		            <td width="23">
                                                                                    </td>
				                                                		            <td>
                                                                                        <a id="forgotPasswordLink" href=""><ifm:lexicon number="5541">Forgot Password?</ifm:lexicon></a>
                                                                                    </td>
            				                                                	</tr>
			            	                                                </table>
			                                                            </div>
			                                                       </td>
			                                                    </tr>
		                                           	        </table>
		                                                </div>
                                                        <div class="register"><ifm:lexicon number="8307" substitutions="<%=registerLink%>">Need user name and password? Register at [x]</ifm:lexicon></div>
		                                                <%
		                                                    }
		                                                %>
 		                                            </div>
		                                            <div id="noflash" style="display: none; padding-left: 25px; font-size: 10px; text-align: left; padding-right:10px; padding-top: 4px;line-height: 120%;">
		
		                                                <p style="font-weight: bold;">
		                                                    <ifm:lexicon number="8291">Adobe Flash Requirements</ifm:lexicon>
		                                                </p>
	                                                    <ifm:lexicon
                                                            number="8292">To run your Infomedia products successfully, you need to install&nbsp;the latest version of Flash Player.</ifm:lexicon>
		                                                
														<br>
		                                                <table width="100%">
		                                                    <tr>
		                                                        <td style="width: 25%"><img width="50px"
		                                                                                    src="images/flashnotdetected.png"/>
		                                                        </td>
		                                                        <td valign="middle"
		                                                            style="width: 75%; font-size: 10px; text-align: left; padding-right:2px;line-height: 120%;">
		                                                            <ifm:lexicon
		                                                                    number="8293">The version of Flash you are using is out-of-date. Click
		                                                                <a href="http://get.adobe.com/flashplayer/"
		                                                                   target="_blank">here</a> to get the latest Flash player.</ifm:lexicon>
		                                                            <br/>
		                                                            <ifm:lexicon
		                                                                    number="8294">You may also install the Flash Player from your Microcat V6 installation DVD</ifm:lexicon>
		                                                        </td>
		                                                    </tr>
		                                                </table>
		
		                                            </div>
		                                            
													
		                                        </form>
		                                    </div>
		                                </td>
	                                </tr>
                                  </table>
	                            </td>
                                <td width="17px;">
                                </td>
                                <td width="339" style="vertical-align: top;">
                                   <table id="start-container-id" style="text-align: left">
                                   		<tbody>
				                            <tr style="vertical-align: top">
				                                <td height="53px" colspan="5">
				                                </td>
				                            </tr>
				                            <tr>
				                            	<td style="padding-bottom:6px" colspan="5">
				                            		<table>
				                            			<tr>
				                            				<td  width="18px">&nbsp;</td>
					                                  		<td class="bigTd">
					                                  			<ifm:lexicon number="8308">LOCAL DATABASE ACCESS</ifm:lexicon>
							                                </td>
				                            			</tr>
				                            		</table>
				                            	</td>
				                            		
		                                  	</tr>
		                               		
				                            <tr style="vertical-align: top" height="120">
				                                <td width="11px;">
				                                	<div style="width=11px;">&nbsp;&nbsp;&nbsp;</div>
				                                </td>
				                                <td  class="start-container">
				                                    <div>												
				                                        <form id="loginForm" action="<%=onlineUrlPrefix + "Login.aspx"%>" method="post" onsubmit="return validateCredentials()">
				                                            <input type="hidden" name="language" value="<%=currentLanguage%>"/>
				                                            <input type="hidden" name="localport" value="<%=request.getServerPort()%>"/>
				
															<div id="withflash" style="display: none;"> 
 				                                            
				
				                                            <div class="startLocalData">
				                                            	<%
							                                         if (enableOfflineLogon) {
							                                    %>
				                                                <table>
					                                                  <tr>
					                                                    <td height="148px;">
					                                                      <div class="startPanelRight">
								                                              <table width="213px">						                                                						                                          
									                                                <tr>
								                                                	  <td>
									                                                	<div class="startTextRight">
																							<ifm:lexicon number="8171">Access the data from the DVD installed on your 
																							computer or on your dealer network</ifm:lexicon>
										                                                </div>
									                                                  </td>
									                                                </tr>
									                                                <tr>
								                                                	  <td>	
										                                                <div class="alignedleft" width="213">
											                                                <table class="alignedleft" width="213">
												                                                <tr><td style="height:3px">	<div style="height:3px"></div> </td></tr>
												                                                <tr><td class="alignedMiddleWithPadding">		
													                                                <input type="submit" id="startMicrocatLink"
												                                                       value="<ifm:lexicon number="1907">Start</ifm:lexicon>"  
												                                                       class="shortShinybutton"/>
													                                            </td></tr>    
													                                            
												                                            </table>
										                                                </div>
										                                              </td>
										                                            </tr>
									                                           </table>
									                                       </div>
						                                                </td>
						                                              </tr>
						                                              
					                                                  <tr>
						                                              	  <td>
					                                                  
					                                                        <span style="height: 16px; display: block;">
					                                                            
					                                                        </span>
																		</td>
					                                                 </tr>
					                                                 <tr>
						                                              	  <td>
					                                                		<span style="height:0px; display: block;">&nbsp;</span>
					                                                      </td>
					                                                  </tr>
					                                                <tr>
						                                               <td>
																		<div class="alignedRightLatestLink">
																			<table class="tblDownloadBg">
																				<tr>
																					<td width="75px;">
																					
																					</td>
																		    		<td class="downloadLatestDataTd">
																		    		 <div class="downloadLatestDataDiv">
																						  <a id="downloadLatestData"
																                          class="<%=updateAvailable == null || updateAvailable.getUpdateAvailable() == false ? "disabledblacklink" : "blacklink"%>"
																                          href="<%=updateAvailable == null || updateAvailable.getUpdateUrl() == null || updateAvailable.getUpdateUrl().length() == 0 ? "#" : updateAvailable.getUpdateUrl()%>"
																                          title="<ifm:lexicon number="8172" htmlEncode="true">Download the latest VIN and supersession data available for your market. Use password 'Microcat' on the login page.</ifm:lexicon>">
																                          <ifm:lexicon number="8169">Download latest data to local database</ifm:lexicon>
																                       	  </a>
															                       	 </div>
														                       		</td>
															                   </tr>
															                </table>
														                </div>
													                	</td>
					                                                </tr>
												                </table>  
				                                            </div>
				                                            </div>
				                                            <%} %>
												                       
				                                        </form>
				                                      </div>
				                                      
				                                 </td>
				                              </tr>
				                              
				                         </tbody>  
                                   </table> 
                                </td>
                                <td width="17px;">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="padding-bottom: 80px;">
                    	
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
        <ifm:lexicon number="58">Copyright 1990-2011 Infomedia Ltd. All rights reserved.</ifm:lexicon><span
            class="footerpipe">|</span>
        <a class="bottom-links<%if( enableOnlineLogon == false ){%>-disabled" onclick="return false"<%}
                                else{%>"href="#" onclick="openLink('<%=PropertiesHelper.get("termsOfUseUrl") + currentLanguage%>'); return false;"<%}%>>
            <ifm:lexicon number="3522">Terms of Use</ifm:lexicon>
        </a>
        <span class="footerpipe">|</span>
        <a class="bottom-links<%if( enableOnlineLogon == false ){%>-disabled" onclick="return false"<%}
                                else{%>"href="#" onclick="openLink('<%=PropertiesHelper.get("privacyPolicyUrl") + currentLanguage%>'); return false;"<%}%>>
            <ifm:lexicon number="6681">Privacy Policy</ifm:lexicon>
        </a>
        <span class="footerpipe">|</span>
        <a class="bottom-links<%if( enableOnlineLogon == false ){%>-disabled" onclick="return false"<%}
                                else{%>"href="#" onclick="openLink('<%=PropertiesHelper.get("contactUsUrl") + currentLanguage%>'); return false;"<%}%>>
            <ifm:lexicon number="7883">Contact Us</ifm:lexicon>
        </a>
    </div>
    <div>
        <span style="font-size:Smaller;"><ifm:lexicon number="685">Version</ifm:lexicon></span>
        <span style="font-size:Smaller;"> 1.4.38</span>
        <span style="font-size:Smaller;">(51727)</span>
    </div>
</div>
</div>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', "<%=franchiseInfo != null && "HYW".equals(franchiseInfo.getFranchiseCode()) ? "UA-17357652-10" : "UA-17357652-11"%>"]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</body>
</html>