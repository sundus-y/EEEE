
<%@page import="au.com.infomedia.epc.context.ContextManager"%>
<%@page import="au.com.infomedia.security.data.Contact"%>

<html>

<head>
    <script type="text/javascript">
        function submit() {
            var searchText = document.getElementById('searchText').value;
            var useFuzz = document.getElementById('useFuzzy').checked ? '1' : '0';
            var resultFrame = document.getElementById('result');
            resultFrame.src = "presearch.jsp?useFuzzy=" + useFuzz + "&searchText=" + searchText;
        }

        function processKeyDown(event) {
            var showResults = document.getElementById('showResults').checked;
            if (showResults || event.keyCode == 13) {
                submit();
            }
        }
    </script>
</head>

<body>
<%
//Get the user from the session...
	Contact contact = ContextManager.getInstance().getCurrentContact();
	if ( contact == null){
		 %>
	     <script type="text/javascript">
	         top.location = "secureSearch.jsp";
	     </script>
	 	<%
	} else {
%>


<div id="userdetailsDiv" style="position: absolute;right:5px;">
	<span style="font-size:11px;font-weight:normal;color:#8a9caa;">
		Logged In: <%=contact.getFirstName() + " " + contact.getLastName() + ", Your Market: " + ContextManager.getInstance().getCurrentMarket() %>
	</span>
</div>


    <input id="searchText" name="searchText" type="text" size="35" onkeydown="processKeyDown(event);"/>
    &nbsp;&nbsp;
    <button onclick="submit()">Search!</button>
    &nbsp;&nbsp;
    <input id="showResults" name="showResultsn" type="checkbox">Show Results While Typing</input>
	&nbsp;&nbsp;
    <input id="useFuzzy" name="useFuzzyn" checked type="checkbox">Allow Fuzzy Search</input>
    <br/>
    <br/>
    <iframe id="result" name="results" src="searchResults.jsp" frameborder="1" width="100%" height="92%" scrolling="auto"/>
<%} %>
</body>

</html>