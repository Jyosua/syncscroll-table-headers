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
var elementsByClass = {};
$('.syncscroll,[class^=sync-name-]').each(function (i,thing) {
    let clsName = $(this).attr('class');
    let length = (clsName in elementsByClass ? elementsByClass[clsName].length : 0);
    if(length === 0)
        elementsByClass[clsName] = [];
    elementsByClass[clsName][length] = $(this);
})

$(window).on('resize',function() {
    Object.keys(elementsByClass).forEach(key => {
        if (elementsByClass[key].length != 2) // Ignore a potential usecase other than tables
            return;

        let headerDiv = elementsByClass[key][0];
        let tableDiv = elementsByClass[key][1];

        // Set table widths
        headerDiv.find('table').eq(0).width(tableDiv.find('table').eq(0).width());

        // Resize header tags to match
        let headers = headerDiv.find('th');
        tableDiv.find('tr').eq(0).children().each(function (index, cell) {
            headers.eq(index).width($(this).width())
        });
      });
});
$(document).ready(function() {
    $(window).trigger('resize');
});
}));
