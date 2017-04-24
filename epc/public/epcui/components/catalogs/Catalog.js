(function($, undefined) {
    $.widget("ui.catalog", {
        options: {
            id:"?",
            text:"?",
            image:"?",
            withContent:false
        },
        showSectionsImage:null,
        _init: function() {
            var $element = this.element;
            var options = this.options;
            $element.css({border:"1 solid black",
                          width:"150px",
                          height:"150px",
                          padding:"8px",
                          position:"relative",
                          margin:"8px",
                          "background-color":"white",
                          "font-family": "verdana, arial, sans-serif",
                          "float":"left"});

            /*var $image = $("<img style='display:none;width:105px;height:80px;padding-left:16px;padding-top:11px;'/>");
            $image.attr('src', options.image).load(function() {
                $(this).fadeIn(400);
            });*/
            var $image = $("<img style='display:block;width:105px;height:80px;padding-left:16px;padding-top:11px;' src='" + options.image + "'/>");
            $element.append($image);

            $element.append($("<br/>"));

            var textStyle = "";
            if (options.text.length>40) {
                textStyle = textStyle + "font-size:8pt;";
            } else if (options.text.length>20) {
                textStyle = textStyle + "font-size:10pt;";
            } else if (options.text.length>10) {
                textStyle = textStyle + "font-size:12pt;";
            }
            var $text = $("<div style='width:100%;" + textStyle + ";cursor:default'>" + options.text + "</div>");
            $text.css({textAlign:"center"});
            $element.append($text);

            $element.corner("round 8px");

            var _this = this;
            
            $element.hover(
                    function() {
                        // mouse in
                        if (!_this.showSectionsImage) {
                            _this.showSectionsImage = $("<img style='width:37px;height:37px;display:none;' src='/epc/resources/public/images/hierarchy.jpg'/>");
                            _this.showSectionsImage.css({bottom:"10px",
                                                         left:"10px",
                                                         position:"absolute",
                                                         cursor:"pointer"});

                            _this.showSectionsImage.click(function(event) {
                                $element.trigger("catalogClicked", options.id);
                                event.stopPropagation();
                            });

                            $element.append(_this.showSectionsImage );
                        }
                        _this.showSectionsImage.fadeIn();
                    },
                    function() {
                        // mouse out
                        if (_this.showSectionsImage) {
                            _this.showSectionsImage.fadeOut();
                        }
                    });

            if (!options.withContent) {
                $element.click(function() {
                    var $element = $(this);
                    var catalogWithContent = $("<div/>",
                                               {css: {position:"absolute",
                                                      top:$element.offset().top-16,
                                                      left:$element.offset().left-16}
                                               });
                    catalogWithContent.catalog({id:options.id,text:options.text,image:options.image,withContent:true});
                    catalogWithContent.mouseleave(function() {
                        //catalogWithContent.animate({width:$element.width(),height:$element.height()});
                        $(document).keyup = null;
                        catalogWithContent.fadeOut();
                    });
                    $(document).keyup(function(event) {
                        if (event.keyCode == '27') {
                            $(document).keyup = null;
                            catalogWithContent.fadeOut();
                        }
                    });
                    $(document.body).append(catalogWithContent);

                });
            } else {
                $image.load(function() {
                    $element.animate(
                                {width:$element.width()+120,height:$element.height()+100,left:$element.position().left-60,top:$element.position().top-50},
                                function() {
                                    var $searchBox = $("<input type='text'/>");
                                    $searchBox.css({position:"absolute",
                                                    right:"10px",
                                                    bottom:"12px",
                                                    width:"217px",
                                                    height:"30px"});
                                    $element.append($searchBox);
                                    var $searchImage = $("<img style='width:20px;height:20px;' src='/epc/resources/public/images/search.png'/>");
                                    $searchImage.css({bottom:"17px",
                                                      right:"15px",
                                                      position:"absolute",
                                                      cursor:"pointer"});
                                    $element.append($searchImage);
                                    $searchBox.focus();
                                });
                });
            }
        }
    });
})(jQuery);
