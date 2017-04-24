(function($){
    $.fn.jExpand = function(){
        var element = this;

        $(element).find("tr:odd").addClass("odd");
        $(element).find("tr:not(.odd)").hide();
        $(element).find("tr:first-child").show();

        $(element).find("tr.odd").live('click', function() {
            $(this).next("tr").toggle();
            $(this).find(".arrow").toggleClass("up");
        });
        
    }    
})(jQuery); 