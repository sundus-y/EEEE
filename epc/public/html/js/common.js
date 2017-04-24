/**
 * get the service location
 * @param url to get location for
 * @returns service url
 */
function service(url) {
    return "/epc/services/" + url;
}

jQuery.fn.dataTableExt.oSort['number-with-ms-asc']  = function(a,b) {
	var x = (a.replace(/ms/g,""));
	var y = (b.replace(/ms/g,""));
	x = (x.replace(/,/g,""));
	y = (y.replace(/,/g,""));
	x = parseFloat( x );
	y = parseFloat( y );
	return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};

jQuery.fn.dataTableExt.oSort['number-with-ms-desc']  = function(a,b) {
	var x = (a.replace(/ms/g,""));
	var y = (b.replace(/ms/g,""));
	x = (x.replace(/,/g,""));
	y = (y.replace(/,/g,""));
	x = parseFloat( x );
	y = parseFloat( y );
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};