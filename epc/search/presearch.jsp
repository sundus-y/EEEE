<html>
<body>

<%
String searchText = request.getParameter("searchText");
String useFuzzy = request.getParameter("useFuzzy");
String path = "searchResults.jsp?useFuzzy=" + useFuzzy + "&searchText=" + searchText;
path = path.replace("'", "''");
%>


<span style="font-size:13px;font-weight:bold;color:navy;">Please wait while we execute your search...</span>

<div style="position:fixed;left:50%;top:50%;">
	<img height="120px" width="120px" src="resources/public/images/progress.gif" />
</div>

<script type="text/javascript">
	function executeSearch() {
		window.location = '<%=path%>';
	}
	window.setTimeout('executeSearch()', 5);
</script>

</body>
</html>

