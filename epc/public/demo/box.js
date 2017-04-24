function Box() {
}
Box.prototype.init = function(options, element) {
    var settings = {text:"?",width:"0"};
    if (options) {
        $.extend(settings, options);
    }
    var $this = $(element);

    //var html = "<div><span>" + settings.text + " : </span><input type='text'/></div>";
    var html = "<span>" + settings.text + " : </span><input type='text'/><div class='submitButton'>Submit!</div>";
    var $element = $(html);

    $this.html($element);
    $this.css({"border":"1px solid black","width":"500px","padding":"10px"});
    //$this.addClass("box");
    $this.append($(".submitButton",$this).button());
    //$this.append($("input",$this).watermark("here"));
    $this.corner("round 8px");

    /*$this.click(function() {
        $this.animate({width:"400px"});
    })*/
};


(function($) {
    var methods = {
        init : function(options) {
            return this.each(function() {
                var instance = new Box();
                instance.init(options, this);
                $.data(this, "instance",instance);
            });
        },
        doSomething : function() {
            return this.each(function() {
            });
        }
    };


    $.fn.box = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }

    };

})(jQuery);
