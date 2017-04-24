<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xhtml" indent="yes" doctype-public="-//W3C//DTD XHTML 1.1//EN" doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"/>
    <xsl:variable name="endpoint" select="/userreport/@endpoint"/>
    <xsl:template match="/">
        <table cellspacing="0" cellpadding="10px" width="100%">
            <tr>
                <td valign="top" align="left">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                           style="table-layout:fixed">
                        <col width="50"/>
                        <col width="250"/>
                        <col width="100"/>
                        <col width="150"/>
                        <col width="100"/>
                        <col width="150"/>
                        <col width="80"/>
                        <col width="*"/>
                        <tr>
                            <td>
                                <b>Valid</b>
                            </td>
                            <td>
                                <b>Username</b>
                            </td>
                            <td>
                                <b>Market</b>
                            </td>
                            <td>
                                <b>Solution Edition</b>
                            </td>
                            <td>
                                <b>Franchise</b>
                            </td>
                            <td>
                                <b>Contact Cached</b>
                            </td>
                            <td>
                                <b>SalesForce</b>
                            </td>
                            <td>
                                <b>Issues</b>
                            </td>
                        </tr>
                        <xsl:apply-templates select="/userreport/users/user"/>
                    </table>
                </td>
            </tr>
        </table>
    </xsl:template>
    <xsl:template match="user">
        <xsl:variable name="usernameNoSymbols" select="translate(translate(@username, '@', '_'), '.', '_')"/>
        <xsl:variable name="className">
            <xsl:choose>
                <xsl:when test="@isvalid = 'true'">
                    <xsl:text>normal</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>error</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:element name="tr">
            <xsl:attribute name="class" select="$className"/>
            <td>
                <xsl:value-of select="@isvalid"/>
            </td>
            <xsl:element name="td">
                <xsl:attribute name="class">clickableDivBlue</xsl:attribute>
                <xsl:attribute name="style">text-align: left;</xsl:attribute>
                <xsl:attribute name="onClick">
                    <xsl:text>if( xml_</xsl:text>
                    <xsl:value-of select="$usernameNoSymbols"/>
                    <xsl:text>.style.display == 'none' ){</xsl:text>
                    <xsl:text>xml_</xsl:text>
                    <xsl:value-of select="$usernameNoSymbols"/>
                    <xsl:text>.style.display = 'block';</xsl:text>
                    <xsl:text>} else {</xsl:text>
                    <xsl:text>xml_</xsl:text>
                    <xsl:value-of select="$usernameNoSymbols"/>
                    <xsl:text>.style.display = 'none';</xsl:text>
                    <xsl:text>}</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="@username"/>
            </xsl:element>
            <td>
                <xsl:value-of select="@market"/>
            </td>
            <td>
                <xsl:value-of select="@solutionedition"/>
            </td>
            <td>
                <xsl:value-of select="@franchise"/>
            </td>
            <td>
                <xsl:value-of select="@contactcached"/>
            </td>
            <td>
                <xsl:element name="a">
                    <xsl:attribute name="class">clickableDivBlue</xsl:attribute>
                    <xsl:attribute name="style">text-decoration:none;</xsl:attribute>
                    <xsl:attribute name="href">
                        <xsl:value-of select="$endpoint"/>
                        <xsl:text>/getAllSubscriptionsForContact?emailaddress=</xsl:text>
                        <xsl:value-of select="@username"/>                    
                    </xsl:attribute>
                    <xsl:attribute name="target">new</xsl:attribute>
                    link
                </xsl:element>
            </td>
            <td>
                <xsl:value-of select="@issues"/>
            </td>
        </xsl:element>
        <xsl:element name="tr">
            <xsl:attribute name="colspan">7</xsl:attribute>
            <xsl:attribute name="id">
                <xsl:text>xml_</xsl:text>
                <xsl:value-of select="$usernameNoSymbols"/>
            </xsl:attribute>
            <xsl:attribute name="style">display:none;</xsl:attribute>
            <td>
                <textarea style="width:860px; height:600px;">
                    <xsl:value-of select="userxml"/>
                </textarea>
            </td>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>
