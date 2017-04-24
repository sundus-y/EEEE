(function( $, undefined ) {
    $.widget( "ui.sections", {
        options: {
            catalogId:"??"
        },
        sectionDataObjects: null, // contains a list of top sections and the whole hierarchy within
        parentIndex: null,
        $sectionsContainer: null,
        _init: function() {
            var $element = this.element;
            var _this = this;

            $element.append($("<div>Close</div>").button().click(function() {
                $element.remove();
            }));
            $element.append($("<div>Back</div>").button().click(function() {
                _this.showParentSections();
            }));

            var $sectionsContainer = $("<div/>");
            $element.append($sectionsContainer);
            this.$sectionsContainer = $sectionsContainer;

            $.getJSON(Config.getInstance().getEPCPrefix() + "/" + "services/catalog/" + this.options.catalogId + "/flatsections?json",
                    function(data) {
                        _this.sectionDataObjects = getSectionDataObjects(data.clientSectionList.sections);
                        _this.showSections(null);
                    });

            function getSectionDataObjects(sections) {
                var result = [];
                var length = sections.length;
                var imageContext = Config.getInstance().imagesDomain + "/" + Config.getInstance().imagesContext + "/1/FNA/";
                var imageFormat = Config.getInstance().imagesFormat;
                for (var i=0; i<length; i++) {
                    var section = sections[i];
                    var image = imageContext + section.imagePath + imageFormat;
                    var sectionData = new SectionData(_this.options.catalogId,section,image);
                    result.push(sectionData);
                }
                return result;
            }
        },
        showParentSections: function() {
            if (this.parentIndex>=0) {
                var sectionDataObject = this.sectionDataObjects[this.parentIndex];
                var childrenIndex = null;
                if (sectionDataObject.parentIndex>=0) {
                    childrenIndex = this.sectionDataObjects[sectionDataObject.parentIndex].childrenIndex;
                }
                this.showSections(childrenIndex);
            } else {
                // we're at the top level - nowhere to go up to
                this.element.remove();
            }
        },
        showSections: function(childrenIndex) {
            // remove the sections presented
            this.$sectionsContainer.remove();
            // present the sections 
            var indices = [];
            if (childrenIndex) {
                // get the indices of the sections to show
                for (var i=0; i<childrenIndex.length; i++) {
                    indices.push(childrenIndex[i].index);
                }
            } else {
                // if the root then get all the secionts without a parent
                for (var i=0; i<this.sectionDataObjects.length; i++) {
                    var sectionDataObject = this.sectionDataObjects[i];
                    if (sectionDataObject.parentIndex<0) {
                        indices.push(i);
                    } else {
                        break;
                    }
                }
            }
            var $element = this.element;
            var $sectionsContainer = $("<div/>");
            $element.append($sectionsContainer);
            this.$sectionsContainer = $sectionsContainer;
            var _this = this;
            for (var i=0; i<indices.length; i++) {
                var index = indices[i];
                var sectionDataObject = this.sectionDataObjects[index];
                var $sectionElement = $("<div/>").section({catalogId:sectionDataObject.catalogId,id:sectionDataObject.id,text:sectionDataObject.text,image:sectionDataObject.image});
                $sectionElement.data("sectionDataObject",sectionDataObject);
                $sectionsContainer.append($sectionElement);
                $sectionElement.bind('sectionClicked', function(event, id) {
                    _this.showSections($(this).data("sectionDataObject").childrenIndex);
                });
                this.parentIndex = sectionDataObject.parentIndex;
            }
        },
        method1: function() {
        },
        method2: function() {
        }
    });
})( jQuery );


function SectionData(catalogId, section, image) {
    this.uniqueId = section.uniqueId;
    this.id = section.id;
    this.catalogId = catalogId;
    this.text = section.label;
    this.image = image;
    this.childrenIndex = section.childrenIndex;
    this.parentIndex = section.parentIndex;
}