
function init() {
	var suffix = new Date().getTime();
	
	// loading template
	document.getElementById('template').value='sectionData';
	document.getElementById('template').onchange();
}

var templates = {
	"sectionData": "../services/print/sectionData.pdf",
	"liveOrder_1_0": "../services/print/order.pdf",
	"liveOrder_1_1": "../services/print/order.pdf",
	"vehicleInformation": "../services/print/vehicleInformation.pdf"
};

function changeTemplateData(index){
	var suffix = new Date().getTime();
	
	// read value of selected template
	value = document.getElementById('template').options[index].value;
	
	var templateDataForm = document.getElementById("templateDataForm");
	
	var serviceUrl = templates[value];
	
	if(serviceUrl==null || serviceUrl=="") {
		alert("Service not yet implemented for selected template.");
	}
	
	templateDataForm.action = serviceUrl;
	
	// send requests to load xml test data for templates
	if (value == 'sectionData')
	{
		switch (document.getElementById('template').options[index].text)
		{
			case 'Section Image':
				option = 'sectionDataImage';
				break;
			case 'Section Parts':
				option = 'sectionDataParts';
				break;
			case 'Section Image and Parts':
				option ='sectionDataImageParts';
				break;
		}
	}

	if(value == 'vehicleInformation' || value == 'tmhuOrder' || value == 'liveOrder_1_0' || value == 'liveOrder_1_1' || value == 'candi' ) {
	    if (value == 'liveOrder_1_1' || value == 'liveOrder_1_0') {
	    	sendRequest('samples/' + value+'_body.xml?' + suffix,handleRequestBody);
		}
	    
		sendRequest('samples/' + value+'_header.xml?' + suffix,handleRequestHeader);
		if(value == 'liveOrder_1_0' || value == 'liveOrder_1_1') {
			document.getElementById('title').value = 'Microcat LIVE Order';
		    document.getElementById('footer').value = 'This order was created by Microcat LIVE, provided by <a href="http://www.infomedia.com.au">Infomedia Ltd.</a>';
		} else {
			document.getElementById('title').value = 'Text title of the document';
		    document.getElementById('footer').value = 'Text footer of the document';
		}
	} else if(value == 'sectionData' && (option == 'sectionDataImage' ||option == 'sectionDataParts' || option == 'sectionDataImageParts' )) {
        sendRequest('samples/' + option+'_body.xml?' + suffix,handleRequestBody);
        sendRequest('samples/sectionData_header.xml?' + suffix,handleRequestHeader);
        document.getElementById('footer').value = 'Text footer of the document';
    } else {
		document.getElementById('bodyText').value = '';
	    document.getElementById('header').value = '';
	    document.getElementById('footer').value = '';
	}
}

/**
 * Handle Request for body.
 * @param req
 * @return
 */
function handleRequestBody(req){
	var bodyText = document.getElementById('bodyText');
	bodyText.value = req.responseText;
}

/**
 * Handle Request for header.
 * @param req
 * @return
 */
function handleRequestHeader(req){
    var header = document.getElementById('header');
    header.value = req.responseText;
}

/* Re-implement when necessary
function changeProductData(productDropdown) {
    if (document.getElementById('template').value == 'liveOrder_1_1') {
        var suffix = new Date().getTime();
        if ( document.getElementById('product').value == 'LIVE') {
            sendRequest('samples/' + document.getElementById('template').value + '_LIVE_body.xml?' + suffix, handleRequestBody);
        }
        else {
            sendRequest('samples/' + document.getElementById('template').value+'_body.xml?' + suffix,handleRequestBody);
        }
    }
}
*/