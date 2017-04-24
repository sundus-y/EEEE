<%@ page import="au.com.infomedia.configuration.ConfigurationManager" %>
<%@ page import="au.com.infomedia.epc.context.ContextManager" %>
<%@ page import="au.com.infomedia.epc.data.Catalog" %>
<%@ page import="au.com.infomedia.epc.data.Part" %>
<%@ page import="au.com.infomedia.epc.preferences.data.UserPreferenceKey" %>
<%@ page import="au.com.infomedia.epc.preferences.dataaccess.UserPreferencesDataAccess" %>
<%@ page import="au.com.infomedia.epc.search.*" %>
<%@ page import="au.com.infomedia.epc.search.vin.FNA.FNAVinFreeformSearchManager" %>
<%@ page import="au.com.infomedia.security.data.Contact" %>
<%@page import="org.apache.commons.lang.StringUtils" %>

<%@ page import="java.text.DecimalFormat" %>



<%@page import="java.text.NumberFormat"%>
<%@page import="java.util.List"%>
<%@ page import="java.util.Locale" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.StringTokenizer" %>

<html>

<head>
    <title>Search Results...</title>
</head>

<body>

<%
    final int PARTS_CAP = 5;
	
    String searchText = request.getParameter("searchText");
    boolean useFuzzy = request.getParameter("useFuzzy") == null || request.getParameter("useFuzzy").equalsIgnoreCase("0") ? false : true;
    SearchResults result = null;

    // Get the user from the session...
	Contact contact = ContextManager.getInstance().getCurrentContact();
	if ( contact == null){
		 %>
         <script type="text/javascript">
             top.location = "secureSearch.jsp";
         </script>
     	<%
    }

    if (contact != null) {
        try {
            /*int times = 20;
            long time = System.currentTimeMillis();
            for (int i=0; i< times; i++) {*/
                result = FreeFormSearchManager.getInstance(contact).search(contact, searchText, useFuzzy);
            /*}
            time = (System.currentTimeMillis()-time);
            time = time / times;
            System.out.println("AVG search took " + time + " ms.");*/
        } catch (Throwable t) {
            t.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            response.sendError(500, t.getMessage());
        }
        List<CatalogWithScore> catalogs = result.getResult();

        if (searchText != null && searchText.length() > 0) {
        	
%>

<div id="searchInfoDiv" style="position:fixed;top:0px;left:0px;right:0px;background-color:olive;;z-index:100">
<table width="99%" border="0" cellpadding="1px">
<tr>
	<td align="left" valign="top">
		<span style="font-size:13px;font-weight:bold;color:white;">Results for: </span>
		<span style="font-size:13px;font-weight:normal;color:white;"><%=searchText%></span>
		<span style="font-size:12px;font-weight:normal;color:white;">&nbsp;(In: <%=result.describeTotalSearchTime() %>)</span>
	</td>
	<td align="right" valign="top">
		<span style="font-size:11px;font-weight:normal;color:white;">			
		    &nbsp;
		    [<b>Time Breakdown:</b> Find Catalog(s): <%=result.describeCatalogueSearchTime() %>, 
					<%if (useFuzzy) { %> 
						Fuzzy Logic: <%=result.describeFuzzySearchTime() %>, 
					<%} %>					
					Find Part(s): <%=result.describePartSearchTime() %>,
					Perform Interpretation: <%=result.describeInterpretationTime() %> 
					]
		</span>
	</td>
</tr>


<%if (useFuzzy && result.getFuzzyMatchWords() != null && result.getFuzzyMatchWords().size() > 0){
	%><tr><td colspan="2">
		<div style="background-color: white;">
	<%
	StringBuilder sb = new StringBuilder();
	sb.append("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">");
	sb.append("<tr><td align=\"left\" valign=\"top\" >");
	sb.append("<span style=\"margin-top:1px;font-size:13px;font-weight:bold;color:maroon;text-decoration:none;\">Did you mean: </span>");
	
	sb.append("<span style=\"font-size:13px;color:navy;text-decoration:underline;\">");
	StringTokenizer tokenizer = new StringTokenizer(searchText, " ");	
	while (tokenizer.hasMoreTokens()) {
		String token = tokenizer.nextToken();
		boolean gotFuzzyMatch = false;
		for(Map.Entry<String, SearchResults.FuzzyResultInfo> entry : result.getFuzzyMatchWords().entrySet()) {
			if (entry.getValue().getOriginalWord().equalsIgnoreCase(token)) {
				sb.append("<span style=\"font-size:13px;color:maroon;text-decoration:underline;\"><i>");
				sb.append(entry.getValue().getFuzzyMatchWord());
				sb.append("</i></span>");
				gotFuzzyMatch = true;
				break;
			}
		}
		
		if (!gotFuzzyMatch) {
			sb.append(token);
		}
		
		if (tokenizer.hasMoreElements()){
			sb.append("&nbsp;");
		}
	}
	sb.append("</span>");
	sb.append("?");
	
	sb.append("</td><td align=\"right\" valign=\"top\">");
	sb.append("<span style=\"font-size:11px;color:navy;text-decoration:normal;\">");
	sb.append("&nbsp;[These results displayed are based on the suggested search criteria - ");
	sb.append("&nbsp;Click <a href=\"searchResults.jsp?useFuzzy=0&searchText=" + searchText + "\">Here</a> to use your original search criteria]");
	
	/*
	for(Map.Entry<String, SearchResults.FuzzyResultInfo> entry : result.getFuzzyMatchWords().entrySet()) {
		sb.append("<span style=\"font-size:11px;color:navy;text-decoration:underline;\">");
		sb.append(entry.getValue().getOriginalWord());
		sb.append("</span>&nbsp;into&nbsp;");
		sb.append("<span style=\"font-size:11px;color:maroon;text-decoration:underline;\">");
		sb.append(entry.getValue().getFuzzyMatchWord());		
		sb.append("</span><span style=\"font-size:11px;color:#007700;text-decoration:none;\">");
		sb.append("&nbsp;[" + entry.getValue().getResultCount() + " matches]");
		sb.append("<br></span>");
	}
	*/
	//sb.append("</td><td align=\"left\" valing=\"top\">");	
	sb.append("</td></tr></table>");
%>
<%=sb.toString() %>
	</div></td></tr>
<%} %>

</table>
<%
    }
%>
</div>

<div id="resultsTable" style="z-index:0;position:absolute;top:55px;width:90%;">
<table cellspacing="0" cellpadding="1" width="100%">
    <%
    if (catalogs!=null && catalogs.size() > 0){
        for (CatalogWithScore entry : catalogs) {
            CatalogResult catResult = entry.getCatalogWithParts().getCatalogResult();
            Catalog catalog = catResult.getCatalog();
    %>
    <tr>
        <%
            if (searchText != null && searchText.length() > 0) {
        %>
        <td valign="top" align="right">
							<span style="font-size:11px;font-style: italic;color:maroon;">
								<%=entry.getHitResults().getScoreAsString()%>
							</span>
        </td>
        <%
            }
        %>


        <td valign="top" align="center">
			<%
				String path = ConfigurationManager.get(FreeFormSearchConfigData.class).getSearchResultCatalogImagesBaseUrl().replace("\\","/");
				if (!path.endsWith("/")) {
					path += "/";
				}
				String imagePath = catalog.getImage().replace("\\","/") ;
				
				// Ensure 'titles' folder... 
				if (!path.toLowerCase().contains("titles") 
						&& !imagePath.toLowerCase().contains("titles")) {
					path += "titles/";
				}
				if (!path.endsWith("/") && !imagePath.startsWith("/")) {
					path += "/";
				}
				// Add image path to path...
				path += imagePath;				
				%>
            <img height="55px" src="<%=path%>.png"/>
        </td>

        <td colspan="6" valign="top">
                    <span style="font-size:14px;color:navy;font-weight:bold;text-decoration:underline;">
                    	<%=catResult.getDisplayText()%>
					</span>
            <%
                if (entry.getCatalogWithParts().getModelYears().size() > 0) {
            %>
            &nbsp;&nbsp;
							<span style="font-size:10px;color:gray;font-weight:bold;text-decoration:none;">
							(For Model Years:
						<%
                            boolean first = true;
                            for (String modelYear : entry.getCatalogWithParts().getModelYears()) {
                                if (!first) {
                        %>, <%
                                } else {
                                    first = false;
                                }
                            %>
                                <%=modelYear.length() == 2 ? "20" + modelYear : modelYear%>
                        <%
                            }
                        %>
							)</span>
            <%
                }
            %>

        </td>
    </tr>

    <%
        if (entry.getCatalogWithParts().getParts().size() > 0) {
    %>

    <%
        List<PartWithScore> partsWithScores = entry.getCatalogWithParts().getParts();
        int size = partsWithScores.size();
        int score = 0;
        int count = 0;
        for (int p = 0; p < partsWithScores.size(); p++) {
            count++;
            PartWithScore partWithScore = partsWithScores.get(p);
            Part part = partWithScore.getPart();

            String borderStyle = "";
            boolean endHere = false;
            if (p > PARTS_CAP || (score != 0 && score-35>partWithScore.getHitResults().getScore())) {
                borderStyle = "border-bottom: solid 1px #000066;";
                endHere = true;
            } else {
                borderStyle = "border-bottom: dashed 1px #990099;";
            }
    %>
    <tr>
        <td colspan="1" style="<%=borderStyle%>">&nbsp;</td>
        <td align="right" valign="center" style="<%=borderStyle%>">
											<span style="font-size:11px;font-style: italic;color:maroon;">
                                        		<%=partWithScore.getHitResults().getScoreAsString()%>
											</span>
        </td>
		<td align="center" valign="center" style="<%=borderStyle%>">
			<div style="margin:4px;">
<%
                         float priceVal = -1f;
//                         if (part.getPrice() != null && part.getPrice().getPrices() != null) {
//                        	 String priceLevel = UserPreferencesDataAccess.getInstance().getUserSubscriptionPreference(contact, UserPreferenceKey.PRICE_LEVEL);
//                             if (priceLevel == null) priceLevel = "SRP";
//                             for (Map.Entry<String, String> priceEntry : part.getPrice().getPrices().entrySet()) {
//                            	 if (priceEntry.getKey().equalsIgnoreCase(priceLevel)) {
//                            		 try {
//                            		 priceVal = Float.parseFloat(priceEntry.getValue());
//                            		 } catch(NumberFormatException e) {
//                            			 priceVal = 0f;
//                            		 }
//                            	 }
//                             }
//                         }
                            
                       if (priceVal > -1f) { %>		                    
							<span style="font-size:13px;font-weight:normal;color:navy;">
								<%=NumberFormat.getCurrencyInstance(Locale.ENGLISH).format(priceVal) %>
							</span>                        
						<%} else {%>
							<span style="font-size:13px;font-weight:normal;color:navy;">$?</span>
						<%} %>
			</div>
		</td>
        <td style="<%=borderStyle%>">
            <table width="100%">
                <tr>
                    <td valign="top" align="left">
												<span style="font-size:11px;font-weight:bold;color:navy;">
													<%=part.getDescription()%>
												</span>
												<span style="font-size:11px;font-weight:bold;color:gray;">
													&nbsp;(<%=part.getPartCode()%>)
												</span>
												<span style="font-size:11px;font-weight:normal;color:navy;">
													, Qty: <%= part.getQuantity()%>
													, Validity: <%=part.getBeginDate()%> - <%=part.getEndDate()%>
												</span>
												<span style="font-size:11px;font-weight:normal;color:navy;">
													<%=StringUtils.isNotEmpty(part.getRemark()) ? "<br/>" + part.getRemark() : "" %>
												</span>
                        <%if (part.getSupersessionAbbreviation() != null && part.getSupersessionAbbreviation().length() > 0) { %>
													<span style="font-size:10px;font-weight:bold;color:gray;">
														&nbsp;[Supersession: <%=part.getSupersessionAbbreviation()%> (<%=part.getSupersessionCode()%>) - <%=part.getSupersessionCodeDescription()%>]
													</span>
                        <%} %>
                    </td>
					<% if (part.getSections() != null && part.getSections().size() > 0) {
							if (!part.getIllustratedInChart()
									&& part.getSections().get(0) != null) {
					%>
					<td valign="top" align="left" style="border: solid 1px #660000;">
						<%
								
								path = ConfigurationManager.get(FreeFormSearchConfigData.class).getSearchResultCatalogImagesBaseUrl().replace("\\","/");
								if (!path.endsWith("/")) {
									path += "/";
								}
								String sectionFolder = null;//part.getSections().get(0).getFolder();
								if (sectionFolder == null) sectionFolder = "";

								String sectionImage = null;// part.getSections().get(0).getImage();
								if (sectionFolder == null) {
									sectionFolder = "";
									sectionImage = "NonIllustrated.gif";
								}

								// Ensure 'cat' folder...
								if (!path.toLowerCase().contains("cat")
										&& !sectionFolder.toLowerCase().contains("cat")
										&& !(sectionFolder.length() == 0)) {
									path += "cat/";
								}

								if (!path.endsWith("/") && !sectionFolder.startsWith("/")) {
									path += "/";
								}
								path += sectionFolder;

								if (!path.endsWith("/") && !sectionImage.startsWith("/")) {
									path += "/";
								}
								path += sectionImage;

								// Add image path to path...
								path += imagePath;
							%>
								<a href="<%=path%>.gif" target="_about:blank">
									<img src="<%=path%>.gif" height="55px" />
								</a>						
					</td>
							<%	}
						 } %>
												
                    <td align="left" style="font-size:10px;font-weight:normal;color:graytext;text-align:right;">[<%=part.getUID()%> (<%=part.getPartId()%>)]</td>
                </tr>
            </table>
        </td>
    </tr>
    <%
            if (endHere) {
                break;
            }
            score = partWithScore.getHitResults().getScore();
        }


        if (size > PARTS_CAP) {
            DecimalFormat formatter = new DecimalFormat("###,###");
    %>
    <tr>
        <td colspan="1" style="border-bottom: solid 2px #000066;">&nbsp;</td>
        <td colspan="6" style="border-bottom: solid 2px #000066;">
			<span style="margin-left:36px;font-size:12px;font-weight:bold;color:navy;">
				And <%= formatter.format(size - count)%> more...
			</span>
        </td>
    </tr>
    <%
    } else {
    %>
    <tr>
        <td colspan="8" style="border-bottom: solid 2px #000066;">
        </td>
    </tr>
    <%
        }
    %>
    
    <%
    } else {
        // No Parts in this catalogue...
    %>
    <tr>
        <td colspan="8" style="border-bottom: solid 1px #000066;">&nbsp;</td>
    </tr>
    <%
        }
    %>
    </td>
    </tr>
    <%
        }
    }
    %>
</table>


<%
    if (searchText == null || searchText.length() == 0) {
        DecimalFormat formatter = new DecimalFormat("###,###");
%><b>A Sample of the <%=formatter.format(FNAVinFreeformSearchManager.getInstance().getVinCount()) %> Vins:</b>
<%
    List<String> sampleVins = FNAVinFreeformSearchManager.getInstance().getSampleVins();
    if (sampleVins != null) {
        for (String vin : sampleVins) {
%><br><%=vin %>
<%
                }
            }
        }

    }
%>

</div>

</body>
</html>

