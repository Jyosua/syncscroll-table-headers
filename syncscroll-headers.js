(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else if ( typeof module === "object" && module.exports ) {
		// Node/CommonJS
		module.exports = factory(require("jquery"));
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
    var scrollableDivsByClass = {};

    $(window).on("resize", function () {
        syncHeaders();
    });
    $(document).ready(function () {
        setSyncElements();
        createStickyHeaders();
        resetSyncElements();
        syncHeaders();
    });

    function resetSyncElements() {
        clearSyncElements();
        setSyncElements();
    }

    function clearSyncElements() {
        scrollableDivsByClass = {};
    }
    
    function setSyncElements() {
        $("[class*=\"syncscroll sync-name-\"]").each(function (i, thing) {
            var fullClassName = $(this).attr("class");
            var classInstancesArrayLength = (fullClassName in scrollableDivsByClass ? scrollableDivsByClass[fullClassName].length : 0);
            if (classInstancesArrayLength === 0)
                scrollableDivsByClass[fullClassName] = [];
            scrollableDivsByClass[fullClassName][classInstancesArrayLength] = $(this);
        });
    }

    function createStickyHeaders() {
        Object.keys(scrollableDivsByClass).forEach(function(key) {
            if (scrollableDivsByClass[key].length != 1) // Ignore duplicated keys
                    return;
            
            var elem = scrollableDivsByClass[key][0];
            if(elem.parent(".table").length === 1) {
                var headersClones = elem.find("tr").eq(0).clone()
                var parentDiv = elem.parent(".table").eq(0).prepend("<div class=\""+key+"\"><table><tbody></tbody></table></div>")
                parentDiv.find("tbody").eq(0).prepend(headersClones)
            }
        });
    }

    function syncHeaders() {
        Object.keys(scrollableDivsByClass).forEach(function(key) {
            if (scrollableDivsByClass[key].length != 2) // Ignore a potential usecase other than tables
                return;

            var syncscrollTableHeaderDiv = scrollableDivsByClass[key][0];
            var syncscrollTableDiv = scrollableDivsByClass[key][1];

            // Set table widths
            syncscrollTableHeaderDiv.find("table").eq(0).width(syncscrollTableDiv.find("table").eq(0).width());

            // Resize header tags to match
            var syncscrollTableHeaders = syncscrollTableHeaderDiv.find("th");
            syncscrollTableDiv.find("tr").eq(0).children().each(function (index, cell) {
                syncscrollTableHeaders.eq(index).width($(this).width())
            });

            // Setup scroll events for syncing scroll positions
            syncscrollTableDiv.on("scroll", function() {
                syncscrollTableHeaderDiv.scrollLeft($(this).scrollLeft());
            }); 
        });
    }
}));
