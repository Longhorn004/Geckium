// ==UserScript==
// @name        Geckium - Unified Extensions
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function hideUnifiedExtensionsButton() {
	const navBar = document.getElementById("nav-bar");
	const unifiedExtensionsButton = document.getElementById("unified-extensions-button");
	//const navBarCustomizationTarget = document.getElementById("nav-bar-customization-target");
	const urlbarBackground = document.getElementById("urlbar-background");

	const pageButton = document.getElementById("page-button");

	if (gkPrefUtils.tryGet("Geckium.unifiedExtensions.hide").bool) {
		navBar.setAttribute("unifiedextensions", "hide");
		gkInsertElm.after(unifiedExtensionsButton, urlbarBackground);
		
	} else {
		navBar.removeAttribute("unifiedextensions");
		
		if (pageButton)
			gkInsertElm.after(unifiedExtensionsButton, pageButton);
	}
}

window.addEventListener("load", hideUnifiedExtensionsButton);
window.addEventListener("DOMContentLoaded", hideUnifiedExtensionsButton);

// FIXME: Find the correct event instead of using a timeout initially.
setTimeout(() => {
	hideUnifiedExtensionsButton();
}, 50);

/* bruni: Automatically apply appearance and theme
		  attributes when it detecs changes in the pref. */
const unifiedExtensionsObserver = {
	observe: function (subject, topic, data) {
		if (topic == "nsPref:changed") {
			hideUnifiedExtensionsButton();
		}
	},
};
Services.prefs.addObserver("Geckium.unifiedExtensions.hide", unifiedExtensionsObserver, false);