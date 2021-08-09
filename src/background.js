browser.commands.onCommand.addListener(function (command) {
	if (command === "increase") {
		apply(0.1);
	} else
		if (command === "decrease") {
			apply(-0.1);
		}
});

function apply(amount) {
	const executing = browser.tabs.executeScript({
		code: "document.querySelector('video').playbackRate += " + amount
	});

	executing;
}