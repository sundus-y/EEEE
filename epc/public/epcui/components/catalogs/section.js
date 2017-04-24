(function( $, undefined ) {
    $.widget( "ui.section", {
        options: {
            catalogId:"",
            id:"",
            text:"",
            image:""
        },
        _init: function() {
            var $element = this.element;

            var inner = "<div style='width:128px; height:128px; margin: 0; background: white; padding: 10px; border:0; zoom:1;color: #000; text-align: center; font-family: verdana, arial, sans-serif;'>";
            inner = inner + "<img style='width:105px;height:80px'/><br/>";
            inner = inner + "<span style='cursor:default'>" + this.options.text + "</span>";
            inner = inner + "</div>";
            var $inner = $(inner);
            $inner.corner("round 8px");

            var $html = $("<div style='float: left; margin: 15px; background:#6af; padding: 8px; width:150px; height:150px;'></div>");
            $html.css('padding', '4px').corner("round 10px");

            $html.append($inner);

            $element.append($html);

            $('img',$inner).attr('src', this.options.image).load(function() {
                $(this).fadeIn(400);
            });

            var _this = this;
            $element.click(function() {
                $element.trigger("sectionClicked",_this.options.id);
            })
        },
        method1: function() {
        },
        method2: function() {
        }
    });
})( jQuery );