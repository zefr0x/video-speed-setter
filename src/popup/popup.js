document.getElementById("source").innerHTML = browser.i18n.getMessage("source");
document.getElementById("author").innerHTML = browser.i18n.getMessage("author");
document.getElementsByTagName("title")[0].innerHTML = browser.i18n.getMessage("extensionName");

document.getElementsByTagName("html")[0].setAttribute("lang",
	browser.i18n.getUILanguage()
);


document.addEventListener("contextmenu", event => event.preventDefault());


["keyup", "change"].forEach(event =>
	document.getElementById("speedInput").addEventListener(event, apply)
);

function apply() {
	const executing = browser.tabs.executeScript({
		code: "document.querySelector('video').playbackRate = " +
			document.getElementById("speedInput").value
	});

	executing;
}