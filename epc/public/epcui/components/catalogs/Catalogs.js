function Catalogs() {
    this.catalogObjects = [];
    this.catalogObjectsByID = {};
    this.$catalogElements = [];
    this.$catalogElementsByID = {};
    this.catalogsIDsByYear = {};

    this.FILTER_WATERMARK_TEXT = "Type a model name or a VIN...";
}

Catalogs.prototype.$element;
Catalogs.prototype.$catalogsContainer;

Catalogs.prototype.catalogObjects;
Catalogs.prototype.catalogObjectsByID;
Catalogs.prototype.$catalogElements;
Catalogs.prototype.$catalogElementsByID;
Catalogs.prototype.catalogsIDsByYear;

Catalogs.prototype.$sortButtonsElement;
Catalogs.prototype.$filterBox;
Catalogs.prototype.FILTER_WATERMARK_TEXT;
Catalogs.prototype.year;

Catalogs.prototype.filterByText = function(text) {
    this.filterByYear(this.year);
};

Catalogs.prototype.isFilteredIn = function(catalogObject) {
    var filterText = this.$filterBox.val();
    if (filterText != null) {
        //text = trim(text);
        if (filterText != "" && filterText != this.FILTER_WATERMARK_TEXT) {
            var filterTexts = filterText.toLowerCase().split(" ");
            var textForSearch = catalogObject.textForSearch;
            for (var j = 0; j < filterTexts.length; j++) {
                if (textForSearch.indexOf(filterTexts[j]) < 0) {
                    return false;
                }
            }
        }
    }
    return true;
};

Catalogs.prototype.showSections = function(catalogId) {
    var $sections = $("<div/>").sections({catalogId:catalogId});
    $sections.addClass("cover");
    this.$element.append($sections);
};

Catalogs.prototype.createCatalogElement = function(catalogObject) {
    var $catalogElement = $("<div/>").catalog(catalogObject).hide();
    var _this = this;
    $catalogElement.bind('catalogClicked', function(event, id) {
        _this.showSections(id);
    });
    this.$catalogsContainer.append($catalogElement);
    this.$catalogElementsByID[catalogObject.id] = $catalogElement;
    this.$catalogElements.push($catalogElement);
};

Catalogs.prototype.filterByYear = function(year, idsToShow) {
    var idsToShowMap;
    if (idsToShow) {
        idsToShowMap = {};
        for (var i = 0; i < idsToShow.length; i++) {
            idsToShowMap[idsToShow[i]] = true;
        }
    }
    if (year) {
        this.year = year;
        var catalogsIDsByYear = this.catalogsIDsByYear[year];
        var $catalogElements = this.$catalogElements;
        for (var i = 0; i < $catalogElements.length; i++) {
            $catalogElements[i].hide();
        }
        for (var i = 0; i < catalogsIDsByYear.length; i++) {
            var id = catalogsIDsByYear[i];
            var catalogObject = this.catalogObjectsByID[id];
            if (this.isFilteredIn(catalogObject)) {
                if (!this.$catalogElementsByID[id]) {
                    this.createCatalogElement(catalogObject);
                }
                if (!idsToShowMap || idsToShowMap[id]) {
                    this.$catalogElementsByID[id].show();
                }
            }
        }
    }
};

Catalogs.prototype.init = function(options, element) {
    var settings = {};
    if (options) {
        $.extend(settings, options);
    }

    this.$element = $(element);
    var $element = $(element);

    // add filter box
    var $filterBox = $("<input type='text'/>");
    this.$filterBox = $filterBox;
    $filterBox.css({width:"300px",
                    marginLeft:"10px",
                    marginBottom:"5px"});
    $filterBox.watermark(this.FILTER_WATERMARK_TEXT).corner("round 4px");
    $element.append($filterBox);

    // add sorting buttons
    var sortButtons = [];
    sortButtons.push('<div>');
    sortButtons.push('<input type="radio" id="sortradio1" name="radio" value="2006"                  /><label for="sortradio1">2006</label>');
    sortButtons.push('<input type="radio" id="sortradio2" name="radio" value="2007"                  /><label for="sortradio2">2007</label>');
    sortButtons.push('<input type="radio" id="sortradio3" name="radio" value="2008"                  /><label for="sortradio3">2008</label>');
    sortButtons.push('<input type="radio" id="sortradio4" name="radio" value="2009"                  /><label for="sortradio4">2009</label>');
    sortButtons.push('<input type="radio" id="sortradio5" name="radio" value="2010" checked="checked"/><label for="sortradio5">2010</label>');
    sortButtons.push('<input type="radio" id="sortradio6" name="radio" value="2011"                  /><label for="sortradio6">2011</label>');
    sortButtons.push('</div>');
    var $sortButtonsElement = $(sortButtons.join("")).buttonset();
    this.$sortButtonsElement = $sortButtonsElement;
    this.$sortButtonsElement.css({marginLeft:"10px"});
    $element.append($sortButtonsElement);

    var _this = this;
    $("input", $sortButtonsElement).click(function() {
        _this.filterByYear(this.value);
    });
    $filterBox.keyup(function() {
        _this.filterByText(this.value);
    });

    var $catalogsContainer = $("<div style='border:0px solid black;position:absolute;width:100%;height:90%;overflow:auto'/>");
    $element.append($catalogsContainer);

    this.$catalogsContainer = $catalogsContainer;

    var imageContext = Config.getInstance().imagesDomain + "/" + Config.getInstance().imagesContext + "/1/FNA/";
    var imageFormat = Config.getInstance().imagesFormat;
    $.getJSON(Config.getInstance().getEPCPrefix() + "/" + "services/catalog/list?json",
            function(data) {
                for (var i = 0; i < data.catalogs.length; i++) {
                    var catalog = data.catalogs[i];
                    var id = catalog.data;
                    var text = catalog.shortName; // alternative to catalog.label;
                    var image = imageContext + catalog.imagePath + imageFormat;

                    var catalogObject = {id:id,image:image,text:text,textForSearch:text.toLowerCase()};
                    _this.catalogObjects.push(catalogObject);
                    _this.catalogObjectsByID[id] = catalogObject;

                    // add to the catalogIDsByYear map
                    for (var l = 0; l < catalog.models.length; l++) {
                        var model = catalog.models[l];
                        var year = model.modelYear;
                        if (!_this.catalogsIDsByYear[year]) {
                            _this.catalogsIDsByYear[year] = [];
                        }
                        _this.catalogsIDsByYear[year].push(id);
                    }

                    //todo: change this to get the current selected year and filter while adding the elements
                }
                _this.filterByYear("2010");
            });
};

(function($) {
    var methods = {
        init : function(options) {
            return this.each(function() {
                var instance = new Catalogs();
                instance.init(options, this);
                $.data(this, "instance", instance);
            });
        },
        doSomething : function() {
            return this.each(function() {
            });
        }
    };


    $.fn.catalogs = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }

    };

})(jQuery);