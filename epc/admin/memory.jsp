<%@ page import="au.com.infomedia.util.RuntimeUtils" %>
<%@ page import="java.util.Date" %>

<%

    Date date = new Date();
    boolean isPerformGC = (request.getParameter("gc") != null && request.getParameter("gc").equalsIgnoreCase("TRUE"));
    if (isPerformGC) {
        System.out.println("Invoking GC... [Free Memory =  " + RuntimeUtils.getFreeMemoryDescriptionMb() + "]");
        RuntimeUtils.gc();
        Thread.sleep(5000);
        System.out.println("Finished GC. [Free Memory =  " + RuntimeUtils.getFreeMemoryDescriptionMb() + "]");
    }
%>

<head>
    <script type="text/javascript">
        var isPerformGC = <%=isPerformGC%>;
        function performGC() {
            var button = document.getElementById("button");
            button.disabled="true";
            var progress = document.getElementById("progress");
            progress.style.visibility="visible";
            var innerFrame = document.getElementById("gc");
            innerFrame.src = "memory.jsp?gc=TRUE";
        }

        function finishedLoading() {
            if (isPerformGC) {
                parent.window.location=parent.window.location;
            }
        }
    </script>
</head>

<body onload="finishedLoading()">
<%--<%=date.toString()%>--%>
<br/>

<table>
    <tr>
        <td>
            <br/>
            Used memory: <%=RuntimeUtils.getUsedMemoryDescriptionMb()%>, Free Memory: <span style="color:maroon;"><%=RuntimeUtils.getFreeMemoryDescriptionMb() %></span>
        </td>
    </tr>
    <tr>
        <td>
            <br/>
            <button id="button" name="button" onclick="performGC();">Execute Garbage Collection Now!</button>
        </td>
    </tr>
    <tr>
        <td>
            <br/>
            <img id="progress" name="progress" src="resources/public/images/progress.gif" style="visibility:hidden;"/>
        </td>
    </tr>
</table>

<br/>
<br/>

<iframe id="gc" name="gc" src="" frameborder="1" style="visibility:hidden;"/>

</body>