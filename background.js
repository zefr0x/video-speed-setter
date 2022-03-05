function getIncreaseAmount(restoredSettings) {
	increaseAmount = restoredSettings.increaseAmount;
	if (increaseAmount === undefined) {
		increaseAmount = 0.1;
	}
	return increaseAmount;
}

function applyPlayBackRate(amount) {
	const executing = browser.tabs.executeScript({
		code: `document.querySelectorAll('video').forEach(video => video.playbackRate += ${amount})`,
	});

	executing;
}

browser.commands.onCommand.addListener(function (command) {
	browser.storage.local
		.get()
		.then(getIncreaseAmount)
		.then(function (increaseAmount) {
			if (command === 'increase') {
				applyPlayBackRate(increaseAmount);
			} else if (command === 'decrease') {
				applyPlayBackRate(-increaseAmount);
			}
		});
});
