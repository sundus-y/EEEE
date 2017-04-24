<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xhtml" indent="yes" doctype-public="-//W3C//DTD XHTML 1.1//EN"
                doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"/>
    <xsl:template match="/">

                            <table cellspacing="0" cellpadding="10px" width="100%">
                                <tr>
                                    <td valign="top" align="left">
                                        <table cellpadding="0" cellspacing="0" border="0"
                                               style="table-layout:fixed">
                                            <col width="200"/>
                                            <col width="100"/>
                                            <tr>
                                                <td colspan="2">
                                                    <h3>Catalog Summary</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Catalog</b>
                                                </td>
                                                <td>
                                                    <b>Missing Images</b>
                                                </td>
                                            </tr>
                                            <xsl:apply-templates select="//catalog" mode="summary"/>
                                        </table>
                                        <br/>
                                        <xsl:apply-templates select="//catalog" mode="detail"/>
                                    </td>
                                </tr>
                        </table>
    </xsl:template>
    <xsl:template match="catalog" mode="summary">
        <tr>
            <td align="left">
                <xsl:element name="a">
                    <xsl:attribute name="href">#<xsl:value-of select="@code"/>
                    </xsl:attribute>
                    <xsl:attribute name="style">text-align: left;</xsl:attribute>
                    <xsl:value-of select="@name"/>
                </xsl:element>
            </td>
            <td>
                <xsl:value-of select="count(missingimage)"/>
            </td>
        </tr>
    </xsl:template>
    <xsl:template match="catalog" mode="detail">
        <h2>
            <xsl:element name="a">
                <xsl:attribute name="name">
                    <xsl:value-of select="@code"/>
                </xsl:attribute>
                <xsl:value-of select="@name"/>
            </xsl:element>
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed">
            <col width="100"/>
            <col width="100"/>
            <col width="*"/>
            <tr>
                <td colspan="3">
                    <h3>Missing Images</h3>
                </td>
            </tr>
            <tr>
                <td>
                    <b>Type</b>
                </td>
                <td>
                    <b>Code</b>
                </td>
                <td>
                    <b>Expected Path</b>
                </td>
            </tr>
            <xsl:apply-templates select="missingimage[@type='catalog']"/>
            <xsl:apply-templates select="missingimage[@type='graphicindex']"/>
            <xsl:apply-templates select="missingimage[@type='section']"/>
        </table>
    </xsl:template>
    <xsl:template match="missingimage">
        <tr>
            <td>
                <xsl:value-of select="@type"/>
            </td>
            <td>
                <xsl:value-of select="@code"/>
            </td>
            <td>
                <xsl:value-of select="@expectedpath"/>
            </td>
        </tr>
    </xsl:template>
</xsl:stylesheet>
