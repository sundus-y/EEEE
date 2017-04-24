/*
 * This is called by the Flex application when a transfer notification 
 * is sent from SuperService Menus to the LIVE application
 */
function showNotification(title, link, user) {
	var imageLocation = "js/icons/transfer-notification.png";
	var closeButton = "<div class='closeButton' onclick='closeNoty(event)'>x</div>";

	noty({"text":"<img src='" + imageLocation + "'/><b>" + title + "</b><br/><br/><a href='javascript:notificationClicked()'>" + link + "</a><br/>" + user + "<br/>" + closeButton,
		"layout":"bottomRight",
		"theme":"noty_theme_ifm",
		"type":"alert",
		"speed":600,
		"closeOnSelfClick":false,
		"animateOpen":{"opacity":"show", "left": '+=20px'},
		"animateClose":{"opacity":"hide", "height": 'toggle'}
	});
}

/*
 * When the user clicks on the link, return to the Flex app and close remaining notes
 */
function notificationClicked() {
	var flex = document.getElementById("microcat-live-core-1.0-SNAPSHOT");
	flex.loadTransfer();
	$.noty.closeAll();
}

/*
 * Close the note when the user clicks the close button
 */
function closeNoty(event) {
	$.noty.close(event.target.parentElement.parentElement.parentElement.id);
}