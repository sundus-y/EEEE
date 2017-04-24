CMCXmlParser._FilePathToXmlStringMap.Add(
	'Stylesheet',
	'<?xml version=\"1.0\" encoding=\"utf-8\"?>' +
	'<Stylesheet>' +
	'    <Styles>' +
	'        <Style Name=\"Header\">' +
	'            <Properties>' +
	'                <Property Name=\"BorderTop\">solid 1px #D8DFE7</Property>' +
	'                <Property Name=\"BorderBottom\">solid 1px #323C47</Property>' +
	'                <Property Name=\"BackgroundImage\">url(\'header.png\')</Property>' +
	'            </Properties>' +
	'        </Style>' +
	'        <Style Name=\"Home Button\">' +
	'            <Properties>' +
	'                <Property Name=\"LabelWithNoneOption\">主页</Property>' +
	'            </Properties>' +
	'        </Style>' +
	'        <Style Name=\"Navigation Element\">' +
	'            <Classes>' +
	'                <StyleClass Name=\"TOC - Home Page Row\">' +
	'                    <Properties>' +
	'                        <Property Name=\"LabelWithNoneOption\">目录</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Index - Home Page Row\">' +
	'                    <Properties>' +
	'                        <Property Name=\"LabelWithNoneOption\">索引</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Glossary - Home Page Row\">' +
	'                    <Properties>' +
	'                        <Property Name=\"LabelWithNoneOption\">词汇表</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Browse Sequence - Home Page Row\">' +
	'                    <Properties>' +
	'                        <Property Name=\"LabelWithNoneOption\">浏览序列</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"About - Home Page Row\">' +
	'                    <Properties>' +
	'                        <Property Name=\"LabelWithNoneOption\">关于</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Index Page\">' +
	'                    <Properties>' +
	'                        <Property Name=\"SeeReference\">请参阅：</Property>' +
	'                        <Property Name=\"SeeAlsoReference\">另请参阅：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Search Results Page\">' +
	'                    <Properties>' +
	'                        <Property Name=\"NoResultsFoundString\">未找到结果。</Property>' +
	'                        <Property Name=\"SearchErrorString\">搜索期间发生错误。请重试。</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Index Heading\">' +
	'                    <Properties>' +
	'                        <Property Name=\"BackgroundImage\">url(\'IndexHeadingBG.png\')</Property>' +
	'                        <Property Name=\"Height\">23px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Glossary Heading\">' +
	'                    <Properties>' +
	'                        <Property Name=\"BackgroundImage\">url(\'IndexHeadingBG.png\')</Property>' +
	'                        <Property Name=\"Height\">23px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'            </Classes>' +
	'        </Style>' +
	'        <Style Name=\"Search Bar\">' +
	'            <Properties>' +
	'                <Property Name=\"BackgroundImage\">url(\'SearchBG.png\')</Property>' +
	'            </Properties>' +
	'        </Style>' +
	'        <Style Name=\"Search Button\">' +
	'            <Properties>' +
	'                <Property Name=\"LabelWithNoneOption\">搜索</Property>' +
	'            </Properties>' +
	'        </Style>' +
	'        <Style Name=\"Formats\">' +
	'            <Properties>' +
	'                <Property Name=\"CrossReferenceFormat\">请参阅 \\\"{para}\"\\</Property>' +
	'                <Property Name=\"CrossReferencePrintFormat\">请参阅第 {page} 页上的 \\\"{para}\"\\</Property>' +
	'                <Property Name=\"CrossReferenceBelow\">向下</Property>' +
	'                <Property Name=\"CrossReferenceAbove\">向上</Property>' +
	'                <Property Name=\"CrossReferenceOnPage\">在本页</Property>' +
	'                <Property Name=\"CrossReferenceOnPreviousPage\">上一页</Property>' +
	'                <Property Name=\"CrossReferenceOnNextPage\">下一页</Property>' +
	'                <Property Name=\"CrossReferenceOnFacingPage\">对页</Property>' +
	'                <Property Name=\"BreadcrumbsYouAreHereText\">您在此处：</Property>' +
	'                <Property Name=\"KeywordLinkText\">搜索索引</Property>' +
	'                <Property Name=\"RelatedTopicsText\">相关主题</Property>' +
	'                <Property Name=\"ConceptLinkText\">另请参阅</Property>' +
	'            </Properties>' +
	'        </Style>' +
	'        <Style Name=\"Relationships\">' +
	'            <Classes>' +
	'                <StyleClass Name=\"concept\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">概念信息</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"task\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">相关任务</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"reference\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">参考资料</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'            </Classes>' +
	'        </Style>' +
	'        <Style Name=\"TocEntry\">' +
	'            <Properties>' +
	'                <Property Name=\"TopicIcon\">url(\'Topic.gif\')</Property>' +
	'                <Property Name=\"TopicIconAlternateText\">主题</Property>' +
	'                <Property Name=\"BookIcon\">url(\'Book.gif\')</Property>' +
	'                <Property Name=\"BookOpenIcon\">url(\'BookOpen.gif\')</Property>' +
	'                <Property Name=\"BookIconAlternateText\">书本</Property>' +
	'                <Property Name=\"MarkAsNewIconAlternateText\">新建</Property>' +
	'            </Properties>' +
	'        </Style>' +
	'        <Style Name=\"IndexEntry\">' +
	'            <Properties>' +
	'                <Property Name=\"SeeReference\">请参阅：</Property>' +
	'                <Property Name=\"SeeAlsoReference\">另请参阅：</Property>' +
	'            </Properties>' +
	'        </Style>' +
	'        <Style Name=\"AccordionItem\">' +
	'            <Properties>' +
	'                <Property Name=\"ItemHeight\">28px</Property>' +
	'            </Properties>' +
	'            <Classes>' +
	'                <StyleClass Name=\"IconTray\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ItemHeight\">28px</Property>' +
	'                        <Property Name=\"BackgroundImage\">url(\'AccordionIconsBackground.jpg\')</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"TOC\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">目录</Property>' +
	'                        <Property Name=\"Icon\">url(\'TocIcon.gif\')</Property>' +
	'                        <Property Name=\"BackgroundImage\">url(\'TocAccordionBackground.jpg\')</Property>' +
	'                        <Property Name=\"BackgroundImageHover\">url(\'TocAccordionBackground_over.jpg\')</Property>' +
	'                        <Property Name=\"ItemHeight\">28px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Index\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">索引</Property>' +
	'                        <Property Name=\"Icon\">url(\'IndexIcon.gif\')</Property>' +
	'                        <Property Name=\"BackgroundImage\">url(\'IndexAccordionBackground.jpg\')</Property>' +
	'                        <Property Name=\"BackgroundImageHover\">url(\'IndexAccordionBackground_over.jpg\')</Property>' +
	'                        <Property Name=\"ItemHeight\">28px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Favorites\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">书签</Property>' +
	'                        <Property Name=\"Icon\">url(\'FavoritesIcon.gif\')</Property>' +
	'                        <Property Name=\"BackgroundImage\">url(\'FavoritesAccordionBackground.jpg\')</Property>' +
	'                        <Property Name=\"BackgroundImageHover\">url(\'FavoritesAccordionBackground_over.jpg\')</Property>' +
	'                        <Property Name=\"ItemHeight\">28px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Glossary\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">词汇表</Property>' +
	'                        <Property Name=\"Icon\">url(\'GlossaryIcon.gif\')</Property>' +
	'                        <Property Name=\"BackgroundImage\">url(\'GlossaryAccordionBackground.jpg\')</Property>' +
	'                        <Property Name=\"BackgroundImageHover\">url(\'GlossaryAccordionBackground_over.jpg\')</Property>' +
	'                        <Property Name=\"ItemHeight\">28px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"BrowseSequence\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">浏览序列</Property>' +
	'                        <Property Name=\"Icon\">url(\'BrowsesequencesIcon.gif\')</Property>' +
	'                        <Property Name=\"BackgroundImage\">url(\'BrowsesequencesAccordionBackground.jpg\')</Property>' +
	'                        <Property Name=\"BackgroundImageHover\">url(\'BrowsesequencesAccordionBackground_over.jpg\')</Property>' +
	'                        <Property Name=\"ItemHeight\">28px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Search\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">搜索</Property>' +
	'                        <Property Name=\"Icon\">url(\'SearchIcon.gif\')</Property>' +
	'                        <Property Name=\"BackgroundImage\">url(\'SearchAccordionBackground.jpg\')</Property>' +
	'                        <Property Name=\"BackgroundImageHover\">url(\'SearchAccordionBackground_over.jpg\')</Property>' +
	'                        <Property Name=\"ItemHeight\">28px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'            </Classes>' +
	'        </Style>' +
	'        <Style Name=\"ToolbarItem\">' +
	'            <Classes>' +
	'                <StyleClass Name=\"AccordionTitle\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">AccordionTitle</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"QuickSearch\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'QuickSearch.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'QuickSearch_selected.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'QuickSearch_over.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">快速搜索</Property>' +
	'                        <Property Name=\"SearchBoxTooltip\">快速搜索文本框</Property>' +
	'                        <Property Name=\"ControlType\">QuickSearch</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Logo\">' +
	'                    <Properties>' +
	'                        <Property Name=\"LogoAlternateText\">徽标图标</Property>' +
	'                        <Property Name=\"AboutBoxAlternateText\">关于</Property>' +
	'                        <Property Name=\"Icon\">url(\'LogoIcon.gif\')</Property>' +
	'                        <Property Name=\"ControlType\">Logo</Property>' +
	'                        <Property Name=\"Tooltip\">徽标图标</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"ExpandAll\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">ExpandAll</Property>' +
	'                        <Property Name=\"Icon\">url(\'Expand.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Expand_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Expand_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">全部展开</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"CollapseAll\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">CollapseAll</Property>' +
	'                        <Property Name=\"Icon\">url(\'Collapse.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Collapse_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Collapse_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">全部折叠</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"RemoveHighlight\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">RemoveHighlight</Property>' +
	'                        <Property Name=\"Icon\">url(\'Highlight.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Highlight_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Highlight_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">搜索突出显示关闭</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Print\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">Print</Property>' +
	'                        <Property Name=\"Icon\">url(\'Print.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Print_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Print_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">打印主题</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"ToggleNavigationPane\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'HideNavigation.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'HideNavigation_selected.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'HideNavigation_over.gif\')</Property>' +
	'                        <Property Name=\"CheckedIcon\">url(\'HideNavigation_checked.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">隐藏导航栏</Property>' +
	'                        <Property Name=\"ShowTooltip\">显示导航栏</Property>' +
	'                        <Property Name=\"ControlType\">ToggleNavigationPane</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Back\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">Back</Property>' +
	'                        <Property Name=\"Icon\">url(\'Back.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Back_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Back_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">后退</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Forward\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">Forward</Property>' +
	'                        <Property Name=\"Icon\">url(\'Forward.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Forward_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Forward_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">前进</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Home\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">Home</Property>' +
	'                        <Property Name=\"Icon\">url(\'Home.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Home_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Home_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">主页</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Stop\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">Stop</Property>' +
	'                        <Property Name=\"Icon\">url(\'Stop.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Stop_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Stop_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">停止</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Refresh\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">Refresh</Property>' +
	'                        <Property Name=\"Icon\">url(\'Refresh.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Refresh_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Refresh_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">刷新</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SelectTOC\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">SelectTOC</Property>' +
	'                        <Property Name=\"Icon\">url(\'SelectToc.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'SelectToc_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'SelectToc_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">目录</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SelectIndex\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">SelectIndex</Property>' +
	'                        <Property Name=\"Icon\">url(\'SelectIndex.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'SelectIndex_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'SelectIndex_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">索引</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SelectSearch\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">SelectSearch</Property>' +
	'                        <Property Name=\"Icon\">url(\'SelectSearch.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'SelectSearch_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'SelectSearch_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">搜索</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SelectFavorites\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">SelectFavorites</Property>' +
	'                        <Property Name=\"Icon\">url(\'SelectFavorites.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'SelectFavorites_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'SelectFavorites_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">书签</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SelectGlossary\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">SelectGlossary</Property>' +
	'                        <Property Name=\"Icon\">url(\'SelectGlossary.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'SelectGlossary_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'SelectGlossary_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">词汇表</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SelectBrowseSequence\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">SelectBrowseSequence</Property>' +
	'                        <Property Name=\"Icon\">url(\'SelectBrowseSequences.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'SelectBrowseSequences_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'SelectBrowseSequences_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">浏览序列</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"AddTopicToFavorites\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">AddTopicToFavorites</Property>' +
	'                        <Property Name=\"Icon\">url(\'AddTopicToFavorites.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'AddTopicToFavorites_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'AddTopicToFavorites_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">将主题添加到书签</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"TopicRatings\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Tooltip\">主题评级</Property>' +
	'                        <Property Name=\"EmptyIcon\">url(\'Rating0.gif\')</Property>' +
	'                        <Property Name=\"FullIcon\">url(\'RatingGold100.gif\')</Property>' +
	'                        <Property Name=\"RatingSubmittedMessage\">Thank you for submitting your rating!</Property>' +
	'                        <Property Name=\"ControlType\">TopicRatings</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"EditUserProfile\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">EditUserProfile</Property>' +
	'                        <Property Name=\"Icon\">url(\'EditUserProfile.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'EditUserProfile_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'EditUserProfile_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">编辑用户配置文件</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"PreviousTopic\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">PreviousTopic</Property>' +
	'                        <Property Name=\"Icon\">url(\'PreviousTopic.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'PreviousTopic_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'PreviousTopic_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">上一个主题</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"NextTopic\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">NextTopic</Property>' +
	'                        <Property Name=\"Icon\">url(\'NextTopic.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'NextTopic_over.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'NextTopic_selected.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">下一个主题</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"CurrentTopicIndex\">' +
	'                    <Properties>' +
	'                        <Property Name=\"PaddingLeft\">2px</Property>' +
	'                        <Property Name=\"PaddingRight\">2px</Property>' +
	'                        <Property Name=\"Label\">第 {n}/{total} 页</Property>' +
	'                        <Property Name=\"ControlType\">CurrentTopicIndex</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Separator\">' +
	'                    <Properties>' +
	'                        <Property Name=\"ControlType\">Separator</Property>' +
	'                        <Property Name=\"Tooltip\">分隔符</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'            </Classes>' +
	'        </Style>' +
	'        <Style Name=\"FeedbackUserProfileItem\">' +
	'            <Classes>' +
	'                <StyleClass Name=\"Username\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">用户名：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"EmailAddress\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">电子邮件地址：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"FirstName\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">名字：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"MiddleName\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">中间名：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"LastName\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">姓氏：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Address1\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">地址:</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Address2\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">地址2:</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Address3\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">地址3:</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Address4\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">地址4:</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"City\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">城市：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"State\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">省：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"PostalCode\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">邮政编码：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Country\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">国家：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Gender\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">性别：</Property>' +
	'                        <Property Name=\"GenderFemaleName\">女</Property>' +
	'                        <Property Name=\"GenderMaleName\">男</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Phone1\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">电话:</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Phone2\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">电话2:</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Phone3\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">电话3:</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Fax\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">传真：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Birthdate\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">生日：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Date\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">日期:</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Employer\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">雇主：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Occupation\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">职业：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Department\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">部门：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom1\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom2\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义2：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom3\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义3：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom4\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义4：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom5\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义5：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom6\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义6：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom7\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义7：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom8\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义8：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom9\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义9：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Custom10\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">自定义10：</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'            </Classes>' +
	'        </Style>' +
	'        <Style Name=\"Frame\">' +
	'            <Classes>' +
	'                <StyleClass Name=\"Toolbar\">' +
	'                    <Properties>' +
	'                        <Property Name=\"BackgroundImage\">url(\'ToolbarBackground.jpg\')</Property>' +
	'                        <Property Name=\"Height\">28px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"TopicToolbar\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Height\">28px</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"NavigationTopDivider\">' +
	'                    <Properties>' +
	'                        <Property Name=\"BackgroundImage\">url(\'NavigationTopGradient.jpg\')</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"NavigationDragHandle\">' +
	'                    <Properties>' +
	'                        <Property Name=\"BackgroundImage\">url(\'NavigationBottomGradient.jpg\')</Property>' +
	'                        <Property Name=\"BackgroundImagePressed\">url(\'NavigationBottomGradient_selected.jpg\')</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"BodyComments\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">注释</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'            </Classes>' +
	'        </Style>' +
	'        <Style Name=\"Control\">' +
	'            <Classes>' +
	'                <StyleClass Name=\"SearchButton\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">搜索</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SearchBox\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Tooltip\">搜索文本框</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SearchFiltersLabel\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">过滤器</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SearchUnfilteredLabel\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">未过滤</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SearchFavoritesLabel\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">书签搜索</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"TopicFavoritesLabel\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">书签主题</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SearchFavoritesDeleteButton\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'Delete.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Delete_selected.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Delete_over.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">删除所选书签</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"TopicFavoritesDeleteButton\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'Delete.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'Delete_selected.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'Delete_over.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">删除所选书签</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"EmptySearchFavoritesLabel\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">（没有已保存的搜索）</Property>' +
	'                        <Property Name=\"Tooltip\">（没有已保存的搜索）</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"EmptyTopicFavoritesLabel\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">（没有已保存的主题）</Property>' +
	'                        <Property Name=\"Tooltip\">（没有已保存的主题）</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"AddSearchToFavoritesButton\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'AddSearchToFavorites.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'AddSearchToFavorites_selected.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'AddSearchToFavorites_over.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">将搜索字符串添加到书签</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"IndexSearchBox\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Tooltip\">索引搜索文本框</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"SearchResults\">' +
	'                    <Properties>' +
	'                        <Property Name=\"TableSummary\">This table contains the results of the search that was performed. The first column indicates the search rank and the second column indicates the title of the topic that contains the search result.</Property>' +
	'                        <Property Name=\"RankLabel\">级别</Property>' +
	'                        <Property Name=\"TitleLabel\">标题</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"Messages\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Loading\">正在加载</Property>' +
	'                        <Property Name=\"LoadingAlternateText\">正在加载</Property>' +
	'                        <Property Name=\"NoTopicsFound\">没有找到主题</Property>' +
	'                        <Property Name=\"InvalidToken\">记号无效</Property>' +
	'                        <Property Name=\"QuickSearchExternal\">快速搜索功能在外部主题中禁用。</Property>' +
	'                        <Property Name=\"QuickSearchIE5.5\">快速搜索功能在 Internet Explorer 5.5 中禁用。</Property>' +
	'                        <Property Name=\"RemoveHighlightIE5.5\">突出显示关闭功能在 Internet Explorer 5.5 中禁用。</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"CommentsAddButton\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'AddComment.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'AddComment_selected.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'AddComment_over.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">添加注释</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"CommentsReplyButton\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'ReplyComment.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'ReplyComment_selected.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'ReplyComment_over.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">回复注释</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"CommentsRefreshButton\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'RefreshTopicComments.gif\')</Property>' +
	'                        <Property Name=\"PressedIcon\">url(\'RefreshTopicComments_selected.gif\')</Property>' +
	'                        <Property Name=\"HoverIcon\">url(\'RefreshTopicComments_over.gif\')</Property>' +
	'                        <Property Name=\"Tooltip\">刷新注释</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"CommentNode\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'Comment.gif\')</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"CommentReplyNode\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Icon\">url(\'CommentReply.gif\')</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"NavigationLinkTop\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">打开导航</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"NavigationLinkBottom\">' +
	'                    <Properties>' +
	'                        <Property Name=\"Label\">打开导航</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'            </Classes>' +
	'        </Style>' +
	'        <Style Name=\"Dialog\">' +
	'            <Classes>' +
	'                <StyleClass Name=\"AddComment\">' +
	'                    <Properties>' +
	'                        <Property Name=\"SubmitButtonLabel\">提交</Property>' +
	'                        <Property Name=\"CancelButtonLabel\">取消</Property>' +
	'                        <Property Name=\"TitleLabel\">添加注释：</Property>' +
	'                        <Property Name=\"UserNameLabel\">用户名：</Property>' +
	'                        <Property Name=\"SubjectLabel\">主题：</Property>' +
	'                        <Property Name=\"CommentLabel\">注释：</Property>' +
	'                        <Property Name=\"CommentLengthExceeded\">超出最大注释长度 {n} 个字符。</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"ReplyComment\">' +
	'                    <Properties>' +
	'                        <Property Name=\"SubmitButtonLabel\">提交</Property>' +
	'                        <Property Name=\"CancelButtonLabel\">取消</Property>' +
	'                        <Property Name=\"TitleLabel\">回复注释：</Property>' +
	'                        <Property Name=\"UserNameLabel\">用户名：</Property>' +
	'                        <Property Name=\"SubjectLabel\">主题：</Property>' +
	'                        <Property Name=\"CommentLabel\">注释：</Property>' +
	'                        <Property Name=\"OriginalCommentLabel\">原始注释：</Property>' +
	'                        <Property Name=\"CommentLengthExceeded\">超出最大注释长度 {n} 个字符。</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'                <StyleClass Name=\"RegisterUser\">' +
	'                    <Properties>' +
	'                        <Property Name=\"SubmitButtonLabel\">提交</Property>' +
	'                        <Property Name=\"CancelButtonLabel\">取消</Property>' +
	'                        <Property Name=\"TitleLabel\">创建反馈服务配置文件：</Property>' +
	'                        <Property Name=\"EditProfileTitleLabel\">编辑反馈服务配置文件：</Property>' +
	'                        <Property Name=\"UserNameLabel\">用户名：</Property>' +
	'                        <Property Name=\"EmailAddressLabel\">电子邮件地址：</Property>' +
	'                        <Property Name=\"FirstNameLabel\">名字：</Property>' +
	'                        <Property Name=\"LastNameLabel\">姓氏：</Property>' +
	'                        <Property Name=\"CountryLabel\">国家：</Property>' +
	'                        <Property Name=\"PostalCodeLabel\">邮政编码：</Property>' +
	'                        <Property Name=\"GenderLabel\">性别：</Property>' +
	'                        <Property Name=\"GenderFemaleName\">女</Property>' +
	'                        <Property Name=\"GenderMaleName\">男</Property>' +
	'                        <Property Name=\"Registration\">您必须创建一个用户配置文件以便将注释发布到此帮助系统。请填写以下信息。系统将发送一封电子邮件到您提供的地址。请按照电子邮件中的操作说明完成激活。 </Property>' +
	'                        <Property Name=\"EditProfileRegistration\">使用此表格更新配置文件信息。如果选择更新电子邮件地址，系统将发送一封电子邮件到您提供的地址。请按照电子邮件中的操作说明完成激活。</Property>' +
	'                        <Property Name=\"RegistrationSubmit\">您的信息已发送至 MadCap Software。信息处理完成之后，您将会接收到一封电子邮件，其中包含指向验证页面的链接。单击此链接，或将此链接复制粘贴到 Web 浏览器以完成注册。</Property>' +
	'                        <Property Name=\"RegistrationSubmitNote\">注意：某些服务提供商具有电子邮件过滤软件，可能会导致将通知电子邮件发送到垃圾电子邮件文件夹。如果您没有接收到通知电子邮件，请检查此文件夹，查看该邮件是否已发送到其中。</Property>' +
	'                        <Property Name=\"MissingRequiredField\">请为以下内容输入一个值：</Property>' +
	'                        <Property Name=\"UpdateSuccess\">配置文件更新成功！</Property>' +
	'                        <Property Name=\"EmailNotificationsGroupLabel\">电子邮件通知</Property>' +
	'                        <Property Name=\"EmailNotificationsHeadingLabel\">在以下情况中，我希望收到相应的电子邮件…</Property>' +
	'                        <Property Name=\"CommentReplyNotificationLabel\">我的某个注释有新的回复</Property>' +
	'                        <Property Name=\"CommentSameTopicNotificationLabel\">我添加过注释的主题有新注释</Property>' +
	'                        <Property Name=\"CommentSameHelpSystemNotificationLabel\">“帮助”系统中的任意主题有新注释</Property>' +
	'                    </Properties>' +
	'                </StyleClass>' +
	'            </Classes>' +
	'        </Style>' +
	'    </Styles>' +
	'    <ResourcesInfo>' +
	'        <Resource Name=\"QuickSearch.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"QuickSearch_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"QuickSearch_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"LogoIcon.gif\" Width=\"111\" Height=\"24\" />' +
	'        <Resource Name=\"Expand.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Expand_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Expand_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Collapse.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Collapse_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Collapse_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Highlight.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Highlight_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Highlight_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Print.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Print_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Print_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"HideNavigation.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"HideNavigation_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"HideNavigation_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"HideNavigation_checked.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Back.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Back_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Back_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Forward.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Forward_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Forward_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Home.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Home_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Home_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Stop.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Stop_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Stop_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Refresh.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Refresh_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Refresh_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectToc.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectToc_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectToc_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectIndex.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectIndex_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectIndex_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectSearch.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectSearch_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectSearch_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectFavorites.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectFavorites_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectFavorites_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectGlossary.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectGlossary_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectGlossary_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectBrowseSequences.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectBrowseSequences_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"SelectBrowseSequences_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddTopicToFavorites.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddTopicToFavorites_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddTopicToFavorites_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Rating0.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"RatingGold100.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"EditUserProfile.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"EditUserProfile_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"EditUserProfile_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"PreviousTopic.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"PreviousTopic_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"PreviousTopic_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"NextTopic.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"NextTopic_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"NextTopic_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"TocIcon.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"TocAccordionBackground.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"TocAccordionBackground_over.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"IndexIcon.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"IndexAccordionBackground.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"IndexAccordionBackground_over.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"SearchIcon.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"SearchAccordionBackground.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"SearchAccordionBackground_over.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"FavoritesIcon.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"FavoritesAccordionBackground.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"FavoritesAccordionBackground_over.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"BrowsesequencesIcon.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"BrowsesequencesAccordionBackground.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"BrowsesequencesAccordionBackground_over.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"GlossaryIcon.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"GlossaryAccordionBackground.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"GlossaryAccordionBackground_over.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"AccordionIconsBackground.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"header.png\" Width=\"1\" Height=\"42\" />' +
	'        <Resource Name=\"IndexHeadingBG.png\" Width=\"1\" Height=\"23\" />' +
	'        <Resource Name=\"SearchBG.png\" Width=\"1\" Height=\"43\" />' +
	'        <Resource Name=\"Topic.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"Book.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"BookOpen.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"ToolbarBackground.jpg\" Width=\"2\" Height=\"28\" />' +
	'        <Resource Name=\"NavigationTopGradient.jpg\" Width=\"2\" Height=\"8\" />' +
	'        <Resource Name=\"NavigationBottomGradient.jpg\" Width=\"2\" Height=\"7\" />' +
	'        <Resource Name=\"NavigationBottomGradient_selected.jpg\" Width=\"2\" Height=\"7\" />' +
	'        <Resource Name=\"Delete.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Delete_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Delete_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddSearchToFavorites.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddSearchToFavorites_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddSearchToFavorites_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddComment.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddComment_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"AddComment_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"ReplyComment.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"ReplyComment_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"ReplyComment_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"RefreshTopicComments.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"RefreshTopicComments_selected.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"RefreshTopicComments_over.gif\" Width=\"23\" Height=\"22\" />' +
	'        <Resource Name=\"Comment.gif\" Width=\"16\" Height=\"16\" />' +
	'        <Resource Name=\"CommentReply.gif\" Width=\"16\" Height=\"16\" />' +
	'    </ResourcesInfo>' +
	'</Stylesheet>'
);
