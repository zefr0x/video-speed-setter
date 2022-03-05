browser.commands.onCommand.addListener(function (command) {
	if (command === 'increase') {
		applyPlayBackRate(0.1);
	} else if (command === 'decrease') {
		applyPlayBackRate(-0.1);
	}
});

function applyPlayBackRate(amount) {
	const executing = browser.tabs.executeScript({
		code:
			"document.querySelectorAll('video').forEach(video => video.playbackRate += " +
			amount +
			')',
	});

	executing;
}
