function getQueryVariable(variable) 
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) 
  {
    var pair = vars[i].split("=");
    if (pair[0] == variable) 
    {
      return pair[1];
    }
  } 
  //alert('Query Variable ' + variable + ' not found');
}

function replaceAll(str, from, to) 
{
    var idx = str.indexOf(from);
    while (idx > -1) 
    {
        str = str.replace(from, to); 
        idx = str.indexOf(from);
    }
    return str;
}

function removeObjectFlash(obj)
{
    var oRE = new RegExp('<OBJECT ' + ".*?" + '>', "gi");
    obj = obj.replace(oRE, '');
    return obj;
}
function firefoxFixLink(obj)
{
    var oRE = new RegExp('<A ' + ".*?" + '>', "gi");
    obj = obj.replace(oRE, '<A href=\"' + 'javascript:return false;' + '\">');
    return obj;
}
function removeImg(obj)
{
    var oRE = new RegExp('<img ' + ".*?" + '></OBJECT>', "gi");
    obj = obj.replace(oRE, '');
    return obj;
}
function removeParam(obj)
{
    var oRE = new RegExp('<param ' + ".*?" + '>', "gi");
    obj = obj.replace(oRE, '');
    return obj;
}
function removeGoBackButton(obj)
{
        obj = obj.replace('javascript:history.go(-1);', '#');
        return obj;
}
function PrintThisPage() 
{ 

    var winl = (screen.width-700)/2;
    var wint = (screen.height-600)/2;

    var sOption="toolbar=no,location=no,directories=no,menubar=yes,"; 
    sOption+="scrollbars=yes,width=700,height=600,left=" + winl + ",top=" + wint; 

    var sWinHTML = document.getElementById('contentstart').innerHTML; 
    var getQuery = getQueryVariable("Page");
       
    sWinHTML = removeObjectFlash(sWinHTML);
    sWinHTML = removeImg(sWinHTML);
    sWinHTML = removeParam(sWinHTML);
     
    if (browserKind == "Firefox")
    {
        //sWinHTML = removeGoBackButton(sWinHTML);
        //sWinHTML = replaceAll(sWinHTML, "<A ", "<a onclick=\"return false;\" ");
        sWinHTML = firefoxFixLink(sWinHTML);
        outputText = "\r\n<html><head><title>" + document.title + "</title>";
        
        if(currentTheme == "")
        { 
            outputText += "\r\n<style type=\"text/css\" media=\"screen\" id=\"theRightStyle\">\r\n";
            outputText += "\t @import \"App_Themes/ProductSalesSupport/PssFirefoxPrintReadyScreen.css\";\r\n";
            //outputText += "\t @import \"App_Themes/ProductSalesSupport/PssFirefoxPrintReadyPrint.css\";\r\n";
            outputText += "</style>\r\n";
            
            outputText += "\r\n<style type=\"text/css\" media=\"print\" id=\"theRightStyle\">\r\n";
            outputText += "\t @import \"App_Themes/ProductSalesSupport/PssFirefoxPrintReadyPrint.css\";\r\n";
            outputText += "</style>\r\n";
        }   
        else
        {
            outputText += "\r\n<style type=\"text/css\" media=\"screen\" id=\"theRightStyle\">\r\n";
            outputText += "\t @import \"App_Themes/" + currentTheme + "/skin.css\";\r\n";
            outputText += "</style>\r\n";
            
            outputText += "\r\n<style type=\"text/css\" media=\"print\" id=\"theRightStyle\">\r\n";
            outputText += "\t @import \"App_Themes/" + currentTheme + "/skin.css\";\r\n";
            outputText += ".hidePrintInfo{display:none;}";
            outputText += "</style>\r\n";         
        } 
        
        //outputText += "<script language=\"javascript\" type=\"text/javascript\">AC_FL_RunContent = -1;</script>";
        //outputText += "<script language=\"javascript\" type=\"text/javascript\" src=\"Scripts/AC_RunActiveContent.js\"></script>";
        outputText += "<script language=\"javascript\" type=\"text/javascript\"> \n\r <!-- \n\r slidespeed = 1; \n\r //--> \n\r </script>";
        

        outputText += "</head>";
        
        legalPrinting = "<br/><div style=\"clear:both;width:100%;display:block;\"></div><span class=\"copyright\" id=\"printerFooterSpan\" ><img src=\"CommonImages/Footer/Infomedia.gif\" alt=\"Infomedia\" border=\"0\" />&nbsp;&nbsp;&nbsp;&nbsp; " + copyright + "</span><br/>";


        var winprint=window.open("","",sOption); 
        winprint.document.open();         
        winprint.document.write(outputText + '<body><div style=\"margin-top:8px;text-align:right;width:99%;padding:6px;\" class=\"hidePrintInfo\"><a href=\"#\" title=\"' + printThisPage + '\" onclick=\"window.print();return false;\">' + printThisPage + '</a> | <a href=\"#\" title=\"' + printClose + '\" onclick=\"window.close();return false;\">' + printClose + '</a></div><br/>' + sWinHTML + legalPrinting + '<br/><div style=\"text-align:right;width:99%;padding:6px;clear:both;\" class=\"hidePrintInfo\"><a href=\"#\" title=\"' + printThisPage + '\" onclick=\"window.print();return false;\">' + printThisPage + '</a> | <a href=\"#\" title=\"' + printClose + '\" onclick=\"window.close();return false;\">' + printClose + '</a></div></body></html>');          
        winprint.document.close();  
    }
    else if (browserKind == "IE")
    {
        sWinHTML = replaceAll(sWinHTML, "<A ", "<a onclick=\"return false;\" ");
        outputText = "\r\n<html><head><title>" + document.title + "</title>";
        
        if(currentTheme == "")
        {               
            outputText += "\r\n<style type=\"text/css\" media=\"screen\" id=\"theRightStyle\">\r\n";
            outputText += "\t @import \"App_Themes/ProductSalesSupport/PssIEPrintReadyScreen.css\";\r\n";
            //outputText += "\t @import \"App_Themes/ProductSalesSupport/PssIEPrintReadyPrint.css\";\r\n";
            outputText += "</style>\r\n";
            
            outputText += "\r\n<style type=\"text/css\" media=\"print\" id=\"theRightStyle\">\r\n";
            outputText += "\t @import \"App_Themes/ProductSalesSupport/PssIEPrintReadyPrint.css\";\r\n";
            outputText += "</style>\r\n";
        }
        else
        {
            outputText += "\r\n<style type=\"text/css\" media=\"screen\" id=\"theRightStyle\">\r\n";
            outputText += "\t @import \"App_Themes/" + currentTheme + "/skin.css\";\r\n";
            outputText += "</style>\r\n";
            
            outputText += "\r\n<style type=\"text/css\" media=\"print\" id=\"theRightStyle\">\r\n";
            outputText += "\t @import \"App_Themes/" + currentTheme + "/skin.css\";\r\n";
            outputText += ".hidePrintInfo{display:none;}";
            outputText += "</style>\r\n";         
        } 
                      
        outputText += "<script language=\"javascript\" type=\"text/javascript\">AC_FL_RunContent = -1;</script>";
        outputText += "<script language=\"javascript\" type=\"text/javascript\" src=\"Scripts/AC_RunActiveContent.js\"></script>";
        outputText += "</head>";
        
        legalPrinting = "<br/><span class=\"copyright\" id=\"printerFooterSpan\" ><img src=\"CommonImages/Footer/Infomedia.gif\" alt=\"Infomedia\" border=\"0\" />&nbsp;&nbsp;&nbsp;&nbsp; " + copyright + "</span><br/>";

        var winprint=window.open("","",sOption); 
        winprint.document.open(); 
        winprint.document.write(outputText + '<body><div style=\"margin-top:8px;text-align:right;width:100%;padding:6px;border:1px solid #D4D5D5;\" class=\"hidePrintInfo\"><a href=\"#\" title=\"' + printThisPage + '\" onclick=\"window.print();\">' + printThisPage + '</a> | <a href=\"#\" title=\"' + printClose + '\" onclick=\"window.close();\">' + printClose + '</a></div><br/>' + sWinHTML + legalPrinting + '<br/><div style=\"text-align:right;width:100%;padding:6px;border:1px solid #D4D5D5;\" class=\"hidePrintInfo\"><a href=\"#\" title=\"' + printThisPage + '\" onclick=\"window.print();\">' + printThisPage + '</a> | <a href=\"#\" title=\"' + printClose + '\" onclick=\"window.close();\">' + printClose + '</a></div></body></html>');          
        winprint.document.close();    
    }
}